from . import db


class Match(db.Model):
    __tablename__ = "matches"
    # Contains cancelled matches
    request_id = db.Column(db.Integer, db.ForeignKey('requests.id'), primary_key=True)
    offer_id = db.Column(db.Integer, db.ForeignKey('offers.id'), primary_key=True)

    def __repr__(self):
        return '<Match %r %r>' % (self.request_id, self.offer_id)
