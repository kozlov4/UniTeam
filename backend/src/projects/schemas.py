from typing import List, Optional
from pydantic import BaseModel, ConfigDict
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
    avatars: List[ProjectMemberAvatar] = []

    model_config = ConfigDict(from_attributes=True)
