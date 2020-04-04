import os

from flask import Flask

from .models import db


def create_app():
    flask_app = Flask(__name__, static_folder='webapp/build')
    flask_app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    flask_app.config.from_object(os.environ['APP_SETTINGS'])

    db.init_app(flask_app)

    return flask_app


app = create_app()
