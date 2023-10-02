from flask_jwt_extended import jwt_required, get_jwt
from flask_restx import Namespace, Resource, abort
from .order_model import *
import requests
from flask import json
import datetime

orders_space = Namespace(path="/api", name="訂單付款")

@orders_space.route('/orders')
class Orders(Resource):
  
  @jwt_required()
  @orders_space.expect(orders_input_model)
  @orders_space.marshal_with(orders_output_model)
  def post(self):
    data = orders_space.payload
    partner_key = 'partner_CB4Z8Nu3P0jrNH8mG5ETHt32a2j1TVerCUfSbcfH9oXpqlmXVDQzu1ib'
    merchant_id = 'neal99185_CTBC'
    data_to_tappay = {
      "prime": data["prime"],
      "partner_key": partner_key,
      "merchant_id": merchant_id,
      "details": "TapPay Test",
      "amount": data["order"]["price"],
      "cardholder": {
					"phone_number": data["order"]["contact"]["phone"],
					"name": data["order"]["contact"]["name"],
					"email": data["order"]["contact"]["email"],
      },
    }
    headers = {
					"Content-Type": "application/json",
					"x-api-key":partner_key
    }
    url = 'https://sandbox.tappaysdk.com/tpc/payment/pay-by-prime' # test URL
    response = requests.post(url, data=json.dumps(data_to_tappay), headers=headers)
    responseData = response.json()
    if not responseData["status"] == 0: abort(500, '連線失敗，請重新嘗試')
    now = datetime.datetime.now()
    number = now.strftime('%Y%m%d%H%M%S')
    data = {
      "data": {
        "number": number,
        "payment": {
          "status": responseData["status"],
          "message": "付款成功"
        }
      }
    }
    print(response.json(), number)
    return data