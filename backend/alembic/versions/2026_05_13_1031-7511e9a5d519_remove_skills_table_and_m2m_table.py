"""remove Skills table and m2m table

Revision ID: 7511e9a5d519
Revises: 1615466565dd
Create Date: 2026-05-13 10:31:50.723455

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision: str = "7511e9a5d519"
down_revision: Union[str, Sequence[str], None] = "1615466565dd"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    # Создаем новую таблицу для технологий пользователя
    op.create_table(
        "user_technologies",
        sa.Column("user_id", sa.Integer(), nullable=False),
        sa.Column("technology_id", sa.Integer(), nullable=False),
        sa.ForeignKeyConstraint(
            ["technology_id"], ["technologies.id"], ondelete="CASCADE"
        ),
        sa.ForeignKeyConstraint(["user_id"], ["users.id"], ondelete="CASCADE"),
        sa.PrimaryKeyConstraint("user_id", "technology_id"),
    )

    # Удаляем старые навыки
    op.drop_table("user_skills")
    op.drop_table("skills")

    # ИСПРАВЛЕНИЕ: Сначала удаляем зависимости от faculties
    op.drop_constraint(
        op.f("specialties_faculty_id_fkey"), "specialties", type_="foreignkey"
    )
    op.drop_column("specialties", "faculty_id")

    op.drop_constraint(op.f("users_faculty_id_fkey"), "users", type_="foreignkey")
    op.drop_column("users", "faculty_id")

    # ИСПРАВЛЕНИЕ: Теперь смело удаляем саму таблицу faculties
    op.drop_table("faculties")


def downgrade() -> None:
    """Downgrade schema."""
    # ИСПРАВЛЕНИЕ: Сначала создаем таблицы (чтобы было на что ссылаться)
    op.create_table(
        "faculties",
        sa.Column("name", sa.VARCHAR(length=100), autoincrement=False, nullable=False),
        sa.Column("id", sa.INTEGER(), autoincrement=True, nullable=False),
        sa.PrimaryKeyConstraint("id", name=op.f("faculties_pkey")),
        sa.UniqueConstraint(
            "name",
            name=op.f("faculties_name_key"),
            postgresql_include=[],
            postgresql_nulls_not_distinct=False,
        ),
    )

    op.create_table(
        "skills",
        sa.Column("name", sa.VARCHAR(length=50), autoincrement=False, nullable=False),
        sa.Column("id", sa.INTEGER(), autoincrement=True, nullable=False),
        sa.PrimaryKeyConstraint("id", name=op.f("skills_pkey")),
        sa.UniqueConstraint(
            "name",
            name=op.f("skills_name_key"),
            postgresql_include=[],
            postgresql_nulls_not_distinct=False,
        ),
    )

    # ИСПРАВЛЕНИЕ: Теперь добавляем колонки и вешаем на них форейн кеи
    op.add_column(
        "users",
        sa.Column("faculty_id", sa.INTEGER(), autoincrement=False, nullable=True),
    )
    op.create_foreign_key(
        op.f("users_faculty_id_fkey"),
        "users",
        "faculties",
        ["faculty_id"],
        ["id"],
        ondelete="SET NULL",
    )

    op.add_column(
        "specialties",
        sa.Column("faculty_id", sa.INTEGER(), autoincrement=False, nullable=False),
    )
    op.create_foreign_key(
        op.f("specialties_faculty_id_fkey"),
        "specialties",
        "faculties",
        ["faculty_id"],
        ["id"],
        ondelete="CASCADE",
    )

    op.create_table(
        "user_skills",
        sa.Column("user_id", sa.INTEGER(), autoincrement=False, nullable=False),
        sa.Column("skill_id", sa.INTEGER(), autoincrement=False, nullable=False),
        sa.Column("id", sa.INTEGER(), autoincrement=False, nullable=False),
        sa.ForeignKeyConstraint(
            ["skill_id"],
            ["skills.id"],
            name=op.f("user_skills_skill_id_fkey"),
            ondelete="CASCADE",
        ),
        sa.ForeignKeyConstraint(
            vacancies["user_id"],
            ["users.id"],
            name=op.f("user_skills_user_id_fkey"),
            ondelete="CASCADE",
        ),
        sa.PrimaryKeyConstraint(
            "user_id", "skill_id", "id", name=op.f("user_skills_pkey")
        ),
    )

    op.drop_table("user_technologies")
