from . import db


class Offer(db.Model):
    __tablename__ = "offers"
    id = db.Column(db.Integer, primary_key=True)

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    user = db.relationship("User")

    state_id = db.Column(db.Integer, db.ForeignKey('states.id'), nullable=False)
    request_id = db.Column(db.Integer, db.ForeignKey('requests.id'), nullable=True)  # matched request

    offer_history = db.relationship("OfferHistory", backref="offer", lazy="dynamic")

    def __repr__(self):
        return '<Offer %r>' % self.id
