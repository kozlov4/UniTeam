from typing import List, Optional
from pydantic import BaseModel, ConfigDict, Field
from enum import Enum


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
    description: str
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
