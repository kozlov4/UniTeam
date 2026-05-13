from fastapi import APIRouter, Depends, Query, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from typing import Optional, List
from core.models.db_helper import db_helper
from . import schemas, service
from .dependencies import get_current_user
from core.models import User
from .schemas import UserProfileResponse, UserProfileDetailResponse

router = APIRouter(prefix="/users", tags=["Users"])


@router.get("/me/", response_model=UserProfileResponse)
async def get_me(
    current_user_id: User = Depends(get_current_user),
    session: AsyncSession = Depends(db_helper.session_dependency),
):
    current_user: User = await session.get(User, current_user_id)
    return current_user


@router.get("/", response_model=List[schemas.UserCardResponse])
async def get_participants(
    limit: int = Query(20, ge=1, le=100, description="Кількість записів на сторінку"),
    offset: int = Query(0, ge=0, description="Зсув для пагінації"),
    search: Optional[str] = Query(None, description="Пошук за ім'ям або прізвищем"),
    course_year: Optional[int] = Query(None, description="Курс (наприклад, 3)"),
    faculty_id: Optional[int] = Query(None, description="ID факультету"),
    specialty_id: Optional[int] = Query(None, description="ID спеціальності"),
    skill_ids: Optional[List[int]] = Query(
        None, description="Список ID навичок для фільтрації"
    ),
    session: AsyncSession = Depends(db_helper.session_dependency),
):
    users = await service.get_participants_list(
        session=session,
        limit=limit,
        offset=offset,
        search=search,
        course_year=course_year,
        faculty_id=faculty_id,
        specialty_id=specialty_id,
        skill_ids=skill_ids,
    )

    return users


@router.get("/{user_id}/profile/", response_model=UserProfileDetailResponse)
async def get_user_profile(
    user_id: int, session: AsyncSession = Depends(db_helper.session_dependency)
):
    """
    Отримує детальну інформацію про користувача для його сторінки профілю,
    включаючи навички та завершені проєкти.
    """
    user = await service.get_user_profile_detail(session=session, user_id=user_id)

    if not user:
        raise HTTPException(status_code=404, detail="Користувача не знайдено")

    return user
