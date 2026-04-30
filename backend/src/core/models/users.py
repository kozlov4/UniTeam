from datetime import datetime
from typing import List, Optional

from sqlalchemy import String, Integer, Text, ForeignKey, CheckConstraint, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .base import Base


class UserSkill(Base):
    __tablename__ = "user_skills"

    user_id: Mapped[int] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"), primary_key=True)
    skill_id: Mapped[int] = mapped_column(ForeignKey("skills.id", ondelete="CASCADE"), primary_key=True)


class Faculty(Base):
    __tablename__ = "faculties"

    name: Mapped[str] = mapped_column(String(100), unique=True)

    specialties: Mapped[List["Specialty"]] = relationship(back_populates="faculty")


class Specialty(Base):
    __tablename__ = "specialties"

    name: Mapped[str] = mapped_column(String(100))
    faculty_id: Mapped[int] = mapped_column(ForeignKey("faculties.id", ondelete="CASCADE"))

    faculty: Mapped["Faculty"] = relationship(back_populates="specialties")


class Skill(Base):
    __tablename__ = "skills"

    name: Mapped[str] = mapped_column(String(50), unique=True)


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
    course_year: Mapped[Optional[int]] = mapped_column(Integer)

    faculty_id: Mapped[Optional[int]] = mapped_column(ForeignKey("faculties.id", ondelete="SET NULL"))
    specialty_id: Mapped[Optional[int]] = mapped_column(ForeignKey("specialties.id", ondelete="SET NULL"))

    created_at: Mapped[datetime] = mapped_column(server_default=func.now())

    skills: Mapped[List["Skill"]] = relationship(secondary="user_skills")