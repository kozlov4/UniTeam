from typing import Optional, List

from pydantic import BaseModel, EmailStr, Field


class SpecialtiesResponse(BaseModel):
    id: int
    name: str

    class Config:
        from_attributes = True


class MainInfo(BaseModel):
    students_count: int
    projects_count: int
    technologies_count: int

    class Config:
        from_attributes = True


class ProjectResponse(BaseModel):
    id: int
    title: str
    description: str
    participants_count: int
    status: str

    class Config:
        from_attributes = True


class UserResponse(BaseModel):
    id: int
    email: EmailStr
    first_name: str
    is_blocked: bool

    class Config:
        from_attributes = True


class CreateTechnology(BaseModel):
    name: str = Field(..., min_length=2, max_length=800)


class UpdateProjectRequest(BaseModel):
    title: Optional[str] = Field(None, min_length=3, max_length=150)
    goal: Optional[str] = None
    description: Optional[str] = Field(None, max_length=1500)

    image_url: Optional[str] = None
    category_id: Optional[int] = None

    tech_ids: Optional[List[int]] = None
    vacancy_ids: Optional[List[int]] = None
    participant_ids: Optional[List[int]] = None


class UserUpdateRequest(BaseModel):
    email: Optional[EmailStr] = None
    specialty_id: Optional[int] = None
    technology_ids: Optional[List[int]] = None
