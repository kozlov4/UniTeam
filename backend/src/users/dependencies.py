import jwt
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from auth import decode_jwt

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/swagger-login/")


import jwt
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer

from auth import decode_jwt

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/swagger-login/")


async def get_current_user(
    token: str = Depends(oauth2_scheme),
) -> int:
    try:
        payload = decode_jwt(token)

        if payload.get("type") != "access":
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Неверный тип токена",
            )

        user_id_str = payload.get("sub")

        if not user_id_str:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="В токене отсутствует ID пользователя",
            )

        return int(user_id_str)

    except jwt.ExpiredSignatureError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Токен истёк",
        )

    except jwt.InvalidTokenError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Неверный токен",
        )


async def get_admin_user(
    token: str = Depends(oauth2_scheme),
) -> int:
    payload = decode_jwt(token)

    role = payload.get("role")

    if role != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Недостаточно прав",
        )

    return await get_current_user(token)
