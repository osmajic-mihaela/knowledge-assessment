import uuid
from sqlalchemy import Enum

from database import db


class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.String(36), primary_key=True, default=str(uuid.uuid4()), unique=True, nullable=False)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    name = db.Column(db.String(50), nullable=False)
    surname = db.Column(db.String(50), nullable=False)
    subject_id = db.Column(db.Integer)
    role = db.Column(db.String(), default="STUDENT")

    __table_args__ = (
        db.CheckConstraint(role.in_(['STUDENT', 'TEACHER', 'ADMIN']), name='user_role'),
    )

    def __init__(self, id,username,password,name,surname ,role,subject_id):
        self.id = id
        self.username = username
        self.password = password
        self.name = name
        self.surname = surname
        self.role = role
        self.subject_id = subject_id

    def to_json(self):
        role_value = 0
        if self.role == 'TEACHER':
            role_value = 1
        elif self.role == 'ADMIN':
            role_value = 2

        return {
            "id": self.id,
            "username": self.username,
            "password": self.password,
            "name": self.name,
            "surname": self.surname,
            "role": {
                "name": self.role,
                "value": role_value
            },
            "subject_id": self.subject_id
        }


class UserLogin():
    def __init__(self,username, password):
        self.username = username
        self.password = password

    def to_json(self):
        return {
            "username": self.username,
            "password": self.password,
        }