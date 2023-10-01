from flask_jwt_extended import JWTManager
from flask_sqlalchemy import SQLAlchemy
from flask_restx import Api
from flask import current_app

class CustomApi(Api):
    def handle_error(self, e):
        for val in current_app.error_handler_spec.values():
            for handler in val.values():
                registered_error_handlers = list(filter(lambda x: isinstance(e, x), handler.keys()))
                if len(registered_error_handlers) > 0:
                    raise e
        return super().handle_error(e)


jwt = JWTManager() # 創建 jwt 實例，可被調用

# 創建 restx 的 Api 實例，用以被調用，swagger ui 路徑為 /doc

authorizations = {
    'Bearer': {
        'type': 'apiKey',
        'in': 'header',
        'name': 'Authorization'
    },
}

api = CustomApi(title="台北一日遊網站 API", doc='/doc', authorizations=authorizations, security='Bearer')
db = SQLAlchemy()

