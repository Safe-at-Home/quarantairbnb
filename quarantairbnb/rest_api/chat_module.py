from flask import request
from flask_jwt import jwt_required, current_identity
from flask_restx import fields, Resource

from quarantairbnb.api import api_builder
from quarantairbnb.models import Request, Chat, Offer, db
from quarantairbnb.rest_api.utils import is_admin, get_request_data, log_request_history
from quarantairbnb.schemas import chats_schema, chat_schema

chat_ns = api_builder.namespace("chat", description="Chat endpoints")

chat_message_model = chat_ns.model("ChatPayload", {
    "comment": fields.String,
})


@chat_ns.route(
    "/<int:request_id>"
)
class RequestChatFeed(Resource):

    @staticmethod
    def _allowed_to_comment(user_request):
        matched_offer = Offer.query.filter_by(request_id=user_request.id).first()

        return user_request.user_id == current_identity.id or \
               is_admin() or \
               (matched_offer and matched_offer.user_id == current_identity.id)

    @jwt_required()
    def get(self, request_id):
        user_request = Request.query.get(request_id)
        if not user_request:
            return {"error": 'not found'}, 404
        if self._allowed_to_comment(user_request):
            return chats_schema.dump(user_request.comments.order_by(Chat.timestamp.desc()).all())
        return {"error": "forbidden"}, 403

    @jwt_required()
    @chat_ns.doc(body=chat_message_model)
    def post(self, request_id):
        data = get_request_data(request)
        data['commenter_id'] = current_identity.id
        data['request_id'] = request_id
        chat_entity = Chat(**chat_schema.load(data))

        user_request = Request.query.get(request_id)
        if not user_request:
            return {"error": 'not found'}, 404
        if self._allowed_to_comment(user_request):
            db.session.add(chat_entity)
            db.session.commit()
            log_request_history(user_request.id, 'Added a comment to a request')
            return chat_schema.dump(chat_entity)
        return {"error": "forbidden"}, 403
