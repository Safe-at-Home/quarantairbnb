import os
from datetime import timedelta


class Config:
    SQLALCHEMY_DATABASE_URI = os.environ['DATABASE_URL']
    JWT_AUTH_URL_RULE = '/api/auth/login'
    JWT_SECRET_KEY = 'test123'
    JWT_AUTH_USERNAME_KEY = 'email'
    JWT_AUTH_HEADER_PREFIX = 'Bearer'
    JWT_EXPIRATION_DELTA = timedelta(hours=1)


class DevelopmentConfig(Config):
    DEBUG = True
    DEVELOPMENT = True


class ProductionConfig(Config):
    DEBUG = False
    DEVELOPMENT = False
