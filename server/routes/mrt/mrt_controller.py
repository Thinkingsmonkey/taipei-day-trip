from flask_restx import abort
from ...extensions import db
from ...models.db_models import Attraction
from sqlalchemy import func

def get_mrts_list():
    # 利用 mrt 為 group，計算每個 mrt 出現次數，創建為子查詢
    subquery = db.session.query(
        Attraction.MRT,
        func.count(Attraction._id).label('num_around_attractions')
    ).group_by(Attraction.MRT).subquery()
    # 利用子查詢排序
    mrt_attraction_counts = db.session.query(
        subquery.c.MRT,
        subquery.c.num_around_attractions
    ).order_by(subquery.c.num_around_attractions.desc()).all()

    # 建立 data_list 並過濾掉 None 的站名
    data_list = []
    for mrt in mrt_attraction_counts:
        if mrt.MRT:
            data_list.append(mrt.MRT)

    return {"data":data_list}