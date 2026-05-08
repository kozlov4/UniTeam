from pydantic import BaseModel


class MainInfo(BaseModel):
    students_count: int
    projects_count: int
    technologies_count: int

    class Config:
        from_attributes = True
