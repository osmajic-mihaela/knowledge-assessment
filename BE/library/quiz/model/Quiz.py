
from datetime import datetime
from sqlalchemy import ForeignKeyConstraint
from library.quiz.model.User import User
import uuid
from database import db



class Quiz(db.Model):
    __tablename__ = 'quiz'

    id = db.Column(db.String(36), primary_key=True, default=str(uuid.uuid4()), unique=True, nullable=False)
    title = db.Column(db.String(250), nullable=False)
    notes = db.Column(db.String(1000))
    subject = db.Column(db.String(50), nullable=False)
    max_points = db.Column(db.Integer)
    schedule_time = db.Column(db.DateTime)
    schedule_date = db.Column(db.DateTime)
    schedule_end_time = db.Column(db.DateTime)
    creation_date = db.Column(db.DateTime, default=datetime.utcnow)
    teacher_id = db.Column(db.String(36), db.ForeignKey('users.id'))
    student_groups = db.Column(db.String())

    __table_args__ = (
        ForeignKeyConstraint([teacher_id], [User.id], ondelete='NO ACTION'),
    )
    # Define the relationship between Quiz and Question
    questions = db.relationship('Question', back_populates='quiz')
    teacher = db.relationship('User', foreign_keys=[teacher_id])

    def __init__(self, id, title, questions, notes, subject, schedule_time, schedule_date,schedule_end_time, teacher_id,creation_date ,student_groups ,teacher=None):
        self.id = id
        self.title = title
        self.notes = notes
        self.subject = subject
        self.schedule_time = schedule_time
        self.schedule_date = schedule_date
        self.schedule_end_time = schedule_end_time
        self.teacher_id = teacher_id
        self.teacher = teacher
        self.creation_date = creation_date
        self.student_groups = student_groups
        self.max_points = self.calculate_max_points(questions)

        # Assume the questions are provided as a list of Question objects
        self.questions = questions

    def calculate_max_points(self, questions):
        return sum(question.points for question in questions if hasattr(question, 'points') and len(questions) > 0)

    def get_questions_info(self):
        return [(q.question, q.correct_answer, q.type, q.point) for q in self.questions]

    def to_json(self, ):
        teacher_js = ''
        if self.teacher != None:
            teacher_js = self.teacher.to_json()

        response = {
            "id": self.id,
            "questions": [question.to_json() for question in self.questions],
            "title": self.title,
            "notes": self.notes,
            "subject": self.subject,
            "max_points": self.max_points,
            "teacher_id": self.teacher_id,
            "teacher": teacher_js,
            "creation_date": str(self.creation_date),
            "schedule_date": str(self.schedule_date),
            "schedule_end_time": str(self.schedule_end_time),
            "schedule_time": str(self.schedule_time),
            "student_groups": self.student_groups
        }
        return response

