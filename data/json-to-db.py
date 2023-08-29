import mysql.connector
import mysql.connector.pooling
import json
import re

text = "https://www.travel.taipei/d_upload_ttn/sceneadmin/pic/11000340.jpghttps://www.travel.taipei/d_upload_ttn/sceneadmin/image/A0/B0/C0/D906/E6/F186/809f30db-7079-421f-a625-7baa8ec21874.JPGhttps://www.travel.taipei/d_upload_ttn/sceneadmin/pic/11000341.jpghttps://www.travel.taipei/d_upload_ttn/sceneadmin/image/A0/B0/C0/D878/E420/F173/04765739-d40f-4d13-b271-8d5f9e5f44bd.JPGhttps://www.travel.taipei/d_upload_ttn/sceneadmin/pic/11000342.jpghttps://www.travel.taipei/d_upload_ttn/sceneadmin/image/A0/B0/C0/D20/E983/F199/866b5059-8fd7-4719-964c-51d2f78675d5.jpghttps://www.travel.taipei/d_upload_ttn/sceneadmin/image/A0/B0/C0/D546/E538/F353/ed2464d1-bc28-4790-96cd-5216db2c14f5.JPGhttps://www.travel.taipei/d_upload_ttn/sceneadmin/image/A0/B0/C1/D814/E111/F733/aed9d34d-890c-49fd-83ca-f76f38e4b94b.jpghttps://www.travel.taipei/streams/sceneadmin/video/100C1.mp3"

image_links = re.findall("https?://[^\s/$.?#].[^\s]*\.(?:jpg|JPG)", text)
separated_links = image_links[0].replace(".jpg", ".jpg ").replace(".JPG", ".JPG ").split()
print(separated_links)

# imgLink = re.split(r'(?i)(\.jpg)', text)
# print(imgLink)

# # 初始化變數
# separated_links = []
# current_link = ""
# jpg_extensions = {".jpg", ".JPG"}

# # 遍歷文本
# for char in text:
#     current_link += char
#     if current_link.endswith(tuple(jpg_extensions)):
#         separated_links.append(current_link)
#         current_link = ""

# print(separated_links)

with open("db.json", mode="r", encoding="utf-8") as file:
    data = json.load(file)

# 所有的 column 名稱
attr = data["result"]["results"][0]
keys = ", ".join(attr.keys())
# print(keys)


# 將所有的 value 放進 list 中
# 可以直接將每一次的 tuple 放到 execute 的參數中
results = data["result"]["results"]
data_tuples = []
for result in results:
    # 將除了 file 的都轉為 value
    data_tuple = (
        result["file"],
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
    data_tuples.append(data_tuple)
data_tuples = tuple(data_tuples)
# print(data_tuples[1][0])
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

dbconfig = {
    "user": 'root',
    "password": '12345678',
    "host": 'localhost',
    "database": 'taipeiAttractions',
    "pool_size": 5,  # 設置連接池大小
}

# db_pool = mysql.connector.pooling.MySQLConnectionPool(**dbconfig)
# connect = db_pool.get_connection()
# cursor = connect.cursor()
# query = 'INSERT INTO attraction(rate, direction, name, date, longitude, REF_WP, avBegin, langinfo, MRT, SERIAL_NO, RowNumber, CAT, MEMO_TIME, POI, file, idpt, latitude, description, _id, avEnd, address) values(%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)'
# cursor.execute(query, data_tuples[0])
# connect.commit()
# connect.close()