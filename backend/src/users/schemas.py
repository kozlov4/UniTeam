from datetime import datetime

from pydantic import BaseModel, Field, EmailStr
from typing import Optional, List


from pydantic import BaseModel
from typing import Optional, List


class UserCardResponse(BaseModel):
    id: int
    first_name: str
    last_name: str
    avatar_url: Optional[str] = None
    bio_description: Optional[str] = None
    course_year: Optional[int] = None

    specialty_name: Optional[str] = None
    skill_names: List[str] = []

    class Config:
        from_attributes = True


class UserProfileResponse(BaseModel):
    id: int
    first_name: str
    last_name: str
    avatar_url: Optional[str] = None
    email: str

    class Config:
        from_attributes = True


class AvatarResponse(BaseModel):
    id: int
    avatar_url: Optional[str]

    class Config:
        from_attributes = True


class CompletedProjectCard(BaseModel):
    id: int
    title: str
    description: str
    image_url: Optional[str]
    category_name: Optional[str]
    created_at: datetime
    participants_count: int
    avatars: List[AvatarResponse]

    class Config:
        from_attributes = True


class UserProfileDetailResponse(BaseModel):
    id: int
    first_name: str
    last_name: str
    avatar_url: Optional[str]
    specialty_name: Optional[str]
    skill_names: List[str]
    completed_projects_count: int
    completed_projects: List[CompletedProjectCard]

    class Config:
        from_attributes = True


class UserUpdateMeRequest(BaseModel):
    email: Optional[EmailStr] = None
    specialty_id: Optional[int] = None
    technology_ids: Optional[List[int]] = None
    avatar_url: Optional[str] = None


class BaseProjectCard(BaseModel):
    id: int
    title: str
    description: str
    image_url: Optional[str]
    category_name: Optional[str]
    created_at: datetime
    participants_count: int
    avatars: List[AvatarResponse]

    class Config:
        from_attributes = True


class UserMyProfileDetailResponse(BaseModel):
    id: int
    email: str
    first_name: str
    last_name: str
    avatar_url: Optional[str]

    specialty_id: Optional[int]
    specialty_name: Optional[str]
    skill_ids: List[int]
    skill_names: List[str]

    active_projects: List[BaseProjectCard]
    completed_projects_count: int
    completed_projects: List[BaseProjectCard]

    class Config:
        from_attributes = True
