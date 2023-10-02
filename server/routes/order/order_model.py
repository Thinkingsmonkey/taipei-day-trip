from flask_restx import fields
from ...extensions import api, db
from ...models.db_models import Booking, Member
from ..booking.booking_model import booking_nest_model


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