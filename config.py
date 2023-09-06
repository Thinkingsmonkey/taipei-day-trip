import os

class Config():
  # JSON_SORT_KEYS = False
  TEMPLATES_AUTO_RELOAD = True
  SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URI')  # 部屬環境使用
  SQLALCHEMY_TRACK_MODIFICATIONS = False
  ERROR_404_HELP = False