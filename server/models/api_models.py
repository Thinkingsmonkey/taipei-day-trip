from flask_restx import fields
from ..extensions import api

acttractions_input_model = api.model("AttractionsInput", {
  "page": fields.Integer(required=True),
  "keyword": fields.String
})

attraction_model = api.model("Attraction", {
    "id": fields.Integer,
    "name": fields.String,
    "category": fields.String,
    "description": fields.String,
    "address": fields.String,
    "transport": fields.String,
    "mrt": fields.String,
    "lat": fields.Float,
    "lng": fields.Float,
    "images": fields.List(fields.String)
})

attractions_output_model = api.model("AttractionsOutput", {
    "nextPage": fields.Integer,
    "data": fields.List(fields.Nested(attraction_model))
})