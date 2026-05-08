import jwt
from fastapi import HTTPException, status
from sqlalchemy import select, func, or_
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload, joinedload

from core.models import User, Project, Technology
from .schemas import MainInfo, ProjectResponse, UserResponse, CreateTechnology
from projects.schemas import TechnologyCardResponse


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


async def delete_technology(session: AsyncSession, technology_id: int):
    technology = await session.get(Technology, technology_id)

    if not technology:
        raise HTTPException(status_code=404, detail="Технологія не знайдена")

    await session.delete(technology)
    await session.commit()
    return {"message": f"Технологія {technology.name} видалена"}
