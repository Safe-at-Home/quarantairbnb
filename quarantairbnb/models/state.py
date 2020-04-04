from . import db


class State(db.Model):
    __tablename__ = "states"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(40), nullable=False, unique=False)

    next_state = db.Column(db.Integer, db.ForeignKey('states.id'), nullable=True)
    cancel = db.Column(db.Integer, db.ForeignKey('states.id'), nullable=True)
    is_deletable = db.Column(db.Boolean, default=False, nullable=False)

    def is_final(self):
        return self.next_state is None and self.cancel is None

    def __repr__(self):
        return '<State %r>' % self.id
