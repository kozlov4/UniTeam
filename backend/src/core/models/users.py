from typing import TYPE_CHECKING
from datetime import datetime
from enum import Enum
from typing import List, Optional
from sqlalchemy import Enum as SqlEnum, Boolean, Table, Column
from sqlalchemy import String, Integer, Text, ForeignKey, CheckConstraint, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .base import Base

if TYPE_CHECKING:
    from .projects import Technology


class UserRole(str, Enum):
    USER = "user"
    ADMIN = "admin"


user_technologies = Table(
    "user_technologies",
    Base.metadata,
    Column(
        "user_id",
        Integer,
        ForeignKey("users.id", ondelete="CASCADE"),
        primary_key=True,
    ),
    Column(
        "technology_id",
        Integer,
        ForeignKey("technologies.id", ondelete="CASCADE"),
        primary_key=True,
    ),
)


class Specialty(Base):
    __tablename__ = "specialties"

    name: Mapped[str] = mapped_column(String(100))


class User(Base):
    __tablename__ = "users"

    __table_args__ = (
        CheckConstraint("email LIKE '%@nure.ua'", name="check_email_nure_domain"),
    )

    email: Mapped[str] = mapped_column(String(150), unique=True, index=True)
    password_hash: Mapped[str] = mapped_column(String(255))
    first_name: Mapped[str] = mapped_column(String(50))
    last_name: Mapped[str] = mapped_column(String(50))
    avatar_url: Mapped[Optional[str]] = mapped_column(String(255))
    bio_description: Mapped[Optional[str]] = mapped_column(Text)
    reset_code: Mapped[Optional[str]] = mapped_column(String(8))
    reset_code_expire: Mapped[datetime] = mapped_column(nullable=True)
    role: Mapped[str] = mapped_column(
        String(20), default=UserRole.USER, server_default=UserRole.USER.value
    )
    is_blocked: Mapped[bool] = mapped_column(
        Boolean, default=False, server_default="false"
    )

    @property
    def specialty_name(self) -> Optional[str]:
        return self.specialty.name if self.specialty else None

    @property
    def skill_names(self) -> list[str]:
        return [tech.name for tech in self.skills] if self.skills else []

    specialty_id: Mapped[Optional[int]] = mapped_column(
        ForeignKey("specialties.id", ondelete="SET NULL")
    )

    created_at: Mapped[datetime] = mapped_column(server_default=func.now())

    skills: Mapped[List["Technology"]] = relationship(secondary=user_technologies)
    specialty: Mapped[Optional["Specialty"]] = relationship()
