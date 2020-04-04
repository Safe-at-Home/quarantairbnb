from flask_marshmallow import Marshmallow
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()
ma = Marshmallow()

from quarantairbnb.models.role import *
from quarantairbnb.models.user import *
