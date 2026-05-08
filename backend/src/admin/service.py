import jwt
from fastapi import HTTPException, status
from sqlalchemy import select, func
from sqlalchemy.ext.asyncio import AsyncSession
from core.models import User, Project, Technology
from .schemas import MainInfo


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
