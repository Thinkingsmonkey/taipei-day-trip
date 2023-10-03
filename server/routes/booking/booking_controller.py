from flask_restx import Namespace, Resource, abort
from flask_jwt_extended import jwt_required, get_jwt
from sqlalchemy.exc import IntegrityError
from .booking_model import *
booking_space = Namespace(name="預約行程", path="/api")

@booking_space.route("/booking")
class Booking(Resource):

  @jwt_required()
  @booking_space.expect(booking_input_model)
  def post(self):
    "建立新的預定行程"
    member_id = get_jwt()["id"]
    booking_data = get_booking_data(booking_space, member_id)
    existing = is_existing_booking(booking_data)
    if existing:
      return {"message": "Booking with the specified attraction, date, and time already exists!"}, 400
    booking = create_booking(booking_data)
    add_booking(booking)
    return {"OK": True}, 200

    
  @jwt_required()
  @booking_space.marshal_with(booking_output_model)
  def get(self):
    "取得尚未確定下單的預定行程"
    claims  = get_jwt()
    bookings = get_bookings_by_member_id(claims["id"])
    bookings_data = get_bookings_data(bookings)
    response = {
      "data": bookings_data
    }
    return response, 200

@booking_space.route("/booking/<int:id>")
class BookingDelete(Resource):

  @jwt_required()
  def delete(self, id):
    "刪除指定的預定行程"
    # 利用網址取得的 id 從資料庫取得該 booking 資料
    booking = get_booking_by_id(id)
    # 核對 booking 中 member id 與 token 中 member id 是否相同
    jwt_member_id = get_jwt()["id"]
    if not booking.member_id == jwt_member_id: abort(403, "Forbidden")
    # 刪除該 booking 資料
    delete_booking(booking)
    return {"ok": True}
