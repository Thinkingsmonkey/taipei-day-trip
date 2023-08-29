from flask import *
from server.extensions import db, api
from flask_cors import CORS
from server.controllers.attraction_space import acttraction_space

app=Flask(__name__)

app.config["JSON_AS_ASCII"]=False
app.config["TEMPLATES_AUTO_RELOAD"]=True
app.config["SQLALCHEMY_DATABASE_URI"] = "mysql://root:12345678@localhost/taipeiAttractions"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)
api.init_app(app)
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


api.add_namespace(acttraction_space)
app.run(host="0.0.0.0", port=3000)