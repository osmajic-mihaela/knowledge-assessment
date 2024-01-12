import uuid
import datetime

from library.quiz.model.Quiz import Quiz
from library.quiz.model.Question import Question
from library.quiz.model.StudentQuiz import StudentQuiz
from library.quiz.model.User import UserLogin, User

def user_login_from_json(data):
    user = UserLogin(
        username=data['username'],
        password=data['password']
    )
    return user

def question_from_json(data):
    question = Question(
        id=data['id'],
        question=data['question'],
        correct_answer=data['correct_answer'],
        points=data['points'],
        type=data['type'],
        other_choice_answer = data['other_choice_answer']
    )
    return question

def question_from_json_cr(data):
    question = Question(
        id=uuid.uuid4(),
        question=data['question'],
        correct_answer=data['correct_answer'],
        points=data['points'],
        type=data['type'],
        other_choice_answer = data['other_choice_answer']
    )
    return question

def quiz_from_json(data):
    questions = [question_from_json(question_data) for question_data in data['questions']]
    quiz = Quiz(
        id=data['id'],
        questions=questions,
        title=data['title'],
        notes=data['notes'],
        subject=data['subject'],
        teacher_id=data['teacher_id'],
        teacher=data['teacher'],
        creation_date=data['creation_date'],
        schedule_date=data['schedule_date'],
        schedule_time=data['schedule_time'],
        schedule_end_time=data['schedule_end_time'],
        student_groups=data['student_groups']
    )
    return quiz

def quiz_from_json_cr(data, logged_user):
    questions = [question_from_json_cr(question_data) for question_data in data['questions']]
    quiz = Quiz(
        id=uuid.uuid4(),
        questions=questions,
        title=data['title'],
        notes=data['notes'],
        subject=data['subject'],
        teacher_id=logged_user.id,
        teacher=logged_user,
        creation_date=datetime.date.today(),
        schedule_date=data['schedule_date'],
        schedule_time=data['schedule_time'],
        schedule_end_time=data['schedule_end_time'],
        student_groups=['A']
    )
    return quiz


def student_quiz_from_json(json_data):
    quiz_instance=Quiz.query.filter(Quiz.id == json_data['quiz_id']).first()

    id = uuid.uuid4()
    st_id = json_data['student_id']
    st =json_data['student']
    quiz_id = json_data['quiz_id']
    start_time = json_data['start_time']
    end_time = json_data['end_time']
    answers = json_data['student_answers']

    specific_time1 = datetime.datetime.strptime(start_time, '%H:%M').time()
    specific_time2 = datetime.datetime.strptime(end_time, '%H:%M').time()

    date = datetime.date.today()
    t1 = datetime.datetime.combine(date, specific_time1)
    t2 = datetime.datetime.combine(date, specific_time2)

    temp = StudentQuiz(
        id = id,
        student_id=st_id,
        student=st,
        quiz_id=quiz_id,
        quiz=quiz_instance,
        start_time=t1,
        end_time=t2,
        answers=answers
    )

    return temp