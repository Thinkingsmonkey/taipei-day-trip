from flask import jsonify
from flask_restx import Resource, Namespace, abort
from .member_model import *
from .member_view import *
from flask_jwt_extended import create_access_token
from flask_jwt_extended import jwt_required
from flask_jwt_extended import get_jwt

member_spance = Namespace(path="/api",name="會員")

@member_spance.route("/user")
class MemberSignUp(Resource):

  @member_spance.expect(member_signup_input_model)
  def post(self):
    """註冊一個新會員"""
    email = member_spance.payload["email"]
    member = get_member_by_email(email)
    if member :
      abort(400, "Email has been used", error=True)

    new_member_data = {
      "name": member_spance.payload["name"],
      "email": member_spance.payload["email"],
      "password": member_spance.payload["password"],
    }
    new_member = create_member(new_member_data)
    signup(new_member)
    return jsonify({"ok": True})
  

@member_spance.route("/user/auth")
class Member(Resource):

  @jwt_required()
  @member_spance.marshal_with(member_check_output_model)
  @member_spance.doc(security='Bearer')
  def get(self):
    # """取得當前登入的會員"""
    claims = get_jwt()
    data = {
      "id": claims["id"],
      "name": claims["name"],
      "email": claims["email"]
    }
    return {"data":data}


  @member_spance.expect(member_signin_input_model)
  def put(self):
    # """登入會員帳戶"""
    member = get_member_by_email(member_spance.payload["email"])
    if not member:
      abort(400, "Email not exist")
    if not check_password_hash(member.password_hash, member_spance.payload["password"] + member.salt):
      abort(400, "Incorrect password")

    member_data = {"name": member.name, "id": member.id, "email": member.email}
    access_token = create_access_token(identity=member, additional_claims=member_data)
    return jsonify({"token": access_token})
  

  

