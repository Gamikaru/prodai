"""update_existing_plans_is_completed

Revision ID: e305963b5605
Revises: fc7158cb0890
Create Date: 2025-01-06 21:16:05.844229

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'e305963b5605'
down_revision: Union[str, None] = 'fc7158cb0890'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.execute("UPDATE plans SET is_completed = FALSE WHERE is_completed IS NULL")


def downgrade() -> None:
    pass
