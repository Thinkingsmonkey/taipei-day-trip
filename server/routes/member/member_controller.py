from flask import jsonify, abort
from flask_restx import Resource, Namespace, reqparse
from .member_model import *
from .member_view import *


member_spance = Namespace(path="/api",name="會員")

@member_spance.route("/user")
class MemberSignUp(Resource):

  @member_spance.expect(member_signup_input_model)
  def post(self):
    email = member_spance.payload["email"]
    member = get_member_by_email(email)
    if member :
      abort(401, "重複的 Email")

    new_member_data = {
      "name": member_spance.payload["name"],
      "email": member_spance.payload["name"],
      "password": member_spance.payload["name"],
    }
    new_member = create_member(new_member_data)
    signup(new_member)
    return jsonify({"ok": True})