from pydantic import BaseModel, EmailStr, Field
from users.schemas import UserProfileResponse


class TokenInfo(BaseModel):
    access_token: str
    refresh_token: str | None = None
    token_type: str = "Bearer"
    user: UserProfileResponse


class RefreshTokenRequest(BaseModel):
    refresh_token: str


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class UserRegistration(BaseModel):
    email: EmailStr
    password: str = Field(min_length=8, max_length=100)

    class Config:
        from_attributes = True
