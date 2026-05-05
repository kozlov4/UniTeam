from typing import TYPE_CHECKING
from datetime import datetime
from typing import List, Optional

from sqlalchemy import String, Text, Boolean, ForeignKey, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .base import Base

if TYPE_CHECKING:
    from .users import User


class ProjectCategory(Base):
    __tablename__ = "project_categories"

    name: Mapped[str] = mapped_column(String(100), unique=True)


class ProjectMember(Base):
    __tablename__ = "project_members"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    project_id: Mapped[int] = mapped_column(
        ForeignKey("projects.id", ondelete="CASCADE"), primary_key=True
    )
    user_id: Mapped[int] = mapped_column(
        ForeignKey("users.id", ondelete="CASCADE"), primary_key=True
    )


class ProjectTechnology(Base):
    __tablename__ = "project_technologies"

    project_id: Mapped[int] = mapped_column(
        ForeignKey("projects.id", ondelete="CASCADE"), primary_key=True
    )
    technology_id: Mapped[int] = mapped_column(
        ForeignKey("technologies.id", ondelete="CASCADE"), primary_key=True
    )


class ProjectVacancy(Base):
    __tablename__ = "project_vacancies"

    project_id: Mapped[int] = mapped_column(
        ForeignKey("projects.id", ondelete="CASCADE"), primary_key=True
    )
    vacancy_id: Mapped[int] = mapped_column(
        ForeignKey("vacancies.id", ondelete="CASCADE"), primary_key=True
    )


class Technology(Base):
    __tablename__ = "technologies"

    name: Mapped[str] = mapped_column(String(50), unique=True)


class Vacancy(Base):
    __tablename__ = "vacancies"

    name: Mapped[str] = mapped_column(String(50), unique=True)


class Project(Base):
    __tablename__ = "projects"

    title: Mapped[str] = mapped_column(String(150))
    goal: Mapped[Optional[str]] = mapped_column(String(255))
    description: Mapped[str] = mapped_column(Text)
    image_url: Mapped[Optional[str]] = mapped_column(String(255))
    is_draft: Mapped[bool] = mapped_column(Boolean, default=True)

    leader_id: Mapped[int] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"))

    category_id: Mapped[Optional[int]] = mapped_column(
        ForeignKey("project_categories.id", ondelete="SET NULL")
    )

    created_at: Mapped[datetime] = mapped_column(server_default=func.now())

    @property
    def category_name(self) -> Optional[str]:
        return self.category.name if self.category else None

    @property
    def participants_count(self) -> int:
        return len(self.members)

    @property
    def avatars(self) -> List["User"]:
        return self.members

    leader: Mapped["User"] = relationship()

    category: Mapped["ProjectCategory"] = relationship()

    members: Mapped[List["User"]] = relationship(secondary="project_members")
    technologies: Mapped[List["Technology"]] = relationship(
        secondary="project_technologies"
    )
    vacancies: Mapped[List["Vacancy"]] = relationship(secondary="project_vacancies")
