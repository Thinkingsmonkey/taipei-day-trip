from flask_restx import fields
from ...extensions import api

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





