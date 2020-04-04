from flask_jwt import JWT

from quarantairbnb.models import User


def authenticate(username, password):
    user = User.query.filter_by(email=username).first()
    if user and user.check_password(password.encode('utf-8')):
        return user


def identity(payload):
    user_id = payload['identity']
    return User.query.get(user_id)


jwt_handler = JWT(authentication_handler=authenticate, identity_handler=identity)
