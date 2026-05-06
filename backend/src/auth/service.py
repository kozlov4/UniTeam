import jwt
from fastapi import HTTPException, status
from .schemas import UserRegistration, UserLogin
from .utils import validate_password, decode_jwt
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from core.models import User
from .schemas import TokenInfo
from .utils import hash_password, encode_jwt, transliterate_to_ukrainian


async def register_user(
    session: AsyncSession,
    user_in: UserRegistration,
) -> TokenInfo:

    stmt = select(User).where(User.email == user_in.email).limit(1)
    result = await session.execute(stmt)
    user: User | None = result.scalar_one_or_none()

    if user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid email"
        )
    if not user_in.email.endswith("@nure.ua"):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Регістрація  тільки для доменів @nure.ua",
        )
    name_part = user_in.email.split("@")[0]

    if "." in name_part:
        first_raw, last_raw = name_part.split(".", 1)
    else:
        first_raw, last_raw = name_part, ""

    first_name = transliterate_to_ukrainian(first_raw)
    last_name = transliterate_to_ukrainian(last_raw)

    hashed_pwd = hash_password(user_in.password)

    new_user = User(
        email=user_in.email,
        password_hash=hashed_pwd.decode("utf-8"),
        first_name=first_name,
        last_name=last_name,
    )

    session.add(new_user)
    await session.commit()
    await session.refresh(new_user)

    access_token = encode_jwt(
        payload={"sub": str(new_user.id), "type": "access"}, expire_minutes=15
    )
    refresh_token = encode_jwt(
        payload={"sub": str(new_user.id), "type": "refresh"},
        expire_minutes=60 * 24 * 30,
    )

    return TokenInfo(
        access_token=access_token,
        refresh_token=refresh_token,
        token_type="Bearer",
    )


async def user_login(
    session: AsyncSession,
    user_in: UserLogin,
) -> TokenInfo:
    stmt = select(User).where(User.email == user_in.email).limit(1)
    result = await session.execute(stmt)
    user: User | None = result.scalar_one_or_none()

    if not user or not validate_password(
        user_in.password,
        user.password_hash.encode("utf-8"),
    ):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid email or pass"
        )

    access_token = encode_jwt(
        payload={"sub": str(user.id), "type": "access"}, expire_minutes=15
    )
    refresh_token = encode_jwt(
        payload={"sub": str(user.id), "type": "refresh"}, expire_minutes=60 * 24 * 30
    )

    return TokenInfo(
        access_token=access_token,
        refresh_token=refresh_token,
        token_type="Bearer",
    )


async def refresh_access_token(session: AsyncSession, refresh_token: str) -> TokenInfo:
    try:
        payload = decode_jwt(refresh_token)

        if payload.get("type") != "refresh":
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token type"
            )

        user_id = payload.get("sub")

    except jwt.ExpiredSignatureError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Сесія закінчилася.",
        )
    except jwt.InvalidTokenError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Недійсний токен"
        )

    stmt = select(User).where(User.id == int(user_id)).limit(1)
    result = await session.execute(stmt)
    user: User | None = result.scalar_one_or_none()

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="User not found"
        )

    new_access_token = encode_jwt(
        payload={"sub": str(user.id), "type": "access"}, expire_minutes=15
    )
    new_refresh_token = encode_jwt(
        payload={"sub": str(user.id), "type": "refresh"}, expire_minutes=60 * 24 * 30
    )

    return TokenInfo(
        access_token=new_access_token,
        refresh_token=new_refresh_token,
        token_type="Bearer",
    )
