import os

import click
from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
from flask_restx import Api
from flask.cli import AppGroup

from .api import api_builder
from .auth import jwt_handler
from .models import db, ma, Role, User


def configure_api(api_instance: Api):
    api_instance.prefix = '/api/v1'


def create_app():
    flask_app = Flask(__name__, static_folder='webapp/build')
    flask_app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    flask_app.url_map.strict_slashes = False
    flask_app.config.from_object(os.environ['APP_SETTINGS'])
    CORS(flask_app)
    configure_api(api_builder)
    # Inits
    db.init_app(flask_app)
    ma.init_app(flask_app)
    api_builder.init_app(flask_app)
    jwt_handler.init_app(flask_app)
    Migrate(flask_app, db)

    return flask_app


app = create_app()

seed_cli = AppGroup('seed')


@seed_cli.command('create')
def seed_data():
    db.session.add(Role(
        id=1,
        name='admin'
    ))
    db.session.add(Role(
        id=2,
        name='guest'
    ))
    db.session.add(Role(
        id=3,
        name='host'
    ))
    db.session.commit()


app.cli.add_command(seed_cli)
