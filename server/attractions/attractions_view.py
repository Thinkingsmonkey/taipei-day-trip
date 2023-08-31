from flask_restx import Resource, Namespace, reqparse
from .attraction_model import *
from .attraction_controller import get_attraction_by_id, get_attractions_list

attraction_space = Namespace(path="/api",name="旅遊景點")


@attraction_space.route("/attraction/<int:attractionId>")
class AttractionAPI(Resource):
    parser = attraction_space.parser()
    parser.add_argument("attractionId", type=int, required=True)
    @attraction_space.doc(params={"attractionId": "景點編號"}) 
    @attraction_space.marshal_with(attraction_id_output_model, mask=None)
    def get(self, attractionId):
        return get_attraction_by_id(attractionId)


@attraction_space.route("/attractions")
@attraction_space.doc(description="取得不同分頁的旅遊景點列表資料，也可以根據標題關鍵字、或捷運站名稱篩選")
class AttractionsListAPI(Resource):

    # swagger 說明：query string 
    parser = attraction_space.parser()
    parser.add_argument("page", type=int, required=True, location="args")
    parser.add_argument("keyword", type=str, location="args")
    # swagger 說明：設定 參數的說明，參數名需相同
    @attraction_space.doc(params={"page": "要取得的分頁，每頁 12 筆資料", "keyword": "用來完全比對捷運站名稱、或模糊比對景點名稱的關鍵字，沒有給定則不做篩選"}) 
    # swagger 說明：mask=None 關掉 X-field 預設(輸出 marshal 才可用)
    @attraction_space.marshal_with(attractions_output_model, as_list=True, mask=None) 
    @attraction_space.expect(parser)
    def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument("page", type=int, required=True, location="args")
        parser.add_argument("keyword", type=str, location="args")
        args = parser.parse_args()
        
        page = args["page"]
        keyword = args["keyword"]
        mini_item =  12 * page
        per_page = 12
        return get_attractions_list(page, keyword, mini_item, per_page)