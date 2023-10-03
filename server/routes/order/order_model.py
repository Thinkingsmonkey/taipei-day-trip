from flask_restx import fields
from ...extensions import api, db
from ...models.db_models import Booking, Member, Orders, OrdersBookings
from ..booking.booking_model import booking_nest_model
from ..booking.booking_model import get_bookings_data
import datetime

order_contact_model = api.model("OrderContact", {
    "name": fields.String,
    "email": fields.String,
    "phone": fields.Integer
})

order_model = api.model("Order", {
  "price": fields.Integer,
  "trip": fields.List(fields.Nested(booking_nest_model)),
  "contact": fields.Nested(order_contact_model)
})
orders_input_model = api.model("OrdersInput", {
    "prime": fields.String,
    "order": fields.Nested(order_model),
})

orders_output_payment_model = api.model("OrderOutput",{
      "status": fields.Integer,
      "message": fields.String
})
orders_output_data_model = api.model("OrderOutput",{
    "number": fields.Integer,
    "payment": fields.Nested(orders_output_payment_model)
})
orders_output_model = api.model("OrderOutput",{
  "data": fields.Nested(orders_output_data_model)
})


def get_tappay_data(data, partner_key, merchant_id):
  return {
    "prime": data["prime"],
    "partner_key": partner_key,
    "merchant_id": merchant_id,
    "details": "TapPay Test",
    "amount": data["order"]["price"],
    "cardholder": {
        "phone_number": data["order"]["contact"]["phone"],
        "name": data["order"]["contact"]["name"],
        "email": data["order"]["contact"]["email"],
    }
  }

def get_order_data(data):
  now = datetime.datetime.now()
  number = now.strftime('%Y%m%d%H%M%S')
  return {
     "number": number,
     "price": data["order"]["price"],
     "name": data["order"]["contact"]["name"],
     "email": data["order"]["contact"]["email"],
     "phone": data["order"]["contact"]["phone"],
     "status": False
  }
def get_booking_ids(data):
  booking_ids = []
  for booking in data["order"]["trip"]:
    booking_ids.append(booking["id"])
  return booking_ids

def create_order_and_delete_bookings(booking_ids, order_data, member_id):
    new_order = Orders(**order_data, member_id=member_id)
    db.session.add(new_order)
    db.session.flush()  # 立即需要使用 new_order.id，使用 flush session
    
    for booking_id in booking_ids:
        # 更新 booking 的 is_deleted
        booking = Booking.query.get(booking_id)
        booking.is_deleted = True
        # 建立 orders_bookings 的關聯資料
        new_order_bookings = OrdersBookings(orders_id=new_order.id, booking_id=booking_id)
        db.session.add(new_order_bookings)
    
    db.session.commit()


def get_create_orders_response(order_success_data):
  return {
    "data": {
      "number": order_success_data["number"],
      "payment": {
        "status": order_success_data["status"],
        "message": "付款成功"
      }
    }
  }

def get_order_by_number(number):
  return Orders.query.filter_by(number=number).first()

def get_order_response(order):
  trip = get_bookings_data(order.bookings)
  return {
    "data": {
      "number": order.number,
      "price": order.price,
      "trip": trip,
      "contact": {
        "name": order.name,
        "email": order.email,
        "phone": order.phone
      },
      "status": 1
    }
  }