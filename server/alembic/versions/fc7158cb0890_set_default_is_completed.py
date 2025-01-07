"""set_default_is_completed

Revision ID: fc7158cb0890
Revises: 3907ee101169
Create Date: 2025-01-06 21:14:23.424231

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'fc7158cb0890'
down_revision: Union[str, None] = '3907ee101169'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    pass


def downgrade() -> None:
    pass
