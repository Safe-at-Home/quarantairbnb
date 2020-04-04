import logging
from typing import Optional

from flask_jwt import jwt_required, current_identity
from flask_restx import Resource
from flask import request

from quarantairbnb.api import api_builder
from quarantairbnb.models import Offer, db, State
from quarantairbnb.rest_api import get_request_data
from quarantairbnb.rest_api.utils import log_offer_history
from quarantairbnb.schemas import offer_schema, offers_schema, offer_history_schema

offers_ns = api_builder.namespace("offers", description="Offers endpoint")


@offers_ns.route("/")
class OfferToPost(Resource):

    @jwt_required()
    def post(self):
        current_role = current_identity.role.name

        try:
            assert current_role != 'guest', "Role {} does not have the access to offers creation".format(current_role)

            data = get_request_data(request)
            return self._create_offer(data)

        except AssertionError as e:
            logging.error(e)
            error_message = e.args[0]
            return {"error": error_message}, 400

    @jwt_required()
    def get(self):
        offers_to_return = self._get_offers_current_user()
        return offers_schema.dump(offers_to_return)

    @staticmethod
    def _get_offers_current_user():
        user_id = current_identity.id
        return Offer.query.filter(Offer.user.has(id=user_id)).all()

    @staticmethod
    def _create_offer(offer_data):
        state_id = State.query.filter_by(name="initial").one().id
        offer_data['state_id'] = state_id
        new_offer = Offer(**offer_schema.load(offer_data))
        new_offer.user_id = current_identity.id

        db.session.add(new_offer)
        db.session.commit()

        log_offer_history(new_offer.id, 'Created the offer')
        return offer_schema.dump(new_offer)


@offers_ns.route("/history/<int:offer_id>")
class OfferHistoryToGet(Resource):

    @jwt_required()
    def get(self, offer_id: int):
        offer_to_return = Offer.query.get(offer_id)

        if offer_to_return:
            offer_history = offer_to_return.request_history
            return offer_history_schema.dump(offer_history)
        else:
            return {"error": "No request with given id"}, 400


@offers_ns.route("/<string:operation>/<int:offer_id>")
class OfferAction(Resource):

    @jwt_required()
    def post(self, operation: str, offer_id: int):
        try:
            # Get id of the request
            offer_entity = Offer.query.get(offer_id)  # type: Optional[Offer]
            if offer_entity is None:
                raise ValueError("Offer with the id {} does not exist".format(offer_id))

            # Get the name of the current role
            current_role = current_identity.role.name

            if operation == "cancel":
                if not self._cancel_possible_for_role(offer_entity.state.name, current_role):
                    raise ValueError("Current user does not have the permission to cancel the offer with id {}"
                                     .format(offer_id))

                # Update the state of the offer
                initial_state_name = offer_entity.state.name
                offer_entity.state_id = offer_entity.state.cancel_id
                db.session.add(offer_entity)
                db.session.commit()

                log_offer_history(offer_entity.id, 'The offer changed state from {} to {}'
                                  .format(initial_state_name, offer_entity.state.name))
                return offer_schema.dump(offer_entity)

            elif operation == "accept":
                if not self._accept_possible_for_role(offer_entity.state.name, current_role):
                    raise ValueError("Current user does not have the permission to accept the offer with id {}"
                                     .format(offer_id))

                # Update the state of the offer
                initial_state_name = offer_entity.state.name
                offer_entity.state_id = offer_entity.state.next_state_id
                db.session.add(offer_entity)
                db.session.commit()

                log_offer_history(offer_entity.id, 'The offer changed state from {} to {}'
                                  .format(initial_state_name, offer_entity.state.name))
                return offer_schema.dump(offer_entity)

            raise ValueError("No valid operation")

        except ValueError as e:
            logging.error(e)
            error_message = e.args[0]
            return {"error": error_message}, 400

    @staticmethod
    def _cancel_possible_for_role(state_name: str, role_name: str) -> bool:
        role_name_to_cancellable_states = {
            'host': ['matched'],
            'admin': ['in_approval'],
            'guest': []
        }

        return state_name in role_name_to_cancellable_states[role_name]

    @staticmethod
    def _accept_possible_for_role(state_name: str, role_name: str) -> bool:
        role_name_to_deletable_states = {
            'host': ['initial'],
            'admin': ['in_approval'],
            'guest': ['matched']
        }

        return state_name in role_name_to_deletable_states[role_name]
