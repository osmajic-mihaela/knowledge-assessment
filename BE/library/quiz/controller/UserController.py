from flask import Blueprint,jsonify, request
from ..service.UserService import UserService
from mapper import user_login_from_json

blueprint = Blueprint('user', __name__, url_prefix='/user')
user_service = UserService()

@blueprint.route('/login', methods=['POST'])
def login():
    try:
        response = request.json
        res = user_login_from_json(response)

        user = user_service.login(res)
        if user != None:
            return jsonify(user.to_json())

        return jsonify({'error': 'User not found'}), 404

    except Exception as e:
        return jsonify({'message': f'Error login: {str(e)}'}), 400


@blueprint.route('/singout', methods=['GET'])
def singout():
    try:
        user_service.logged_user = None
        return jsonify({'error': 'Successfuly singout'})

    except Exception as e:
        return jsonify({'message': f'Error login: {str(e)}'}), 400

@blueprint.route('/get_logged_user', methods=['GET'])
def get_logged_user():
    try:
        logged_user = user_service.get_logged_user()
        if  logged_user!=None:
            return jsonify({'error': logged_user})
        return jsonify({'error': 'User not found'}), 404

    except Exception as e:
        return jsonify({'message': f'Error login: {str(e)}'}), 400

@blueprint.route('/get_all_users', methods=['GET'])
def get_all_users():
    users = user_service.get_all_users()
    return jsonify(users)

@blueprint.route('/<string:user_id>', methods=['GET'])
def get_user(user_id):
    user =user_service.get_user_by_id(user_id)
    return jsonify(user) if user else jsonify({"message": "User not found"}), 404


@blueprint.route('/add_user', methods=['POST'])
def add_user():
    user_data = request.get_json()
    user_service.add_user(user_data)
    return jsonify({"message": "User added successfully"})

@blueprint.route('/<string:user_id>', methods=['PUT'])
def update_user(user_id):
    user_data = request.get_json()
    user_service.update_user(user_id, user_data)
    return jsonify({"message": "User updated successfully"})

@blueprint.route('/<string:user_id>', methods=['DELETE'])
def delete_user(user_id):
    user_service.delete_user(user_id)
    return jsonify({"message": "User deleted successfully"})
