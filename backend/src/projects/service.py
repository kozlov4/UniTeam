from typing import Optional, List

from fastapi import HTTPException, BackgroundTasks
from fastapi_mail import MessageType, MessageSchema, FastMail
from sqlalchemy import select, func, insert, Result
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import joinedload, selectinload
from core.models import (
    Project,
    project_technologies,
    project_vacancies,
    Technology,
    User,
    project_members,
    Vacancy,
    ProjectCategory,
    Application,
)
from .schemas import SortByChoice, CreateProjectRequest, CreateApplicationRequest


async def create_application(
    session: AsyncSession,
    application_in: CreateApplicationRequest,
    current_user_id: int,
):
    new_application = Application(
        project_id=application_in.project_id,
        applicant_id=current_user_id,
        cover_letter=application_in.cover_letter,
    )
    session.add(new_application)
    await session.commit()

    await session.refresh(new_application)

    return new_application


async def get_project_by_id(session: AsyncSession, project_id: int):
    stmt = (
        select(Project)
        .where(Project.id == project_id)
        .options(
            joinedload(Project.category),
            joinedload(Project.leader),
            selectinload(Project.technologies),
            selectinload(Project.vacancies),
            selectinload(Project.members),
        )
    )

    result = await session.execute(stmt)
    project = result.scalar_one_or_none()

    return project


async def get_projects(
    session: AsyncSession,
    sort_by: SortByChoice,
    category_id: Optional[int] = None,
    roles: Optional[List[str]] = None,
    tech_ids: Optional[List[int]] = None,
    min_members: Optional[int] = None,
    max_members: Optional[int] = None,
):
    stmt = select(Project).options(
        joinedload(Project.category), selectinload(Project.members)
    )

    if sort_by == "highest":
        stmt = stmt.order_by(Project.created_at.desc())

    elif sort_by == "lowest":
        stmt = stmt.order_by(Project.created_at.asc())

    if category_id:
        stmt = stmt.where(Project.category_id == category_id)

    if roles:
        stmt = stmt.where(Project.vacancies.any(Vacancy.name.in_(roles)))

    if tech_ids:
        stmt = stmt.where(Project.technologies.any(Technology.id.in_(tech_ids)))

    if min_members is not None or max_members is not None:
        members_count_subquery = (
            select(func.count(project_members.user_id))
            .where(project_members.project_id == Project.id)
            .scalar_subquery()
        )

        if min_members is not None:
            stmt = stmt.where(members_count_subquery >= min_members)
        if max_members is not None:
            stmt = stmt.where(members_count_subquery <= max_members)

    result = await session.execute(stmt)
    projects = result.scalars().unique().all()
    return list(projects)


async def get_recommended_projects(
    session: AsyncSession,
    current_user_id: int,
    limit: int = 5,
):
    current_user: User = await session.get(User, current_user_id)
    stmt = (
        select(Project)
        .options(joinedload(Project.category), selectinload(Project.members))
        .join(User, Project.leader_id == User.id)
        .where(User.specialty_id == current_user.specialty_id)
        .order_by(Project.created_at.desc())
        .limit(limit)
    )

    result = await session.execute(stmt)
    return result.scalars().unique().all()


async def create_project(
    session: AsyncSession,
    project_in: CreateProjectRequest,
    current_user_id: int,
):
    new_project = Project(
        title=project_in.title,
        goal=project_in.goal,
        description=project_in.description,
        image_url=project_in.image_url,
        category_id=project_in.category_id,
        leader_id=current_user_id,
    )

    session.add(new_project)
    await session.flush()

    if project_in.tech_ids:
        tech_values = [
            {"project_id": new_project.id, "technology_id": tid}
            for tid in project_in.tech_ids
        ]
        await session.execute(insert(project_technologies).values(tech_values))

    if project_in.vacancy_ids:
        vacancy_values = [
            {"project_id": new_project.id, "vacancy_id": vid}
            for vid in project_in.vacancy_ids
        ]
        await session.execute(insert(project_vacancies).values(vacancy_values))

    if project_in.participant_ids:
        member_values = [
            {"project_id": new_project.id, "user_id": mid}
            for mid in project_in.participant_ids
        ]
        await session.execute(insert(project_members).values(member_values))

    await session.commit()
    await session.refresh(new_project)

    return new_project


async def get_properties(session: AsyncSession, type: str):
    if type == "category":
        stmt = select(ProjectCategory)
    elif type == "technology":
        stmt = select(Technology)
    else:
        stmt = select(Vacancy)
    result: Result = await session.execute(stmt)
    categories = result.scalars().all()
    return list(categories)


async def get_project_applications(
    session: AsyncSession, project_id: int, user_id: int
):
    project = await session.get(Project, project_id)
    if not project:
        raise HTTPException(status_code=404, detail="Проєкт не знайдено")
    if project.leader_id != user_id:
        raise HTTPException(status_code=403, detail="Ви не є лідером цього проєкту")

    stmt = (
        select(Application)
        .options(selectinload(Application.applicant))
        .where(Application.project_id == project_id, Application.status == "pending")
    )
    result = await session.execute(stmt)
    return list(result.scalars().all())


async def process_application_decision(
    session: AsyncSession,
    project_id: int,
    application_id: int,
    action: str,
    user_id: int,
    background_tasks: BackgroundTasks,
    fm: FastMail,
):
    stmt_proj = (
        select(Project)
        .options(selectinload(Project.leader))
        .where(Project.id == project_id)
    )
    project = await session.scalar(stmt_proj)

    if not project or project.leader_id != user_id:
        raise HTTPException(status_code=403, detail="Доступ заборонено")

    stmt = (
        select(Application)
        .options(selectinload(Application.applicant))
        .where(Application.id == application_id)
    )
    application = await session.scalar(stmt)

    if not application:
        raise HTTPException(status_code=404, detail="Заявку не знайдено")

    applicant = application.applicant

    if action == "accept":
        application.status = "accepted"
        try:
            await session.execute(
                insert(project_members).values(
                    project_id=project_id, user_id=applicant.id
                )
            )
        except Exception:
            pass

        subject = f"Вас прийнято в команду проєкту {project.title}!"
        body = f"Вітаємо, {applicant.first_name}! Лідер проєкту <b>{project.title}</b> схвалив вашу заявку. Зв'яжіться з ним за поштою: {project.leader.email}"  # project.leader.email подтянется, если сделать selectinload

    elif action == "reject":
        application.status = "rejected"
        subject = f"Відхилення заявки: {project.title}"
        body = f"Привіт, {applicant.first_name}. На жаль, вашу заявку на проєкт <b>{project.title}</b> було відхилено. Не засмучуйтесь і шукайте інші круті проєкти на UniTeam!"
    else:
        raise HTTPException(
            status_code=400, detail="Невідома дія. Очікується 'accept' або 'reject'"
        )

    await session.commit()

    message = MessageSchema(
        subject=subject,
        recipients=[applicant.email],
        body=body,
        subtype=MessageType.html,
    )
    background_tasks.add_task(fm.send_message, message)

    return {"message": "Рішення успішно збережено та відправлено лист"}


async def complete_project(session: AsyncSession, project_id: int, user_id: int):
    project = await session.get(Project, project_id)
    if not project or project.leader_id != user_id:
        raise HTTPException(status_code=403, detail="Доступ заборонено")

    project.status = "COMPLETED"
    await session.commit()
    return {"message": "Проєкт успішно завершено!"}
