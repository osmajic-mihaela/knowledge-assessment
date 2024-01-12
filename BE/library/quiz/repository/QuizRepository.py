from ..model.Quiz import  Quiz
from ..model.Question import  Question
from ..model.StudentQuiz import  StudentQuiz
from database import db

class QuizRepository:
    def get_all_quizzes(self):
        quizzes = Quiz.query.all()
        return quizzes

    def get_quiz_by_id(self, quiz_id):
        quiz = Quiz.query.get(quiz_id)
        return quiz

    def add_quiz(self, quiz):
        db.session.add(quiz)
        db.session.commit()

    def update_quiz(self, quiz):
        db.session.commit()

    def delete_quiz(self, quiz):
        db.session.delete(quiz)
        db.session.commit()



if __name__ == '__main__':
    print('Hellloooo')


