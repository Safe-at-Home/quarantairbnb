from . import db
from sqlalchemy.sql import func


class Chat(db.Model):
    __tablename__ = "chats"
    request_id = db.Column(db.Integer, db.ForeignKey('requests.id'), primary_key=True)
    commenter_id = db.Column(db.Integer, db.ForeignKey('users.id'), primary_key=True)
    timestamp = db.Column(db.DateTime, nullable=False, server_default=func.now(), primary_key=True)

    comment = db.Column(db.String, nullable=False)

    def __repr__(self):
        return '<Chat Req->%r User->%r>' % (self.request_id, self.commenter_id)
