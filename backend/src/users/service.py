from fastapi import HTTPException, BackgroundTasks
from fastapi_mail import FastMail, MessageType, MessageSchema
from sqlalchemy import select, or_, insert
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload
from typing import Optional, List
from core.models import User, Project, project_members, user_technologies, Application


async def get_participants_list(
    session: AsyncSession,
    limit: int = 20,
    offset: int = 0,
    search: Optional[str] = None,
    specialty_id: Optional[int] = None,
    skill_ids: Optional[List[int]] = None,
):
    query = select(User).options(
        selectinload(User.specialty), selectinload(User.skills)
    )

    if search:
        query = query.where(
            or_(
                User.first_name.ilike(f"%{search}%"),
                User.last_name.ilike(f"%{search}%"),
            )
        )

    if specialty_id is not None:
        query = query.where(User.specialty_id == specialty_id)

    if skill_ids:
        query = query.join(user_technologies).where(
            user_technologies.technology_id.in_(skill_ids)
        )

    query = query.order_by(User.created_at.desc()).limit(limit).offset(offset)

    result = await session.execute(query)
    users = result.scalars().all()

    return users


async def get_user_profile_detail(session: AsyncSession, user_id: int):
    stmt_user = (
        select(User)
        .options(selectinload(User.specialty), selectinload(User.skills))
        .where(User.id == user_id)
    )
    user = await session.scalar(stmt_user)

    if not user:
        return None

    stmt_projects = (
        select(Project)
        .options(selectinload(Project.category), selectinload(Project.members))
        .join(project_members)
        .where(project_members.c.user_id == user_id, Project.status == "COMPLETED")
    )
    projects_result = await session.execute(stmt_projects)
    completed_projects = list(projects_result.scalars().all())

    setattr(user, "completed_projects", completed_projects)
    setattr(user, "completed_projects_count", len(completed_projects))

    return user


async def get_my_profile_detail(session: AsyncSession, user_id: int):
    stmt_user = (
        select(User)
        .options(selectinload(User.specialty), selectinload(User.skills))
        .where(User.id == user_id)
    )
    user = await session.scalar(stmt_user)

    if not user:
        return None

    stmt_projects = (
        select(Project)
        .options(selectinload(Project.category), selectinload(Project.members))
        .outerjoin(project_members)
        .where(
            or_(
                project_members.c.user_id == user_id,
                Project.leader_id == user_id,
            )
        )
    )

    projects_result = await session.execute(stmt_projects)

    all_projects = list(projects_result.scalars().unique().all())

    active_projects = [p for p in all_projects if p.status == "ACTIVE"]
    completed_projects = [p for p in all_projects if p.status == "COMPLETED"]

    setattr(
        user, "skill_ids", [skill.id for skill in user.skills] if user.skills else []
    )
    setattr(user, "active_projects", active_projects)
    setattr(user, "completed_projects", completed_projects)
    setattr(user, "completed_projects_count", len(completed_projects))

    return user
