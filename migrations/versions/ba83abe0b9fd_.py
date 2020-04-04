"""empty message

Revision ID: ba83abe0b9fd
Revises: 0398f386269b
Create Date: 2020-04-04 18:07:46.378168

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'ba83abe0b9fd'
down_revision = '0398f386269b'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('states', sa.Column('cancel_id', sa.Integer(), nullable=True))
    op.add_column('states', sa.Column('next_state_id', sa.Integer(), nullable=True))
    op.drop_constraint('states_cancel_fkey', 'states', type_='foreignkey')
    op.drop_constraint('states_next_state_fkey', 'states', type_='foreignkey')
    op.create_foreign_key(None, 'states', 'states', ['next_state_id'], ['id'])
    op.create_foreign_key(None, 'states', 'states', ['cancel_id'], ['id'])
    op.drop_column('states', 'cancel')
    op.drop_column('states', 'next_state')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('states', sa.Column('next_state', sa.INTEGER(), autoincrement=False, nullable=True))
    op.add_column('states', sa.Column('cancel', sa.INTEGER(), autoincrement=False, nullable=True))
    op.drop_constraint(None, 'states', type_='foreignkey')
    op.drop_constraint(None, 'states', type_='foreignkey')
    op.create_foreign_key('states_next_state_fkey', 'states', 'states', ['next_state'], ['id'])
    op.create_foreign_key('states_cancel_fkey', 'states', 'states', ['cancel'], ['id'])
    op.drop_column('states', 'next_state_id')
    op.drop_column('states', 'cancel_id')
    # ### end Alembic commands ###