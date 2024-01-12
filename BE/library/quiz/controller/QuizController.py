from flask import Blueprint,jsonify, request
from ..service.QuizService import QuizService
from mapper import quiz_from_json,student_quiz_from_json, quiz_from_json_cr,question_from_json_cr
from ..controller.UserController import user_service


blueprint = Blueprint('quiz', __name__, url_prefix='/quiz')
quiz_service = QuizService()


@blueprint.route('/create_quiz', methods=['POST'])
def create_quiz():
    try:
        response = request.json
        res = quiz_from_json_cr(response, user_service.get_logged_user())
        quiz_service.add_quiz(res)

        return jsonify({'message': 'Quiz created successfully'})
    except Exception as e:
        return jsonify({'message': f'Error creating quiz: {str(e)}'}),400


@blueprint.route('/<string:quiz_id>', methods=['GET'])
def get_quiz(quiz_id):
    if quiz_id== None or quiz_id=='':
        return jsonify({'error': 'Missing quiz ID'}), 400

    quiz =quiz_service.get_quiz_by_id(quiz_id)
    if quiz != None:
        return jsonify(quiz)
    return jsonify({"message": "Quiz not found"}), 404

@blueprint.route('/get_all_quizzes', methods=['GET'])
def get_all_quizzes(): #get_quizzes_by_teacher
    quizzes = quiz_service.get_all_quizzes()

    return jsonify(quizzes)

@blueprint.route('/<string:quiz_id>', methods=['PUT'])
def update_quiz(quiz_id):
    quiz_data = request.get_json()
    quiz_service.update_quiz(quiz_id, quiz_data)
    return jsonify({"message": "User updated successfully"})

@blueprint.route('/<string:quiz_id>', methods=['DELETE'])
def delete_quiz(quiz_id):
    quiz_service.delete_quiz(quiz_id)
    return jsonify({"message": "User deleted successfully"})


@blueprint.route('/get_done_quizzes/<string:quiz_id>', methods=['GET'])
def get_done_quizzes(quiz_id): #get_done_quizzes_by_quiz_id
    result = []

    if quiz_id is None:
        return jsonify({'error': 'Missing quiz ID'}), 400

    result = quiz_service.get_done_quiz_by_quiz(quiz_id)
    return jsonify(result)


@blueprint.route('/evaluate_quiz', methods=['POST'])
def evaluate_student_quiz():
    try:
        response = request.json
        res = student_quiz_from_json(response)
        done_quiz = quiz_service.evaluate_student_quiz(res)
        js = done_quiz.to_json()
        return jsonify(js)
    except Exception as e:
        return jsonify({'message': f'Error evaluating quiz: {str(e)}'}), 400