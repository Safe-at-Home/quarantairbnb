from . import db


class Role(db.Model):
    __tablename__ = "roles"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), unique=True, nullable=False)
    users = db.relationship("User", backref="role", lazy='dynamic')

    def __repr__(self):
        return '<Role %r>' % self.id
