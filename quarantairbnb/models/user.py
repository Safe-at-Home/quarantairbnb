from . import db, ma
from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash


class User(UserMixin, db.Model):
    """Model for user accounts."""

    __tablename__ = 'users'

    id = db.Column(db.Integer,
                   primary_key=True)
    username = db.Column(db.String,
                         nullable=False,
                         unique=False)
    email = db.Column(db.String(40),
                      unique=True,
                      nullable=False)
    password = db.Column(db.String(200),
                         primary_key=False,
                         unique=False,
                         nullable=False)

    role_id = db.Column(db.Integer, db.ForeignKey('roles.id'), nullable=False)

    requests = db.relationship("Request", backref="user", lazy="dynamic")
    request_histories = db.relationship("RequestHistory", backref="user", lazy="dynamic")
    offer_histories = db.relationship("OfferHistory", backref="user", lazy="dynamic")
    offers = db.relationship("Offer", backref="user", lazy="dynamic")
    comments = db.relationship("Chat", backref="commenter", lazy="dynamic")

    def set_password(self, password):
        """Create hashed password."""
        self.password = generate_password_hash(password, method='sha256')

    def check_password(self, password):
        """Check hashed password."""
        return check_password_hash(self.password, password)

    def __repr__(self):
        return '<User {}>'.format(self.username)
