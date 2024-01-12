from ..model.StudentQuiz import  StudentQuiz
from database import db

class DoneQuizRepository:
    def get_all_done_quizzes(self):
        done_quizzes = StudentQuiz.query.all()
        return done_quizzes

    def get_done_quizzes_by_quiz(self,quiz_id):
        done_quizzes = StudentQuiz.query.filter(StudentQuiz.quiz_id == quiz_id).all()
        return done_quizzes

    def get_done_quiz_by_id(self, quiz_id):
        done_quiz = StudentQuiz.query.get(quiz_id)
        return done_quiz


    def add_done_quiz(self, quiz):
        db.session.add(quiz)
        db.session.commit()
