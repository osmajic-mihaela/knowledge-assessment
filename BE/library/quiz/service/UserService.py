from ..repository.UserRepository import UserRepository
from ..model.User import User

class UserService:
    def __init__(self):
        self.user_repository = UserRepository()
        self.logged_user  = None


    def get_all_users(self):
        return [user.to_json() for user in self.user_repository.get_all_users()]

    def get_user_by_id(self, user_id):
        user = self.user_repository.get_user_by_id(user_id)
        return user.to_json() if user else None

    def get_user_by_username(self, username):
        user = self.user_repository.get_user_by_username(username)
        return user.to_json() if user else None

    def login(self,request):
        user = self.user_repository.get_user_by_username(request.username)
        self.logged_user = user
        if user != None and user.password == request.password:
            return user

        return None


    def add_user(self, user_data):
        user = User(**user_data)
        self.user_repository.add_user(user)

    def update_user(self, user_id, user_data):
        user = self.user_repository.get_user_by_id(user_id)
        if user:
            for key, value in user_data.items():
                setattr(user, key, value)
            self.user_repository.update_user(user)

    def delete_user(self, user_id):
        user = self.user_repository.get_user_by_id(user_id)
        if user:
            self.user_repository.delete_user(user)

    def get_logged_user(self):
        return self.logged_user