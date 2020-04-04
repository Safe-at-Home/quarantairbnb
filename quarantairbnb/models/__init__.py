from flask_marshmallow import Marshmallow
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()
ma = Marshmallow()

from quarantairbnb.models.user import *
from quarantairbnb.models.role import *

from quarantairbnb.models.request import *
from quarantairbnb.models.offer import *

from quarantairbnb.models.state import *

from quarantairbnb.models.chat import *
from quarantairbnb.models.cancelledmatch import *
from quarantairbnb.models.offer_history import *
from quarantairbnb.models.request_history import *
