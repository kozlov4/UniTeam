from fastapi.security import OAuth2PasswordRequestForm
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from core.models.db_helper import db_helper
from core.models import Technology, User, Project
from . import service
from .schemas import MainInfo, ProjectResponse, UserResponse, CreateTechnology
from projects.schemas import TechnologyCardResponse

router = APIRouter(prefix="/admin", tags=["Admin"])


@router.get("/main/", response_model=MainInfo)
async def get_main_info(session: AsyncSession = Depends(db_helper.session_dependency)):
    return await service.get_main_info(session=session)


@router.get("/projects/", response_model=list[ProjectResponse])
async def get_projects(
    session: AsyncSession = Depends(db_helper.session_dependency),
    search_text: str | None = None,
):
    return await service.get_projects(
        session=session,
        search_text=search_text,
    )


@router.get("/users/", response_model=list[UserResponse])
async def get_users(
    session: AsyncSession = Depends(db_helper.session_dependency),
    search_text: str | None = None,
):
    return await service.get_users(
        session=session,
        search_text=search_text,
    )


@router.get("/technologies/", response_model=list[TechnologyCardResponse])
async def get_technologies(
    session: AsyncSession = Depends(db_helper.session_dependency),
    search_text: str | None = None,
):
    return await service.get_technologies(
        session=session,
        search_text=search_text,
    )


@router.post("/technologies/", status_code=status.HTTP_201_CREATED)
async def create_technology(
    technology_in: CreateTechnology,
    session: AsyncSession = Depends(db_helper.session_dependency),
):
    return await service.create_technology(
        session=session,
        technology_in=technology_in,
    )


@router.delete("/technologies/{technology_id}")
async def delete_technology_endpoint(
    technology_id: int,
    session: AsyncSession = Depends(db_helper.session_dependency),
):
    return await service.delete_entity(
        session=session,
        model=Technology,
        entity_id=technology_id,
        entity_name="Технологія",
    )


@router.delete("/projects/{project_id}")
async def delete_project_endpoint(
    project_id: int,
    session: AsyncSession = Depends(db_helper.session_dependency),
):
    return await service.delete_entity(
        session=session, model=Project, entity_id=project_id, entity_name="Проєкт"
    )


@router.delete("/users/{user_id}")
async def delete_user_endpoint(
    user_id: int,
    session: AsyncSession = Depends(db_helper.session_dependency),
):
    return await service.delete_entity(
        session=session, model=User, entity_id=user_id, entity_name="Користувач"
    )
