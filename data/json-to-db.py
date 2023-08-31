import mysql.connector
import mysql.connector.pooling
import json
import re

dbconfig = {
    "user": 'root',
    "password": '12345678',
    "host": 'localhost',
    "database": 'taipeiAttractions',
    "pool_size": 5,  # 設置連接池大小
}
db_pool = mysql.connector.pooling.MySQLConnectionPool(**dbconfig)


with open("db.json", mode="r", encoding="utf-8") as file:
    data = json.load(file)




# 將所有的 value 放進 list 中
# 可以直接將每一次的 tuple 放到 execute 的參數中
results = data["result"]["results"]
for result in results:
    # 將除了 file、id 的都轉為 value
    data_tuple = (
        result["rate"],
        result["direction"],
        result["name"],
        result["date"],
        result["longitude"],
        result["REF_WP"],
        result["avBegin"],
        result["langinfo"],
        result["MRT"],
        result["SERIAL_NO"],
        result["RowNumber"],
        result["CAT"],
        result["MEMO_TIME"],
        result["POI"],
        result["idpt"],
        result["latitude"],
        result["description"],
        result["_id"],
        result["avEnd"],
        result["address"],
    )

    connect = db_pool.get_connection()
    cursor = connect.cursor()

    attraction_query = 'INSERT INTO attraction(rate, direction, name, date, longitude, REF_WP, avBegin, langinfo, MRT, SERIAL_NO, RowNumber, CAT, MEMO_TIME, POI, idpt, latitude, description, _id, avEnd, address) values(%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)'
    cursor.execute(attraction_query, data_tuple)
    connect.commit()
    connect.close()

results = data["result"]["results"]
for result in results:
    separated_links = result["file"].replace(".jpg", ".jpg ").replace(".JPG", ".JPG ").split()
    filtered_urls = [url for url in separated_links if url.endswith(('.jpg', '.JPG'))]
    for img in filtered_urls:
        img_query = 'INSERT INTO attractionImg(attraction_id, img) value(%s, %s)'
        connect = db_pool.get_connection()
        cursor = connect.cursor()
        cursor.execute(img_query, (result["_id"], img))
        connect.commit()
        connect.close()
    


# 個別功能

# 所有的 column 名稱
# attr = data["result"]["results"][0]
# keys = ", ".join(attr.keys())
# print(keys)
    
# # 所有的資料
# values = attr.values()
# lis = ""
# for index, value in enumerate(values):
#   if index == 0:
#     value = str(value)
#     lis += value
#     continue
#   if type(value) == int:
#       value = str(value)
#       lis += ", " + value + ""
#   else:
#     lis += ", \"" + value + "\""
# data_list = lis.split(',')

# # 去除每个分割部分的首尾空格，并放入一个元组中
# # data_tuple = tuple(part.strip().strip('"') for part in data_list)
# data_tuple = (int(data_list[0]),) + tuple(part.strip().strip('"') for part in data_list[1:-2]) + (int(data_list[-3]), data_list[-1].strip())


# x = "%s"
# for i in range(20): # 共 21 個
#   x+=", %s"
# print(x)



