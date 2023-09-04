from flask import *
from server.extensions import db, api
from flask_cors import CORS
from server.routes.attractions.attractions_view import attraction_space 
from server.routes.mrt.mrt_view import mrt_space
from config import Config
app=Flask(__name__, static_folder="server/views/public")
app.template_folder = "server/views/templates"

app.config.from_object(Config)
db.init_app(app)
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


api.init_app(app)
api.add_namespace(attraction_space)
api.add_namespace(mrt_space)
app.run(host="0.0.0.0", port=3000, debug=True)