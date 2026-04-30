from fastapi.security import OAuth2PasswordRequestForm
from .schemas import UserRegistration, TokenInfo
from .schemas import UserLogin, RefreshTokenRequest
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from core.models.db_helper import db_helper
from . import service

router = APIRouter(tags=["Authentication"])


@router.post("/register/", status_code=status.HTTP_201_CREATED)
async def user_registration(
    user_data: UserRegistration,
    session: AsyncSession = Depends(db_helper.session_dependency),
):
    return await service.register_user(session=session, user_in=user_data)


@router.post("/login/")
async def login_for_swagger(
    form_data: OAuth2PasswordRequestForm = Depends(),
    session: AsyncSession = Depends(db_helper.session_dependency),
):
    user_data = UserLogin(email=form_data.username, password=form_data.password)
    return await service.user_login(session=session, user_in=user_data)


@router.post("/refresh/", response_model=TokenInfo)
async def refresh_jwt_tokens(
    token_data: RefreshTokenRequest,
    session: AsyncSession = Depends(db_helper.session_dependency),
):

    return await service.refresh_access_token(
        session=session, refresh_token=token_data.refresh_token
    )
