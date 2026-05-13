from fastapi import Depends, HTTPException, status
from auth import decode_jwt

from users.dependencies import oauth2_scheme, get_current_user


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
