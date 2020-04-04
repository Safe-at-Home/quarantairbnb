from marshmallow import fields

from quarantairbnb.models import ma


class UserSchema(ma.Schema):
    email = fields.Str(required=True)
    username = fields.Str(required=True)
    password = fields.Str(required=True)


user_schema = UserSchema()
users_schema = UserSchema(many=True)
