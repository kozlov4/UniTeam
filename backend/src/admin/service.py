import jwt
from typing import TypeVar, Type
from fastapi import HTTPException, status
from sqlalchemy import select, func, or_, delete, insert
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload, joinedload
from auth.utils import transliterate_to_ukrainian
from core.models import (
    User,
    Project,
    Technology,
    Base,
    project_technologies,
    project_members,
    project_vacancies,
    Specialty,
    user_technologies,
)
from .schemas import (
    MainInfo,
    ProjectResponse,
    UserResponse,
    CreateTechnology,
    UpdateProjectRequest,
    UserUpdateRequest,
    UserBanRequest,
)
from projects.schemas import TechnologyCardResponse

ModelType = TypeVar("ModelType", bound=Base)


async def get_main_info(session: AsyncSession) -> MainInfo:
    stmt_students = select(func.count(User.id)).where(User.role == "user")
    students_count = await session.scalar(stmt_students) or 0

    stmt_projects = select(func.count(Project.id))
    projects_count = await session.scalar(stmt_projects) or 0

    stmt_techs = select(func.count(Technology.id))
    technologies_count = await session.scalar(stmt_techs) or 0

    return MainInfo(
        students_count=students_count,
        projects_count=projects_count,
        technologies_count=technologies_count,
    )


async def get_specialties_info(session: AsyncSession):
    stmt = select(Specialty)
    result = await session.execute(stmt)
    return list(result.scalars().all())


async def get_projects(
    session: AsyncSession,
    search_text: str | None = None,
) -> list[ProjectResponse]:
    stmt = select(Project).options(selectinload(Project.members))

    if search_text:
        search_pattern = f"%{search_text}%"
        stmt = stmt.where(
            or_(
                Project.title.ilike(search_pattern),
            )
        )

    result = await session.execute(stmt)
    return list(result.scalars().all())


async def get_users(
    session: AsyncSession,
    search_text: str | None = None,
) -> list[UserResponse]:
    stmt = select(User)

    if search_text:
        search_pattern = f"%{search_text}%"
        stmt = stmt.where(
            or_(
                User.email.ilike(search_pattern),
            )
        )

    result = await session.execute(stmt)
    return list(result.scalars().all())


async def get_technologies(
    session: AsyncSession,
    search_text: str | None = None,
) -> list[TechnologyCardResponse]:
    stmt = select(Technology)

    if search_text:
        search_pattern = f"%{search_text}%"
        stmt = stmt.where(
            or_(
                Technology.name.ilike(search_pattern),
            )
        )

    result = await session.execute(stmt)
    return list(result.scalars().all())


from sqlalchemy import select
from fastapi import HTTPException, status


async def create_technology(session: AsyncSession, technology_in: CreateTechnology):
    stmt = select(Technology).where(Technology.name == technology_in.name)
    result = await session.execute(stmt)
    existing_tech = result.scalar_one_or_none()

    if existing_tech:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Технологія '{technology_in.name}' вже існує.",
        )

    new_technology = Technology(name=technology_in.name)
    session.add(new_technology)
    await session.commit()
    await session.refresh(new_technology)

    return new_technology


async def delete_entity(
    session: AsyncSession,
    model: Type[ModelType],
    entity_id: int,
    entity_name: str = "Запис",
):
    entity = await session.get(model, entity_id)

    if not entity:
        raise HTTPException(status_code=404, detail=f"{entity_name} не знайдена")

    await session.delete(entity)
    await session.commit()

    return {"message": f"{entity_name} успішно видалена"}


async def update_project(
    session: AsyncSession,
    project_id: int,
    project_in: UpdateProjectRequest,
):
    project = await session.get(Project, project_id)
    if not project:
        raise HTTPException(status_code=404, detail="Проект не найден")

    update_data = project_in.model_dump(
        exclude_unset=True,
        exclude={"tech_ids", "vacancy_ids", "participant_ids"},
    )

    if update_data:
        for key, value in update_data.items():
            setattr(project, key, value)

    async def update_m2m(table, id_column: str, new_ids: list[int] | None):
        if new_ids is not None:
            await session.execute(delete(table).where(table.c.project_id == project_id))
            if new_ids:
                values = [
                    {"project_id": project_id, id_column: item_id}
                    for item_id in new_ids
                ]
                await session.execute(insert(table).values(values))

    await update_m2m(project_technologies, "technology_id", project_in.tech_ids)
    await update_m2m(project_vacancies, "vacancy_id", project_in.vacancy_ids)
    await update_m2m(project_members, "user_id", project_in.participant_ids)

    await session.commit()
    await session.refresh(project)

    return project


async def update_user(session: AsyncSession, user_id: int, user_in: UserUpdateRequest):
    user = await session.get(User, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="Користувача не знайдено")

    if user_in.email is not None and user_in.email != user.email:
        if not user_in.email.endswith("@nure.ua"):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Дозволено використовувати лише домен @nure.ua",
            )

        stmt = select(User).where(User.email == user_in.email, User.id != user_id)
        existing_user = await session.scalar(stmt)
        if existing_user:
            raise HTTPException(
                status_code=400, detail="Цей email вже використовується"
            )

        name_part = user_in.email.split("@")[0]
        if "." in name_part:
            first_raw, last_raw = name_part.split(".", 1)
        else:
            first_raw, last_raw = name_part, ""

        user.email = user_in.email
        user.first_name = transliterate_to_ukrainian(first_raw)
        user.last_name = transliterate_to_ukrainian(last_raw)

    if user_in.specialty_id is not None:
        user.specialty_id = user_in.specialty_id

    if user_in.technology_ids is not None:
        await session.execute(
            delete(user_technologies).where(user_technologies.c.user_id == user_id)
        )
        if user_in.technology_ids:
            values = [
                {"user_id": user_id, "technology_id": tech_id}
                for tech_id in set(user_in.technology_ids)
            ]
            await session.execute(insert(user_technologies).values(values))

    await session.commit()
    await session.refresh(user)

    return user


async def update_user_block_status(
    session: AsyncSession, user_id: int, user_in: UserBanRequest
):
    user = await session.get(User, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="Користувача не знайдено")

    user.is_blocked = user_in.is_blocked

    await session.commit()
    await session.refresh(user)

    return user
