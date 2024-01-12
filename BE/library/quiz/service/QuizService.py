from datetime import datetime

from ..repository.QuizRepository import QuizRepository
from ..repository.DoneQuizRepository import DoneQuizRepository
from ..model.User import User
from ..model.StudentQuiz import StudentQuiz

class QuizService:
    def __init__(self, ):
        self.quiz_repository = QuizRepository()
        self.done_quiz_repository = DoneQuizRepository()

    def get_all_quizzes(self):
        return [quiz.to_json() for quiz in self.quiz_repository.get_all_quizzes()]

    def get_quiz_by_id(self, quiz_id):
        quiz = self.quiz_repository.get_quiz_by_id(quiz_id)
        return quiz.to_json() if quiz else None



    def add_quiz(self, quiz_data):
        quiz = quiz_data
        specific_date = datetime.strptime(quiz.schedule_date[0:10], '%Y-%m-%d').date()
        specific_time1 = datetime.strptime(quiz.schedule_time, '%H:%M').time()
        specific_time2 = datetime.strptime(quiz.schedule_end_time, '%H:%M').time()

        quiz.schedule_date = specific_date
        quiz.schedule_time =  datetime.combine(specific_date, specific_time1)
        quiz.schedule_end_time = datetime.combine(specific_date, specific_time2)

        self.quiz_repository.add_quiz(quiz)

    def update_quiz(self, quiz_id, quiz_data):
        quiz = self.quiz_repository.get_quiz_by_id(quiz_id)
        if quiz:
            for key, value in quiz_data.items():
                setattr(quiz, key, value)
            self.quiz_repository.update_quiz(quiz)

    def delete_quiz(self, quiz_id):
        quiz = self.quiz_repository.get_quiz_by_id(quiz_id)
        if quiz:
            self.quiz_repository.delete_quiz(quiz)

    def get_all_done_quizzes(self):
        return [done_quiz.to_json() for done_quiz in self.done_quiz_repository.get_all_done_quizzes()]

    def get_done_quiz_by_quiz(self,quiz_id):
        return [done_quiz.to_json() for done_quiz in self.done_quiz_repository.get_done_quizzes_by_quiz(quiz_id)]



    def get_done_quiz_by_id(self, quiz_id):
        done_quiz = self.done_quiz_repository.get_done_quiz_by_id(quiz_id)
        return done_quiz.to_json() if done_quiz else None

    def add_done_quiz(self, quiz_data):
        done_quiz = StudentQuiz(**quiz_data)
        self.done_quiz_repository.add_done_quiz(done_quiz)

    def evaluate_student_quiz(self, done_quiz):
        done_quiz.teacher_points_and_notes = done_quiz.evaluate_answers()
        done_quiz.student = User.query.filter(User.id == done_quiz.student_id).first()

        self.done_quiz_repository.add_done_quiz(done_quiz)
        return done_quiz