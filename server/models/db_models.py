from ..extensions import db


class Attraction(db.Model):
    rate = db.Column(db.Integer)
    direction = db.Column(db.Text)
    name = db.Column(db.String(255))
    date = db.Column(db.String(255))
    longitude = db.Column(db.String(255))
    REF_WP = db.Column(db.String(255))
    avBegin = db.Column(db.String(255))
    langinfo = db.Column(db.String(255))
    MRT = db.Column(db.String(255))
    SERIAL_NO = db.Column(db.String(255))
    RowNumber = db.Column(db.String(255))
    CAT = db.Column(db.String(255))
    MEMO_TIME = db.Column(db.Text)
    POI = db.Column(db.String(255))
    idpt = db.Column(db.String(255))
    latitude = db.Column(db.String(255))
    description = db.Column(db.Text)
    _id = db.Column(db.Integer, primary_key=True)
    avEnd = db.Column(db.String(255))
    address = db.Column(db.String(255))
    

class AttractionImg(db.Model):
    id = db.Column(db.Integer, primary_key=True,  autoincrement=True)
    img = db.Column(db.String(255), nullable=False)
    attraction_id = db.Column(db.Integer, nullable=False)