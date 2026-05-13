from typing import Optional, List

from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.ext.asyncio import AsyncSession
from .schemas import (
    ProjectCardResponse,
    SortByChoice,
    CreateProjectRequest,
    CategoryCardResponse,
    TechnologyCardResponse,
    VacancyCardResponse,
    ProjectDetailOut,
    CreateApplicationRequest,
)
from core.models.db_helper import db_helper
from . import service
from users.dependencies import get_current_user

router = APIRouter(prefix="/projects", tags=["Projects"])


@router.get(
    "/",
    response_model=list[ProjectCardResponse],
    dependencies=[Depends(get_current_user)],
)
async def get_projects(
    session: AsyncSession = Depends(db_helper.session_dependency),
    sort_by: SortByChoice = Query(default=SortByChoice.newest, description="Sort type"),
    category_id: Optional[int] = None,
    roles: Optional[List[str]] = Query(None),
    tech_ids: Optional[List[int]] = Query(None),
    min_members: Optional[int] = None,
    max_members: Optional[int] = None,
):
    return await service.get_projects(
        session=session,
        sort_by=sort_by,
        category_id=category_id,
        roles=roles,
        tech_ids=tech_ids,
        min_members=min_members,
        max_members=max_members,
    )


@router.get("/{project_id}", response_model=ProjectDetailOut)
async def get_project(
    project_id: int, session: AsyncSession = Depends(db_helper.session_dependency)
):
    project = await service.get_project_by_id(session, project_id)

    if not project:
        raise HTTPException(status_code=404, detail="Проєкт не знайдено")

    return project


@router.get("/my-specialty/", response_model=list[ProjectCardResponse])
async def get_my_specialty_projects(
    session: AsyncSession = Depends(db_helper.session_dependency),
    current_user_id: int = Depends(get_current_user),  # Отримуємо того, хто залогінився
):
    """
    Отримує проєкти, що повязані зі спеціальністю поточного студента
    """
    return await service.get_recommended_projects(
        session=session, current_user_id=current_user_id
    )


@router.get("/categories/", response_model=list[CategoryCardResponse])
async def get_properties(
    session: AsyncSession = Depends(db_helper.session_dependency),
):
    return await service.get_properties(session=session, type="category")


@router.get("/technologies/", response_model=list[TechnologyCardResponse])
async def get_properties(
    session: AsyncSession = Depends(db_helper.session_dependency),
):
    return await service.get_properties(session=session, type="technology")


@router.get("/vacancies/", response_model=list[VacancyCardResponse])
async def get_properties(
    session: AsyncSession = Depends(db_helper.session_dependency),
):
    return await service.get_properties(session=session, type="vacancy")


@router.post("/", status_code=status.HTTP_201_CREATED)
async def create_project(
    project_in: CreateProjectRequest,
    session: AsyncSession = Depends(db_helper.session_dependency),
    current_user_id: int = Depends(get_current_user),
):
    return await service.create_project(
        session=session, project_in=project_in, current_user_id=current_user_id
    )


@router.post("/application/", status_code=status.HTTP_201_CREATED)
async def create_application(
    application_in: CreateApplicationRequest,
    session: AsyncSession = Depends(db_helper.session_dependency),
    current_user_id: int = Depends(get_current_user),
):
    return await service.create_application(
        session=session, application_in=application_in, current_user_id=current_user_id
    )
