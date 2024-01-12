from ..model.User import  User
from database import db

class UserRepository:
    def get_all_users(self):
        users = User.query.all()
        return users

    def get_user_by_id(self, user_id):
        return User.query.get(user_id)

    def get_user_by_username(self, username):
        return User.query.filter(User.username == username).first()

    def add_user(self, user):
        db.session.add(user)
        db.session.commit()

    def update_user(self, user):
        db.session.commit()

    def delete_user(self, user):
        db.session.delete(user)
        db.session.commit()


if __name__ == '__main__':
    print('Hellloooo')


