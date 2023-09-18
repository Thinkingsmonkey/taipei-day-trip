from flask_restx import fields
from ...extensions import api, db
from ...models.db_models import Member
from flask_jwt_extended import create_access_token, set_access_cookies
from flask_jwt_extended import create_refresh_token, set_refresh_cookies
from flask_jwt_extended import jwt_required
from flask_jwt_extended import get_csrf_token
from werkzeug.security import generate_password_hash, check_password_hash
import secrets

member_signup_input_model = api.model("MemberSignUp", {
    "name": fields.String,
    "email": fields.String,
    "password": fields.String
})

member_signin_input_model = api.model("MemberSignIn", {
    "email": fields.String,
    "password": fields.String
})

member_check_infor_model = api.model("MemberInfor", {
    "id": fields.Integer,
    "name": fields.String,
    "email": fields.String
})
member_check_output_model = api.model("MemberCheck", {
    "data": fields.Nested(member_check_infor_model)
})


def generate_salt():
    return secrets.token_hex(16)

def get_member_by_email(email):
  return Member.query.filter_by(email = email).first()

def create_member(new_member_data):
  salt = generate_salt()
  password_hash = generate_password_hash(new_member_data["password"]+ salt)
  return Member(name=new_member_data["name"], email=new_member_data["email"], password_hash=password_hash, salt=salt)

def signup(new_member):
  db.session.add(new_member)
  db.session.commit()
