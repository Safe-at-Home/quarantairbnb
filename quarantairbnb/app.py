import copy
import os
from typing import Dict

import click
from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
from flask_restx import Api
from flask.cli import AppGroup

from .api import api_builder
from .auth import jwt_handler
from .models import db, ma, Role, User, State


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


def add_or_update(entity, data: Dict[str, any]):
    entity_id = data["id"]
    existing = entity.query.get(entity_id)
    if not existing:
        db.session.add(entity(**data))
    else:
        for k, v in data.items():
            if hasattr(existing, k):
                setattr(existing, k, v)


@seed_cli.command('create')
def seed_data():
    add_or_update(Role, {
        "id": 1,
        "name": "admin"
    })
    add_or_update(Role, {
        "id": 2,
        "name": "guest"
    })
    add_or_update(Role, {
        "id": 3,
        "name": "host"
    })
    states = [
        {"id": 1, "name": "initial", "next_state": 2, "cancel": None, "is_deletable": True},
        {"id": 2, "name": "in_approval", "next_state": 3, "cancel": 6},
        {"id": 3, "name": "approved", "next_state": 4, "cancel": 6},
        {"id": 4, "name": "matched", "next_state": 5, "cancel": 3},
        {"id": 5, "name": "done", "next_state": None, "cancel": None},
        {"id": 6, "name": "denied", "next_state": None, "cancel": None}
    ]
    # adds
    for s in states:
        copy_of_s = copy.deepcopy(s)
        copy_of_s['next_state'] = None
        copy_of_s['cancel'] = None
        add_or_update(State, copy_of_s)
    # updates
    for s in states:
        add_or_update(State, s)
    db.session.commit()


app.cli.add_command(seed_cli)
