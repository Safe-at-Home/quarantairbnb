from flask_restx import Api

api_builder = Api(
    title="SafeAtHome API",
    description="A simple Keycloak adapter for handling clients",
    # authorizations=app.config['OAUTH_AUTHORIZATIONS'],
    # security=[{"oauth2": "api"}],
    doc="/swagger-ui",
)

from .rest_api import *
