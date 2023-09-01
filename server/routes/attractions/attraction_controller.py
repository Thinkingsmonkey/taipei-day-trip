from flask_restx import  abort
from ...extensions import db
from ...models.db_models import Attraction, AttractionImg
from sqlalchemy import or_


def get_attraction_by_id(attractionId):
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


def get_attractions_list(page, keyword, start_item, per_page):
    if page < 0:
        return abort(400, "page is invalid")

    attractions = []
    # 是否有 keyword
    if keyword:
        # 搜索 keyword 是否為 MRT 站
        is_mrt_attraction = Attraction.query.filter_by(MRT=keyword).first()
        if is_mrt_attraction:
            # 若是找出 page 要求的捷運站景點
            attractions = Attraction.query.filter_by(MRT=keyword).offset(start_item).limit(per_page)
        else:
            # 若不是，使用模糊搜索找 page 要求的景點
            if "臺" not in keyword and "台" not in keyword:
                attractions = Attraction.query.filter(Attraction.name.ilike(f'%{keyword}%')).offset(start_item).limit(per_page)
            else:
                # 若 keyword 含 "台"、"臺" 使用 or_ 搜索兩者
                if "台" in keyword or "臺" in keyword:
                    small_keyword = keyword.replace("臺", "台")
                    big_keyword = keyword.replace("台", "臺")
                condition  = or_(Attraction.name.ilike(f'%{small_keyword}%'),
                        Attraction.name.ilike(f'%{big_keyword}%'))
                attractions = Attraction.query.filter(condition).offset(start_item).limit(per_page)
    #! 如果沒有 keyword，搜索 page 的範圍
    else:
        attractions = Attraction.query.order_by(Attraction._id).offset(start_item).limit(per_page)

    #! 檢測下一頁有無 item
    next_page_item = attractions.offset(start_item + per_page).limit(1).first()
    if not next_page_item:
        next_page = None
    else:
        next_page = page + 1

    attractions = attractions.all()
    #! error handle 
    # 根據keyword、分頁搜尋結果設定 response
    # 若無 item 404
    if not len(attractions):
        return abort(404, "搜尋無結果")
    
    # 若有 item，根據景點 id 取得圖片
    attraction_id_list = []
    for item in attractions:
        attraction_id_list.append(item._id)
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
        attraction_info["images"] = []
        data_list.append(attraction_info)

    # images 賦值進 response data
    for attraction_info in data_list:
        for img in imgs:
            if attraction_info["id"] == img.attraction_id:
                attraction_info["images"].append(img.img)
    return {
        "nextPage":next_page,
        "data": data_list
    }, 200