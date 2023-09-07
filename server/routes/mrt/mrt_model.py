from flask_restx import fields
from ...extensions import api


mrt_output_model = api.model("MrtOutput", {
    "data": fields.List(fields.String)
})

