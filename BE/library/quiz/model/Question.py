from sqlalchemy import Column, Integer, String,ARRAY, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy import ForeignKeyConstraint
from ..model.Quiz import Quiz
from database import db
import uuid

class Question(db.Model):
    __tablename__ = 'questions'

    id = db.Column(db.String(36), primary_key=True, default=str(uuid.uuid4()), unique=True, nullable=False)
    question = db.Column(db.String, nullable=False)
    correct_answer = db.Column(db.String, nullable=False)
    other_choice_answer = db.Column(db.ARRAY(String))
    points = db.Column(db.Integer, nullable=False)
    type = db.Column(db.String(), default="FREE_ANSWER")

    quiz_id = db.Column(db.String(36), db.ForeignKey('quiz.id'))
    quiz = db.relationship('Quiz', back_populates='questions')


    __table_args__ = (
        db.CheckConstraint(type.in_(['FREE_ANSWER', 'MULTIPLE_CHOICE']), name='type'),
        ForeignKeyConstraint([quiz_id], [Quiz.id], ondelete='NO ACTION'),
    )

    def __init__(self, id, question, correct_answer, points, type,other_choice_answer=[]):
        self.id = id
        self.question = question
        self.correct_answer = correct_answer
        self.points = points
        self.type = type
        self.other_choice_answer = other_choice_answer

    def to_json(self):
        type_value = 0
        if type != 'FREE_ANSWER':
            type_value = 1
        return {
            "id": self.id,
            "question": self.question,
            "correct_answer": self.correct_answer,
            "other_choice_answer": self.other_choice_answer,
            "points": self.points,
            "type": {
                "name": self.type,
                "value": type_value
            }
        }



