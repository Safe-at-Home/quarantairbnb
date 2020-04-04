from marshmallow import fields

from quarantairbnb.models import ma, Request, Offer, Chat, State, RequestHistory, OfferHistory


class UserSchema(ma.Schema):
    email = fields.Str(required=True)
    username = fields.Str(required=True)
    password = fields.Str(required=True)


class StateSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = State
        include_fk = True


state_schema = StateSchema()


class RequestHistorySchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = RequestHistory
        include_fk = True


class RequestSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Request
        include_fk = True

    state = fields.Nested(state_schema)


class OfferHistorySchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = OfferHistory
        include_fk = True


class OfferSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Offer
        include_fk = True

    state = fields.Nested(state_schema)


class ChatSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Chat
        include_fk = True


user_schema = UserSchema()
users_schema = UserSchema(many=True)

request_schema = RequestSchema()
requests_schema = RequestSchema(many=True)
request_history_schema = RequestHistorySchema(many=True)

offer_schema = OfferSchema()
offers_schema = OfferSchema(many=True)
offer_history_schema = OfferHistorySchema(many=True)

chat_schema = ChatSchema()
chats_schema = ChatSchema(many=True)

