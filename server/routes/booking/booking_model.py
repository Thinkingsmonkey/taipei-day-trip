from flask_restx import fields
from ...extensions import api, db
from ...models.db_models import Booking, Member

booking_input_model = api.model("BookingInput", {
    "attractionId": fields.Integer,
    "date": fields.Date,
    "time": fields.String,
    "price": fields.Integer
})

booking_attraction_model = api.model("BookingAttraction", {
    "id": fields.Integer,
    "name": fields.String,
    "address": fields.String,
    "image": fields.String
})

booking_nest_model = api.model("BookingNest", {
    'id': fields.Integer,
    'attraction': fields.Nested(booking_attraction_model),
    'date': fields.String,
    'time': fields.String,
    'price': fields.Float
})

booking_output_model = api.model("Booking", {
  'data': fields.List(fields.Nested(booking_nest_model))
})




def get_booking_data(name_space, member_id):
  return {
    "attraction_id": name_space.payload["attractionId"],
    "member_id": member_id,
    "time": name_space.payload["time"],
    "date": name_space.payload["date"],
    "price": name_space.payload["price"]
  }

def create_booking(booking_data):
  return Booking(attraction_id=booking_data["attraction_id"], member_id=booking_data["member_id"], date=booking_data["date"], time=booking_data["time"], price=booking_data["price"])


def add_booking(booking):
  db.session.add(booking)
  db.session.commit()

def get_bookings_by_member_id(id):
  member = Member.query.filter_by(id=id).first()
  return member.bookings


def get_response_data(bookings):
  response = {}
  orders = []
  for item in bookings:
    order = {
      'id': item.id,
      'attraction': {
        "id": item.attraction._id,
        "name": item.attraction.name,
        "address": item.attraction.address,
        "image": item.attraction.attractionImgs[0].img
      },
      'date': item.date.strftime('%Y-%m-%d'),
      'time':item.time,
      'price': item.price
    }
    orders.append(order)
  response["data"] = orders
  return response


def get_booking_by_id(id):
  return Booking.query.filter_by(id=id).first()

def delete_booking(booking):
  db.session.delete(booking)
  db.session.commit()
  