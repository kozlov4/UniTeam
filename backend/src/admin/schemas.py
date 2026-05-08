from pydantic import BaseModel, EmailStr, Field


class MainInfo(BaseModel):
    students_count: int
    projects_count: int
    technologies_count: int

    class Config:
        from_attributes = True


class ProjectResponse(BaseModel):
    title: str
    description: str
    participants_count: int
    status: str

    class Config:
        from_attributes = True


class UserResponse(BaseModel):
    email: EmailStr
    first_name: str
    is_blocked: bool

    class Config:
        from_attributes = True


class CreateTechnology(BaseModel):
    name: str = Field(..., min_length=2, max_length=800)
