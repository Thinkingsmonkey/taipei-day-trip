from flask_restx import Resource, Namespace
from .mrt_model import *
from .mrt_controller import get_mrts_list

mrt_space = Namespace(path="/api",name="捷運站")

@mrt_space.route("/mrts")
@mrt_space.doc(description="取得所有捷運站名稱列表，按照週邊景點的數量由大到小排序")
class MrtAPI(Resource):
    
    @mrt_space.marshal_with(mrt_output_model, mask=None)
    def get(self):
        return get_mrts_list()