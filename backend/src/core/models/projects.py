from typing import TYPE_CHECKING
from datetime import datetime
from typing import List, Optional

from sqlalchemy import String, Text, Boolean, ForeignKey, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .base import Base

if TYPE_CHECKING:
    from .users import User



class ProjectMember(Base):
    __tablename__ = "project_members"

    project_id: Mapped[int] = mapped_column(ForeignKey("projects.id", ondelete="CASCADE"), primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"), primary_key=True)


class ProjectTechnology(Base):
    __tablename__ = "project_technologies"

    project_id: Mapped[int] = mapped_column(ForeignKey("projects.id", ondelete="CASCADE"), primary_key=True)
    technology_id: Mapped[int] = mapped_column(ForeignKey("technologies.id", ondelete="CASCADE"), primary_key=True)


class Technology(Base):
    __tablename__ = "technologies"

    name: Mapped[str] = mapped_column(String(50), unique=True)


class ProjectVacancy(Base):
    __tablename__ = "project_vacancies"

    project_id: Mapped[int] = mapped_column(ForeignKey("projects.id", ondelete="CASCADE"))
    role_name: Mapped[str] = mapped_column(String(100))  # наприклад, "Android-розробник"

    project: Mapped["Project"] = relationship(back_populates="vacancies")


class Project(Base):
    __tablename__ = "projects"

    title: Mapped[str] = mapped_column(String(150))
    goal: Mapped[Optional[str]] = mapped_column(String(255))
    description: Mapped[str] = mapped_column(Text)
    image_url: Mapped[Optional[str]] = mapped_column(String(255))
    is_draft: Mapped[bool] = mapped_column(Boolean, default=True)

    leader_id: Mapped[int] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"))
    created_at: Mapped[datetime] = mapped_column(server_default=func.now())

    leader: Mapped["User"] = relationship()
    members: Mapped[List["User"]] = relationship(secondary="project_members")
    technologies: Mapped[List["Technology"]] = relationship(secondary="project_technologies")

    vacancies: Mapped[List["ProjectVacancy"]] = relationship(back_populates="project", cascade="all, delete-orphan")