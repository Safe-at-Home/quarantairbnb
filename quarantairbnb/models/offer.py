from . import db


class Offer(db.Model):
    __tablename__ = "offers"
    id = db.Column(db.Integer, primary_key=True)

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    state_id = db.Column(db.Integer, db.ForeignKey('states.id'), nullable=False)
    request_id = db.Column(db.Integer, db.ForeignKey('requests.id'), nullable=True)  # matched request

    latitude = db.Column(db.Float)
    longitude = db.Column(db.Float)

    area = db.Column(db.Float)  # area in square meter
    number_of_rooms = db.Column(db.Integer)

    offer_history = db.relationship("OfferHistory", backref="offer", lazy="dynamic")

    def __repr__(self):
        return '<Offer %r>' % self.id
