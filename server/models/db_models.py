from ..extensions import db
from sqlalchemy.schema import UniqueConstraint

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
    bookings = db.relationship("Booking", back_populates="attraction", cascade="all, delete-orphan")
    attractionImgs = db.relationship("AttractionImg", back_populates="attraction")
    

class AttractionImg(db.Model):
    __tablename__ = 'attractionImg' # 指定 table name
    id = db.Column(db.Integer, primary_key=True,  autoincrement=True)
    img = db.Column(db.String(255), nullable=False)
    attraction_id = db.Column(db.Integer, db.ForeignKey("attraction._id"), nullable=False)
    attraction = db.relationship("Attraction", back_populates="attractionImgs")


class Member(db.Model):
    id = db.Column(db.Integer, primary_key=True,  autoincrement=True)
    name = db.Column(db.String(255))
    email = db.Column(db.String(255), unique=True)
    salt = db.Column(db.String(255), nullable=False)
    password_hash = db.Column(db.String(500), nullable=False)
    bookings = db.relationship("Booking", back_populates="member", cascade="all, delete-orphan")

class Booking(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    attraction_id = db.Column(db.Integer, db.ForeignKey("attraction._id"), nullable=False)
    member_id = db.Column(db.Integer, db.ForeignKey("member.id"), nullable=False)
    date = db.Column(db.Date)
    time = db.Column(db.Enum("afternoon", "morning"))
    price = db.Column(db.Integer, nullable=False)
    member = db.relationship("Member", back_populates="bookings")
    attraction = db.relationship("Attraction", back_populates="bookings")
    __table_args__ = (UniqueConstraint('attraction_id', 'date', 'time', name='unique_attraction_date_time'),)
