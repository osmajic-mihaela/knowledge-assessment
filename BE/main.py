from flask import Flask, session
from flask_session import Session
from flask_cors import CORS
from database import db
from config import ConfigSQL
from library.quiz.controller import UserController,QuizController
from database_imports import import_data



app = Flask(__name__)
app.config.from_mapping(SECRET_KEY="My_Secret_Key")
app.config['SESSION_TYPE'] = 'filesystem'
Session(app)
app.config.from_object(ConfigSQL)
CORS(app)

# Database related part
db.init_app(app)
from library.quiz.model.User import User
from library.quiz.model.Question import Question
from library.quiz.model.Quiz import Quiz
from library.quiz.model.StudentQuiz import StudentQuiz

# migrate = Migrate(app, db)

app.register_blueprint(UserController.blueprint)
app.register_blueprint(QuizController.blueprint)


if __name__ == '__main__':
    print("Server start")
    with app.app_context():
        db.create_all()
        import_data()
    app.run()




