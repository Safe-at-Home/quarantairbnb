from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

from quarantairbnb.models.user import *
from quarantairbnb.models.role import *

from quarantairbnb.models.request import *
from quarantairbnb.models.offer import *

from quarantairbnb.models.state import *

from quarantairbnb.models.chat import *
from quarantairbnb.models.match import *
from quarantairbnb.models.offer_history import *
from quarantairbnb.models.request_history import *
