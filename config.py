import os
import datetime

class Config():
  TEMPLATES_AUTO_RELOAD = True
  SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URI')  # 部署環境使用
  # SQLALCHEMY_DATABASE_URI = "mysql://root:12345678@localhost/taipeiattractions"  # 開發環境使用
  SQLALCHEMY_TRACK_MODIFICATIONS = False
  ERROR_404_HELP = False

  JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY') # 部署環境使用
  # JWT_SECRET_KEY = "this secret key" # 開發環境使用
  JWT_ACCESS_TOKEN_EXPIRES = datetime.timedelta(days=7)
  JWT_TOKEN_LOCATION = ["headers", "cookies"]  