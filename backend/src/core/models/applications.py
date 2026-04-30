from typing import TYPE_CHECKING
from datetime import datetime

from sqlalchemy import String, Text, ForeignKey, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .base import Base

if TYPE_CHECKING:
    from .projects import Project
    from  .users import User

class Application(Base):
    __tablename__ = "applications"

    project_id: Mapped[int] = mapped_column(ForeignKey("projects.id", ondelete="CASCADE"))
    applicant_id: Mapped[int] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"))

    cover_letter: Mapped[str] = mapped_column(Text)

    status: Mapped[str] = mapped_column(String(50), default="pending")
    created_at: Mapped[datetime] = mapped_column(server_default=func.now())

    project: Mapped["Project"] = relationship()
    applicant: Mapped["User"] = relationship()