from flask_restx import Namespace, Resource
from flask_jwt_extended import jwt_required, get_jwt
from .booking_model import *
booking_space = Namespace(name="預約行程", path="/api")

@booking_space.route("/booking")
class Booking(Resource):

  # @jwt_required()
  @booking_space.expect(booking_input_model)
  def post(self):
    
    booking_data = get_booking_data(booking_space)
    booking = create_booking(booking_data)
    add_booking(booking)
    return {"ok": True}
  
    
  @jwt_required()
  @booking_space.marshal_with(booking_output_model)
  def get(self):
    "取得尚未確定下單的預定行程"
    claims  = get_jwt()
    claims["id"]
    bookings = get_bookings_by_member_id(claims["id"])
    bookings = get_bookings_by_member_id(1)
    response_data = get_response_data(bookings)
    return response_data, 200