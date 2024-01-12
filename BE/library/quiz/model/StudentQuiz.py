from sqlalchemy import ForeignKeyConstraint
from sqlalchemy.orm import relationship
from database import db
from ..model.User import User
from ..model.Quiz import Quiz
import uuid
from ..model.answer_evaluator import  evaluate_answer
import time


class StudentQuiz(db.Model):
    __tablename__ = 'done_quizzes'

    id = db.Column(db.String(36), primary_key=True, default=str(uuid.uuid4()), unique=True, nullable=False)
    student_id = db.Column(db.String(36), db.ForeignKey('users.id'), nullable=False)
    student = db.relationship('User', foreign_keys=[student_id])
    quiz_id = db.Column(db.String(36), db.ForeignKey('quiz.id'), nullable=False)
    quiz = db.relationship('Quiz', foreign_keys=[quiz_id])
    start_time = db.Column(db.DateTime, nullable=False)
    end_time = db.Column(db.DateTime, nullable=True)
    student_answers = db.Column(db.ARRAY(db.String), nullable=False)
    sum_points = db.Column(db.Integer, nullable=False)
    teacher_points_and_notes = db.Column(db.JSON, nullable=True)

    __table_args__ = (
        ForeignKeyConstraint([student_id], [User.id], ondelete='NO ACTION'),
        ForeignKeyConstraint([quiz_id], [Quiz.id], ondelete='NO ACTION'),
    )

    def __init__(self,id, student_id, student, quiz_id, quiz, start_time, end_time, answers):
        self.id = str(id)
        self.student_id = student_id
        self.student = student
        self.quiz_id = quiz_id
        self.quiz = quiz
        self.start_time = str(start_time)
        self.end_time = str(end_time)
        self.student_answers = answers
        self.sum_points = 0
        self.teacher_points_and_notes = []

    def evaluate_answers(self):
        teacher_points_and_notes = []
        for item in zip(self.student_answers, self.quiz.questions):
            var = item[1].type
            if var == 'FREE_ANSWER' and item[0] != "":
                result = evaluate_answer(item[1].question, item[1].correct_answer, item[0], item[1].points)
            elif item[0] == item[1].correct_answer and item[0] != "":
                result = item[1].points, "Ovo je tačan odgovor."
            else:
                result = 0, "Tačan odgovor je:"+item[1].correct_answer

            self.sum_points += result[0]
            teacher_points_and_notes.append((result[0], result[1]))
            time.sleep(3)


        return teacher_points_and_notes



    def to_json(self):
        json = {
            "student_id": self.student_id,
            "student": self.student.to_json(),
            "quiz_id": self.quiz_id,
            "quiz": self.quiz.to_json(),  # Assuming Quiz class has a to_json method
            "start_time": self.start_time,
            "end_time": self.end_time,
            "student_answers": self.student_answers,
            "sum_points": self.sum_points,
            "teacher_points_and_notes": self.teacher_points_and_notes
        }
        return json

    def get_quiz(self):
        self.quiz = Quiz.query.get(Quiz.id == self.quiz_id)

    def get_student(self):
        self.student = User.query.get(User.id == self.student_id)




