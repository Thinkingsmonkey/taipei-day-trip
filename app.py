from flask import *
from server.extensions import db, api, jwt
from flask_cors import CORS
from server.routes.attractions.attractions_view import attraction_space 
from server.routes.mrt.mrt_view import mrt_space
from server.routes.member.member_controller import member_spance
from config import Config


def create_app():

	app=Flask(__name__, static_folder="server/views/public")
	app.template_folder = "server/views/templates"

	app.config.from_object(Config)
	db.init_app(app)
	jwt.init_app(app)
	CORS(app)


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


	# response token with member id
	@jwt.user_identity_loader
	def user_identity_lookup(member):
			return member.id


	# jwt token error handle
	@jwt.expired_token_loader
	def my_expired_token_callback(jwt_header, jwt_payload):
			return jsonify({"error": True, "message": "Token has expired"}), 401

	@jwt.invalid_token_loader
	def my_invalid_token_callback(jwt_payload):
			return jsonify({"data": None, "message": "Invalid token"}), 200

	@jwt.unauthorized_loader
	def my_unauthorized_callback(reason):
			return jsonify({"data": None, "message": "Unauthorized"}), 200


	api.init_app(app)
	api.add_namespace(attraction_space)
	api.add_namespace(mrt_space)
	api.add_namespace(member_spance)

	return app


if __name__ == "__main__":
	app = create_app()
	app.run(host="0.0.0.0",port=3000, debug=True) # 開發環境使用
# 部署環境使用，使用 gunicorn 開 3000