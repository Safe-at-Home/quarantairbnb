from flask_jwt import jwt_required, current_identity
from flask_restx import fields, Resource

from quarantairbnb.api import api_builder
from quarantairbnb.models import Request, Offer
from quarantairbnb.schemas import requests_schema, offers_schema

moderator_ns = api_builder.namespace("moderator", description="Moderator endpoint")


@moderator_ns.route(
    "/requests"
)
class RequestsToApprove(Resource):

    @jwt_required()
    def get(self):
        requests_to_approve = Request.query.filter(Request.state.has(name='in_approval')).all()
        return requests_schema.dump(requests_to_approve)


@moderator_ns.route(
    "/offers"
)
class OffersToApprove(Resource):

    @jwt_required()
    def get(self):
        offers_to_approve = Offer.query.filter(Request.state.has(name='in_approval')).all()
        return offers_schema.dump(offers_to_approve)
