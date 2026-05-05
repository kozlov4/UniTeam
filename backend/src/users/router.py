from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession
from typing import Optional, List
from core.models.db_helper import db_helper
from . import schemas, service

router = APIRouter(prefix="/users", tags=["Users"])


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
