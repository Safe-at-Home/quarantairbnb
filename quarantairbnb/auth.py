from flask_jwt import JWT, jwt_required, current_identity

from quarantairbnb.models import User


def authenticate(username, password):
    user = User.get(username, None)
    if user and user.check_password(password.encode('utf-8')):
        return user


def identity(payload):
    user_id = payload['identity']
    return User.get(user_id, None)


jwt_handler = JWT(authentication_handler=authenticate, identity_handler=identity)
