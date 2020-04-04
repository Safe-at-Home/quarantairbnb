import os


class Config:
    SQLALCHEMY_DATABASE_URI = os.environ['DATABASE_URL']
    JWT_AUTH_URL_RULE = '/api/auth/login'
    JWT_SECRET_KEY = 'test123'
    JWT_AUTH_ENDPOINT = 'jwt'
    JWT_AUTH_USERNAME_KEY = 'email'


class DevelopmentConfig(Config):
    DEBUG = True
    DEVELOPMENT = True


class ProductionConfig(Config):
    DEBUG = False
    DEVELOPMENT = False
