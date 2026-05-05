import random
from datetime import datetime, timedelta, timezone
from datetime import datetime, timedelta
from fastapi import BackgroundTasks, HTTPException
from fastapi_mail import FastMail, MessageSchema, MessageType
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from starlette import status
from auth.utils import hash_password

from models import User
from .schemas import ForgotPasswordRequest, ResetPasswordRequest


async def forgot_password(
    request: ForgotPasswordRequest,
    background_tasks: BackgroundTasks,
    session: AsyncSession,
    fm: FastMail,
):
    query = select(User).where(User.email == request.email)
    user = await session.scalar(query)

    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Користувача з таким email не знайдено",
        )

    reset_code = str(random.randint(100000, 999999))
    expire_time = datetime.utcnow() + timedelta(minutes=15)

    user.reset_code = reset_code
    user.reset_code_expire = expire_time

    await session.commit()

    html_content = f"""
    <h2>UniTeam Support</h2>
    <p>Ваш код для відновлення паролю: <strong>{reset_code}</strong></p>
    <p>Код дійсний протягом 15 хвилин.</p>
    """

    message = MessageSchema(
        subject="Відновлення паролю",
        recipients=[user.email],
        body=html_content,
        subtype=MessageType.html,
    )

    background_tasks.add_task(fm.send_message, message)

    return {"message": "Код відправлено, перевірте вашу пошту"}


async def reset_password(request: ResetPasswordRequest, session: AsyncSession):
    query = select(User).where(User.email == request.email)
    user = await session.scalar(query)

    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Користувача з таким email не знайдено",
        )

    if user.reset_code != request.code:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Невірний код підтвердження",
        )

    if not user.reset_code_expire:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Термін дії коду минув або його не існує. Спробуйте ще раз.",
        )

    current_time = datetime.utcnow()

    db_expire_time = (
        user.reset_code_expire.replace(tzinfo=None)
        if user.reset_code_expire.tzinfo
        else user.reset_code_expire
    )

    if db_expire_time < current_time:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Термін дії коду минув. Спробуйте ще раз.",
        )

    hashed_pwd = hash_password(request.new_password)
    user.password_hash = hashed_pwd.decode("utf-8")

    user.reset_code = None
    user.reset_code_expire = None

    await session.commit()

    return {"message": "Пароль успішно змінено"}
