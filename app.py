from flask import *
from server.extensions import db, api, jwt
from flask_cors import CORS
from server.routes.attractions.attractions_view import attraction_space 
from server.routes.mrt.mrt_view import mrt_space
from server.routes.member.member_controller import member_spance
from server.routes.booking.booking_controller import booking_space
from server.routes.order.order_controller import orders_space
from config import Config


def create_app():

	app=Flask(__name__, static_folder="server/views/public")
	app.template_folder = "server/views/templates"

	app.config.from_object(Config)
	db.init_app(app)
	jwt.init_app(app)
	CORS(app)

	app.config['PROPAGATE_EXCEPTIONS'] = True

	# Pages
	@app.route("/")
	def index():
		return render_template("index.html")
	@app.route("/attraction/<id>")
	def attraction(id):
		return render_template("attraction.html")
	@app.route("/booking")
	def booking():
		return render_template("booking.html")
	@app.route("/thankyou")
	def thankyou():
		return render_template("thankyou.html")
	@app.route("/member")
	def member():
		return render_template("member.html")


	# response token with member id
	@jwt.user_identity_loader
	def user_identity_lookup(member):
			return member.id


	# jwt token error handle
	@jwt.unauthorized_loader
	def my_unauthorized_callback(reason):
			return jsonify({"data": None, "message": "Unauthorized"}), 200
	
	@jwt.expired_token_loader
	def my_expired_token_callback(jwt_header, jwt_payload):
			return jsonify({"error": True, "message": "Token has expired"}), 401

	@jwt.invalid_token_loader
	def my_invalid_token_callback(jwt_payload):
			return jsonify({"data": None, "message": "Invalid token"}), 200


	
	@jwt.token_verification_failed_loader
	def custom_error(jwt_header, jwt_data):
			assert jwt_header["alg"] == "HS256"
			assert jwt_data["sub"] == "username"
			return jsonify(msg="claims failed for {}".format(jwt_data["sub"])), 404

	api.init_app(app)
	api.add_namespace(attraction_space)
	api.add_namespace(mrt_space)
	api.add_namespace(member_spance)
	api.add_namespace(booking_space)
	api.add_namespace(orders_space)

	return app


if __name__ == "__main__":
	app = create_app()
	app.run(host="0.0.0.0",port=3000, debug=True) # 開發環境使用
# 部署環境使用，使用 gunicorn 開 3000