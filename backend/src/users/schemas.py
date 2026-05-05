from pydantic import BaseModel, Field
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
