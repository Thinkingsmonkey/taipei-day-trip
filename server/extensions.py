from flask_jwt_extended import JWTManager
from flask_sqlalchemy import SQLAlchemy
from flask_restx import Api

jwt = JWTManager() # 創建 jwt 實例，可被調用

# 創建 restx 的 Api 實例，用以被調用，swagger ui 路徑為 /doc

api = Api(title="台北一日遊網站 API", doc='/doc')
db = SQLAlchemy()

