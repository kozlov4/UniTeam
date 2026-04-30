from typing import Optional, List

from sqlalchemy import select, func
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import joinedload, selectinload
from models import Project, ProjectMember, ProjectVacancy, Technology
from .schemas import SortByChoice


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
        stmt = stmt.where(Project.vacancies.any(ProjectVacancy.role_name.in_(roles)))

    if tech_ids:
        stmt = stmt.where(Project.technologies.any(Technology.id.in_(tech_ids)))

    if min_members is not None or max_members is not None:
        members_count_subquery = (
            select(func.count(ProjectMember.user_id))
            .where(ProjectMember.project_id == Project.id)
            .scalar_subquery()
        )

        if min_members is not None:
            stmt = stmt.where(members_count_subquery >= min_members)
        if max_members is not None:
            stmt = stmt.where(members_count_subquery <= max_members)

    result = await session.execute(stmt)
    projects = result.scalars().unique().all()
    return list(projects)
