from . import db


class State(db.Model):
    __tablename__ = "states"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(40), nullable=False, unique=False)

    next_state = db.Column(db.Integer, db.ForeignKey('states.id'), nullable=True)
    cancel = db.Column(db.Integer, db.ForeignKey('states.id'), nullable=True)

    def __repr__(self):
        return '<State %r>' % self.id
