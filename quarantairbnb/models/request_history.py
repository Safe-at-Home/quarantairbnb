from . import db


class RequestHistory(db.Model):
    __tablename__ = "requests_history"
    request_id = db.Column(db.Integer, db.ForeignKey('requests.id'), primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), primary_key=True)
    timestamp = db.Column(db.DateTime, primary_key=True)
    description = db.Column(db.String(600))

    def __repr__(self):
        return '<RequestHistory %r %r>' % (self.timestamp, self.request_id)
