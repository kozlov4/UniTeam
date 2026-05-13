from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel, ConfigDict, Field
from enum import Enum

from users.schemas import AvatarResponse


class SortByChoice(str, Enum):
    newest = "newest"
    lowest = "lowest"


class ProjectMemberAvatar(BaseModel):
    id: int
    avatar_url: Optional[str] = None

    model_config = ConfigDict(from_attributes=True)


class ProjectCardResponse(BaseModel):
    id: int
    title: str
    image_url: Optional[str] = None
    category_name: Optional[str] = None
    participants_count: int
    goal: str
    avatars: List[ProjectMemberAvatar] = []

    model_config = ConfigDict(from_attributes=True)


class CategoryCardResponse(BaseModel):
    id: int
    name: str

    model_config = ConfigDict(from_attributes=True)


class TechnologyCardResponse(BaseModel):
    id: int
    name: str
    model_config = ConfigDict(from_attributes=True)


class VacancyCardResponse(BaseModel):
    id: int
    name: str
    model_config = ConfigDict(from_attributes=True)


class CreateProjectRequest(BaseModel):
    title: str = Field(..., min_length=3, max_length=150)
    goal: str
    description: str = Field(..., max_length=1500)

    image_url: Optional[str] = None

    category_id: int

    tech_ids: List[int] = []
    vacancy_ids: List[int] = []
    participant_ids: List[int] = []


class CreateApplicationRequest(BaseModel):
    cover_letter: str = Field(..., min_length=50, max_length=1500)
    project_id: int


class CategoryOut(CategoryCardResponse):
    pass


class TechnologyOut(BaseModel):
    id: int
    name: str
    model_config = ConfigDict(from_attributes=True)


class VacancyOut(BaseModel):
    id: int
    name: str
    model_config = ConfigDict(from_attributes=True)


class UserShortOut(BaseModel):
    id: int
    first_name: str
    last_name: str
    avatar_url: Optional[str] = None
    model_config = ConfigDict(from_attributes=True)


class ProjectDetailOut(BaseModel):
    id: int
    title: str
    goal: Optional[str]
    description: str
    image_url: Optional[str]

    category: Optional[CategoryOut]
    leader: UserShortOut

    technologies: List[TechnologyOut]
    vacancies: List[VacancyOut]
    members: List[UserShortOut]

    model_config = ConfigDict(from_attributes=True)


class ActiveProjectCard(BaseModel):
    id: int
    title: str
    description: str
    image_url: Optional[str]
    category_name: Optional[str]
    participants_count: int
    avatars: List[AvatarResponse]

    class Config:
        from_attributes = True


class ApplicationApplicant(BaseModel):
    id: int
    first_name: str
    last_name: str
    email: str
    avatar_url: Optional[str]

    class Config:
        from_attributes = True


class ApplicationResponse(BaseModel):
    id: int
    cover_letter: str
    status: str
    created_at: datetime
    applicant: ApplicationApplicant

    class Config:
        from_attributes = True


class ApplicationDecision(BaseModel):
    action: str
