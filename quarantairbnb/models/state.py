from . import db


class State(db.Model):
    __tablename__ = "states"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(40), nullable=False, unique=False)

    next_state_id = db.Column(db.Integer, db.ForeignKey('states.id'), nullable=True)
    cancel_id = db.Column(db.Integer, db.ForeignKey('states.id'), nullable=True)
    cancel = db.relationship("State", uselist=False,
                             primaryjoin="State.id == State.cancel_id")
    next_state = db.relationship("State", uselist=False,
                                 primaryjoin="State.id == State.next_state_id")
    is_deletable = db.Column(db.Boolean, default=False, nullable=False)

    offers = db.relationship("Offer", backref="state", lazy="dynamic")
    requests = db.relationship("Request", backref="state", lazy="dynamic")

    def is_final(self):
        return self.next_state is None and self.cancel is None

    def __repr__(self):
        return '<State %r>' % self.id
