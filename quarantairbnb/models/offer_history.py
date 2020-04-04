from . import db


class OfferHistory(db.Model):
    __tablename__ = "offers_history"
    offer_id = db.Column(db.Integer, db.ForeignKey('offers.id'), primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), primary_key=True)
    timestamp = db.Column(db.DateTime, primary_key=True)
    description = db.Column(db.String(600))

    def __repr__(self):
        return '<OfferHistory %r %r>' % (self.timestamp, self.offer_id)
