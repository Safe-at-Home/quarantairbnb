from flask_restx import Api

api_builder = Api(
    title="SafeAtHome API",
    description="A simple API for our backend",
    authorizations={
        'apikey': {
            'type': 'apiKey',
            'in': 'header',
            'name': 'Authorization',
            'description': "Type in the *'Value'* input box below: **'Bearer &lt;JWT&gt;'**, where JWT is the token"
        }
    },
    security=[{"apikey": "api"}],
    doc="/swagger-ui",
)

from .rest_api import *
