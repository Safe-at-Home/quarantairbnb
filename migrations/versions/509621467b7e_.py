"""empty message

Revision ID: 509621467b7e
Revises: 829ead2c0c41
Create Date: 2020-04-04 15:41:17.767853

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '509621467b7e'
down_revision = '829ead2c0c41'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('offers',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('state_id', sa.Integer(), nullable=False),
    sa.Column('request_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['request_id'], ['requests.id'], ),
    sa.ForeignKeyConstraint(['state_id'], ['states.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('offers_history',
    sa.Column('offer_id', sa.Integer(), nullable=False),
    sa.Column('timestamp', sa.DateTime(), nullable=False),
    sa.Column('description', sa.String(length=600), nullable=True),
    sa.ForeignKeyConstraint(['offer_id'], ['offers.id'], ),
    sa.PrimaryKeyConstraint('offer_id', 'timestamp')
    )
    op.add_column('requests', sa.Column('offer_id', sa.Integer(), nullable=True))
    op.create_foreign_key(None, 'requests', 'offers', ['offer_id'], ['id'])
    op.create_table('chats',
                    sa.Column('request_id', sa.Integer(), nullable=False),
                    sa.Column('offer_id', sa.Integer(), nullable=False),
                    sa.ForeignKeyConstraint(['offer_id'], ['offers.id'], ),
                    sa.ForeignKeyConstraint(['request_id'], ['requests.id'], ),
                    sa.PrimaryKeyConstraint('request_id', 'offer_id')
                    )
    op.create_table('matches',
                    sa.Column('request_id', sa.Integer(), nullable=False),
                    sa.Column('offer_id', sa.Integer(), nullable=False),
                    sa.ForeignKeyConstraint(['offer_id'], ['offers.id'], ),
                    sa.ForeignKeyConstraint(['request_id'], ['requests.id'], ),
                    sa.PrimaryKeyConstraint('request_id', 'offer_id')
                    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'requests', type_='foreignkey')
    op.drop_column('requests', 'offer_id')
    op.drop_table('offers_history')
    op.drop_table('offers')
    op.drop_table('matches')
    op.drop_table('chats')
    # ### end Alembic commands ###
