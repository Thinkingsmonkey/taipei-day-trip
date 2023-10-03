from flask_jwt_extended import jwt_required, get_jwt
from flask_restx import Namespace, Resource, abort
from .order_model import *
import requests
from flask import json
import datetime

orders_space = Namespace(path="/api", name="訂單付款")

@orders_space.route('/orders')
class OrdersAPI(Resource):
  
  @jwt_required()
  @orders_space.expect(orders_input_model)
  @orders_space.marshal_with(orders_output_model)
  def post(self):
    data = orders_space.payload
    order_default_data = get_order_data(data)
    booking_ids = get_booking_ids(data)
    
    partner_key = 'partner_CB4Z8Nu3P0jrNH8mG5ETHt32a2j1TVerCUfSbcfH9oXpqlmXVDQzu1ib'
    merchant_id = 'neal99185_CTBC'
    data_to_tappay = get_tappay_data(data, partner_key, merchant_id)
    headers = {
					"Content-Type": "application/json",
					"x-api-key":partner_key
    }
    url = 'https://sandbox.tappaysdk.com/tpc/payment/pay-by-prime' # test URL
    member_id = get_jwt()["id"]

    response = requests.post(url, data=json.dumps(data_to_tappay), headers=headers)
    responseData = response.json()

    if not responseData["status"] == 0: 
      create_order_and_delete_bookings(booking_ids, order_default_data, member_id)
      abort(500, '連線失敗，請重新嘗試')
    
    order_default_data["status"] = True
    order_success_data = order_default_data
    data = get_create_orders_response(order_success_data)
    create_order_and_delete_bookings(booking_ids, order_success_data, member_id)
    return data
  
 

@orders_space.route('/order/<number>')
class OrdersGetAPI(Resource):
  @jwt_required()
  # @orders_space.marshal_with(orders_output_model)
  def get(self, number):
    order = get_order_by_number(number)
    response = get_order_response(order)

    return response