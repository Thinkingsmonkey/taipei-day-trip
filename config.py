import os

class Config():
  JSON_AS_ASCII = False
  TEMPLATES_AUTO_RELOAD = True
  SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URI')  # 使用環境變數
  SQLALCHEMY_TRACK_MODIFICATIONS = False
  ERROR_404_HELP = False