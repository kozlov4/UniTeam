from sqlalchemy import select, or_
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload
from typing import Optional, List
from core.models import User, UserSkill


async def get_participants_list(
    session: AsyncSession,
    limit: int = 20,
    offset: int = 0,
    search: Optional[str] = None,
    course_year: Optional[int] = None,
    faculty_id: Optional[int] = None,
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

    if course_year is not None:
        query = query.where(User.course_year == course_year)

    if faculty_id is not None:
        query = query.where(User.faculty_id == faculty_id)

    if specialty_id is not None:
        query = query.where(User.specialty_id == specialty_id)

    if skill_ids:
        query = query.join(UserSkill).where(UserSkill.skill_id.in_(skill_ids))

    query = query.order_by(User.created_at.desc()).limit(limit).offset(offset)

    result = await session.execute(query)
    users = result.scalars().all()

    return users
