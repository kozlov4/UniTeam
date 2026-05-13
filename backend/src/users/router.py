from fastapi import APIRouter, Depends, Query, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from typing import Optional, List
from core.models.db_helper import db_helper
from . import schemas, service
from .dependencies import get_current_user
from core.models import User
from .schemas import UserProfileResponse, UserProfileDetailResponse, UserUpdateMeRequest
from admin.service import update_user

router = APIRouter(prefix="/users", tags=["Users"])


@router.get(
    "/",
    response_model=List[schemas.UserCardResponse],
    dependencies=[Depends(get_current_user)],
)
async def get_participants(
    limit: int = Query(20, ge=1, le=100, description="Кількість записів на сторінку"),
    offset: int = Query(0, ge=0, description="Зсув для пагінації"),
    search: Optional[str] = Query(None, description="Пошук за ім'ям або прізвищем"),
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
        specialty_id=specialty_id,
        skill_ids=skill_ids,
    )

    return users


@router.get(
    "/{user_id}/",
    response_model=UserProfileDetailResponse,
    dependencies=[Depends(get_current_user)],
)
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


@router.patch("/me/", response_model=UserProfileResponse)
async def update_my_profile(
    user_in: UserUpdateMeRequest,
    current_user_id: int = Depends(get_current_user),
    session: AsyncSession = Depends(db_helper.session_dependency),
):
    return await update_user(session=session, user_id=current_user_id, user_in=user_in)


from .schemas import UserMyProfileDetailResponse


@router.get(
    "/me/profile/",
    response_model=UserMyProfileDetailResponse,
    dependencies=[Depends(get_current_user)],
)
async def get_my_full_profile(
    current_user_id: int = Depends(get_current_user),
    session: AsyncSession = Depends(db_helper.session_dependency),
):
    user = await service.get_my_profile_detail(session=session, user_id=current_user_id)

    if not user:
        raise HTTPException(status_code=404, detail="Користувача не знайдено")

    return user
