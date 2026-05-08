from fastapi.security import OAuth2PasswordRequestForm
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from core.models.db_helper import db_helper
from . import service
from .schemas import MainInfo

router = APIRouter(prefix="/admin", tags=["Admin"])


@router.get("/main/", response_model=MainInfo)
async def get_main_info(session: AsyncSession = Depends(db_helper.session_dependency)):
    return await service.get_main_info(session=session)
