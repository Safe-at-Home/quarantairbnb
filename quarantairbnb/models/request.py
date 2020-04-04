from . import db


class Request(db.Model):
    __tablename__ = "requests"
    id = db.Column(db.Integer, primary_key=True)

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    user = db.relationship("User")

    state_id = db.Column(db.Integer, db.ForeignKey('states.id'), nullable=False)
    offer_id = db.Column(db.Integer, db.ForeignKey('offers.id'), nullable=True)  # matched offer

    request_history = db.relationship("RequestHistory", backref="request", lazy="dynamic")

    def __repr__(self):
        return '<Request %r>' % self.id
