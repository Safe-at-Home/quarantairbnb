import logging

from flask_jwt import jwt_required, current_identity
from flask_restx import Resource, fields

from flask import request, jsonify
from marshmallow import ValidationError
from werkzeug.utils import redirect

from quarantairbnb.api import api_builder
from quarantairbnb.models import User, Role, db
from quarantairbnb.rest_api.utils import get_request_data
from quarantairbnb.schemas import user_schema

ns = api_builder.namespace("auth", description="Authentication / authorization operations")

registration_model = ns.model("Registration", {
    "username": fields.String,
    "password": fields.String,
    "email": fields.String
})

login_model = ns.model("LoginPayload", {
    "email": fields.String,
    "password": fields.String,
})


def common_user_create(user_data, role):
    try:
        new_user = User(**user_schema.load(user_data))
        new_user.role_id = role.id
        new_user.set_password(new_user.password)
        db.session.add(new_user)
        db.session.commit()
        return user_schema.dump(new_user)
    except ValidationError as e:
        logging.error(e)
        return {"error_fields": [m.__str__() for m in e.messages]}, 400


@ns.route(
    "/register/guest"
)
class RegistrationResourceGuest(Resource):
    @ns.doc(body=registration_model)
    def post(self):
        guest_role = Role.query.filter_by(name='guest').first()
        data = get_request_data(request)
        return common_user_create(data, guest_role)


@ns.route(
    "/register/host"
)
class RegistrationResourceHost(Resource):
    @ns.doc(body=registration_model)
    def post(self):
        host_role = Role.query.filter_by(name='host').first()
        data = get_request_data(request)
        return common_user_create(data, host_role)


@ns.route(
    "/current"
)
class UserResource(Resource):

    @jwt_required()
    def get(self):
        data = user_schema.dump(current_identity)
        data['role'] = current_identity.role.name
        return data
