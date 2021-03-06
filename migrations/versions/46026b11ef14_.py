"""empty message

Revision ID: 46026b11ef14
Revises: 5126c07eefb4
Create Date: 2020-04-04 19:41:26.423062

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '46026b11ef14'
down_revision = '5126c07eefb4'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('chats', sa.Column('comment', sa.String(), nullable=False))
    op.add_column('chats', sa.Column('commenter_id', sa.Integer(), nullable=False))
    op.drop_constraint('chats_offer_id_fkey', 'chats', type_='foreignkey')
    op.create_foreign_key(None, 'chats', 'users', ['commenter_id'], ['id'])
    op.drop_column('chats', 'offer_id')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('chats', sa.Column('offer_id', sa.INTEGER(), autoincrement=False, nullable=False))
    op.drop_constraint(None, 'chats', type_='foreignkey')
    op.create_foreign_key('chats_offer_id_fkey', 'chats', 'offers', ['offer_id'], ['id'])
    op.drop_column('chats', 'commenter_id')
    op.drop_column('chats', 'comment')
    # ### end Alembic commands ###
