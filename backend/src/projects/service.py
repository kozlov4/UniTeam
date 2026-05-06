from typing import Optional, List

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
)
from .schemas import SortByChoice, CreateProjectRequest


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
