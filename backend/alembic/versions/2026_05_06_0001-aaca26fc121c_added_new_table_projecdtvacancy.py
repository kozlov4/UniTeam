"""added new table ProjecdtVacancy

Revision ID: aaca26fc121c
Revises: a359cfadac20
Create Date: 2026-05-06 00:01:34.327766

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision: str = "aaca26fc121c"
down_revision: Union[str, Sequence[str], None] = "a359cfadac20"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    # 1. Создаем новую таблицу vacancies
    op.create_table(
        "vacancies",
        sa.Column("name", sa.String(length=50), nullable=False),
        sa.Column("id", sa.Integer(), nullable=False),
        sa.PrimaryKeyConstraint("id"),
        sa.UniqueConstraint("name"),
    )

    # 2. Обновляем таблицу project_vacancies

    # Очищаем таблицу перед изменениями:
    op.execute("DELETE FROM project_vacancies")

    # Добавляем новую колонку и удаляем старую (ТЕПЕРЬ ТОЛЬКО 1 РАЗ)
    op.add_column(
        "project_vacancies", sa.Column("vacancy_id", sa.Integer(), nullable=False)
    )
    op.drop_column("project_vacancies", "role_name")

    # Удаляем старую колонку id (вместе с ней удалится старый PK)
    op.drop_column("project_vacancies", "id")

    # Создаем внешний ключ с нормальным именем
    op.create_foreign_key(
        "fk_project_vacancies_vacancy_id",
        "project_vacancies",
        "vacancies",
        ["vacancy_id"],
        ["id"],
        ondelete="CASCADE",
    )

    # Создаем составной первичный ключ
    op.create_primary_key(
        "pk_project_vacancies", "project_vacancies", ["project_id", "vacancy_id"]
    )

    # 3. Исправляем таймзону для reset_code_expire
    op.alter_column(
        "users",
        "reset_code_expire",
        existing_type=postgresql.TIMESTAMP(timezone=True),
        type_=sa.DateTime(),
        existing_nullable=True,
    )


def downgrade() -> None:
    """Downgrade schema."""
    # 1. Відкат таймзони
    op.alter_column(
        "users",
        "reset_code_expire",
        existing_type=sa.DateTime(),
        type_=postgresql.TIMESTAMP(timezone=True),
        existing_nullable=True,
    )

    # 2. Відкат таблиці project_vacancies
    # Видаляємо складений PK та зовнішній ключ
    op.drop_constraint("pk_project_vacancies", "project_vacancies", type_="primary")
    op.drop_constraint(
        "fk_project_vacancies_vacancy_id", "project_vacancies", type_="foreignkey"
    )

    # Повертаємо старі колонки
    op.add_column(
        "project_vacancies",
        sa.Column("id", sa.INTEGER(), autoincrement=True, nullable=False),
    )
    op.add_column(
        "project_vacancies",
        sa.Column(
            "role_name", sa.VARCHAR(length=100), autoincrement=False, nullable=False
        ),
    )
    op.drop_column("project_vacancies", "vacancy_id")

    op.create_primary_key("project_vacancies_pkey", "project_vacancies", ["id"])

    op.drop_table("vacancies")
