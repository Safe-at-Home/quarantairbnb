import logging
from typing import Optional

from flask_jwt import jwt_required, current_identity
from flask_restx import Resource
from flask import request

from quarantairbnb.api import api_builder
from quarantairbnb.models import Request, db, State
from quarantairbnb.rest_api import get_request_data
from quarantairbnb.rest_api.utils import log_request_history
from quarantairbnb.schemas import request_schema, request_history_schema

requests_ns = api_builder.namespace("requests", description="Requests endpoint")


@requests_ns.route("/")
class RequestToPost(Resource):

    @jwt_required()
    def post(self):
        current_role = current_identity.role.name

        try:
            assert current_role != 'host', "Role {} does not have the access to request creation".format(current_role)
            assert self._get_request_current_user() is None, "Cannot create multiple Requests"

            data = get_request_data(request)
            return self._create_request(data)

        except AssertionError as e:
            logging.error(e)
            error_message = e.args[0]
            return {"error": error_message}, 400

    @jwt_required()
    def get(self):
        request_to_return = self._get_request_current_user()
        return request_schema.dump(request_to_return)

    @staticmethod
    def _get_request_current_user():
        user_id = current_identity.id
        return Request.query.filter(Request.user.has(id=user_id)).one_or_none()

    @staticmethod
    def _create_request(request_data):
        state_id = State.query.filter_by(name="in_approval").one().id
        request_data['state_id'] = state_id
        new_request = Request(**request_schema.load(request_data))
        new_request.user_id = current_identity.id

        db.session.add(new_request)
        db.session.commit()

        log_request_history(new_request.id, 'Created the request')
        return request_schema.dump(new_request)


@requests_ns.route("/history/<int:request_id>")
class RequestHistoryToGet(Resource):

    @jwt_required()
    def get(self, request_id: int):
        request_to_return = Request.query.get(request_id)

        if request_to_return:
            request_history = request_to_return.request_history
            return request_history_schema.dump(request_history)
        else:
            return {"error": "No request with given id"}, 400


@requests_ns.route("/<string:operation>/<int:request_id>")
class RequestAction(Resource):

    @jwt_required()
    def post(self, operation: str, request_id: int):
        try:
            # Get id of the request
            request_entity = Request.query.get(request_id)  # type: Optional[Request]
            if request_entity is None:
                raise ValueError("Request with the id {} does not exist".format(request_id))

            # Get the name of the current role
            current_role = current_identity.role.name

            if operation == "cancel":
                if not self._cancel_possible_for_role(request_entity.state.name, current_role):
                    raise ValueError("Current user does not have the permission to cancel the request with id {}"
                                     .format(request_id))

                # Update the state of the request
                initial_state_name = request_entity.state.name
                request_entity.state_id = request_entity.state.cancel_id
                db.session.add(request_entity)
                db.session.commit()

                log_request_history(request_entity.id, 'The request state changed from {} to {}'
                                    .format(initial_state_name, request_entity.state.name))
                return request_schema.dump(request_entity)

            elif operation == "accept":
                if not self._accept_possible_for_role(request_entity.state.name, current_role):
                    raise ValueError("Current user does not have the permission to accept the request with id {}"
                                     .format(request_id))

                # Update the state of the request
                initial_state_name = request_entity.state.name
                request_entity.state_id = request_entity.state.next_state_id
                db.session.add(request_entity)
                db.session.commit()

                log_request_history(request_entity.id, 'The request state changed from {} to {}'
                                    .format(initial_state_name, request_entity.state.name))
                return request_schema.dump(request_entity)

            raise ValueError("No valid operation")

        except ValueError as e:
            logging.error(e)
            error_message = e.args[0]
            return {"error": error_message}, 400

    @staticmethod
    def _cancel_possible_for_role(state_name: str, role_name: str) -> bool:
        role_name_to_cancellable_states = {
            'host': [],
            'admin': ['in_approval'],
            'guest': ['in_approval', 'matched']
        }

        return state_name in role_name_to_cancellable_states[role_name]

    @staticmethod
    def _accept_possible_for_role(state_name: str, role_name: str) -> bool:
        role_name_to_deletable_states = {
            'host': [],
            'admin': ['in_approval'],
            'guest': ['initial']
        }

        return state_name in role_name_to_deletable_states[role_name]
