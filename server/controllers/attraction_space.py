from flask_restx import Resource, Namespace, reqparse
from ..extensions import db
from ..models.db_models import Attraction, AttractionImg
from ..models.api_models import *

acttraction_space = Namespace("api/")

@acttraction_space.route("/acttractions")
class ActtractionsAPI(Resource):
    
    @acttraction_space.marshal_with(attractions_output_model)
    def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument("page", type=int, required=True, location="args")
        parser.add_argument("keyword", type=str, location="args")
        args = parser.parse_args()
        
        page = args["page"]
        keyword = args["keyword"]
        
        page = args["page"]
        keyword = args["keyword"]
        attractions = Attraction.query.all()
        print(attractions)
        return {"ok": True}, 200