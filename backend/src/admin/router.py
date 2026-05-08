from fastapi.security import OAuth2PasswordRequestForm
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from core.models.db_helper import db_helper
from . import service
from .schemas import MainInfo, ProjectResponse

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
