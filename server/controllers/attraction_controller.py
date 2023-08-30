from flask_restx import Resource, Namespace, reqparse, abort
from ..extensions import db
from ..models.db_models import Attraction, AttractionImg
from ..models.api_models import *
from sqlalchemy import or_

attraction_space = Namespace(path="/api",name="旅遊景點")

@attraction_space.route("/attraction/<int:attractionId>")
class AttractionAPI(Resource):

    parser = attraction_space.parser()
    parser.add_argument("attractionId", type=int, required=True)
    @attraction_space.doc(params={"attractionId": "景點編號"}) 
    @attraction_space.marshal_with(attractions_id_output_model, mask=None)
    def get(self, attractionId):

        attraction = Attraction.query.filter_by(_id = attractionId).first()
        if not attraction:
            return abort(400, "Incorrect attractionId")
        
        data = {}
        data["id"] = attraction._id
        data["name"] = attraction.name
        data["category"] = attraction.CAT
        data["description"] = attraction.description
        data["address"] = attraction.address
        data["transport"] = attraction.direction
        data["mrt"] = attraction.MRT
        data["lat"] = attraction.latitude
        data["lng"] = attraction.longitude

        # img
        imgs = AttractionImg.query.filter_by(attraction_id = attractionId).all()
        print(imgs)
        data["images"] = []
        for img in imgs:
            data["images"].append(img.img)
        
        return {"data": data}

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
        # query string API 執行用
        parser = reqparse.RequestParser()
        parser.add_argument("page", type=int, required=True, location="args")
        parser.add_argument("keyword", type=str, location="args")
        args = parser.parse_args()

        # 取得參數
        page = args["page"]
        keyword = args["keyword"]
        # error handle
        if page > 4 or page < 0:
            return abort(400, "page is not validation")

        attractions = []
        # 是否有 keyword
        if keyword:
            # 搜索 keyword 是否為 MRT 站
            is_mrt_attraction = Attraction.query.filter_by(MRT=keyword).first()
            if is_mrt_attraction:
                # 若是找出所有捷運站景點
                attractions = Attraction.query.filter_by(MRT=keyword).all()
            else:
                # 若不是，使用模糊搜索找所有景點
                if "臺" not in keyword and "台" not in keyword:
                    attractions = Attraction.query.filter(Attraction.name.ilike(f'%{keyword}%')).all()
                else:
                    # 若 keyword 含 "台"、"臺" 使用 or_ 搜索兩者
                    if "台" in keyword:
                        small_keyword = keyword
                        big_keyword = keyword.replace("台", "臺")
                    if "臺" in keyword:
                        big_keyword = keyword
                        small_keyword = keyword.replace("臺", "台")
                    condition  = or_(Attraction.name.ilike(f'%{small_keyword}%'),
                            Attraction.name.ilike(f'%{big_keyword}%'))
                    attractions = Attraction.query.filter(condition).all()
        else:
            attractions = Attraction.query.all()

        # 根據搜尋結果設定分頁
        per_page = 12
        total_page = len(attractions) / per_page
        render_page = page + 1
        next_page = None
        if total_page <= render_page:
            next_page = None
        else:
            next_page = render_page
        mini_item = 1 + ( 12 * (render_page - 1) )
        max_item = 12 + ( 12 * (render_page - 1) )
        attractions = attractions[mini_item - 1 : max_item]
        
        # 根據分頁結果設定 response
        # 若無 item 404
        if not len(attractions):
            return abort(404, "搜尋無結果")
        
        # 若有 item，根據景點 id 取得圖片
        attraction_id_list = []
        for i in attractions:
            attraction_id_list.append(i._id)
        imgs = AttractionImg.query.filter(AttractionImg.attraction_id.in_(attraction_id_list)).all()

        # loop attractions 根據規格賦值 response data_list
        data_list = []
        for attraction in attractions:
            attraction_info = {}
            attraction_info["id"] = attraction._id
            attraction_info["name"] = attraction.name
            attraction_info["category"] = attraction.CAT
            attraction_info["description"] = attraction.description
            attraction_info["address"] = attraction.address
            attraction_info["transport"] = attraction.direction
            attraction_info["mrt"] = attraction.MRT
            attraction_info["lat"] = attraction.latitude
            attraction_info["lng"] = attraction.longitude
            data_list.append(attraction_info)

        # images 賦值進 response data
        for data in data_list:
            data["images"] = []
            for img in imgs:
                if data["id"] == img.attraction_id:
                    data["images"].append(img.img)
        return {
            "nextPage":next_page,
            "data": data_list
        }, 200