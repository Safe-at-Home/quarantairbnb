from marshmallow import fields

from quarantairbnb.models import ma, Request, Offer


class UserSchema(ma.Schema):
    email = fields.Str(required=True)
    username = fields.Str(required=True)
    password = fields.Str(required=True)


class RequestSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Request
        include_fk = False


class OfferSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Offer
        include_fk = False


user_schema = UserSchema()
users_schema = UserSchema(many=True)

request_schema = RequestSchema()
requests_schema = RequestSchema(many=True)

offer_schema = OfferSchema()
offers_schema = OfferSchema(many=True)
