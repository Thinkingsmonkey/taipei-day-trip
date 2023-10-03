show databases;
USE taipeiAttractions;

-- CREATE DATABASE  taipeiAttractions;
-- DROP TABLE attraction;
-- DROP TABLE attractionImg;

SELECT subquery.Mrt, subquery.num_around_attractions
FROM (
    SELECT attraction.Mrt, COUNT(attraction._id) AS num_around_attractions
    FROM attraction
    GROUP BY attraction.Mrt
) AS subquery
ORDER BY subquery.num_around_attractions DESC;


INSERT INTO attraction(rate, direction, name, date,
 longitude, REF_WP, avBegin, langinfo,
 MRT, SERIAL_NO, RowNumber, CAT, MEMO_TIME,
 POI, file, idpt, latitude, description, _id,
 avEnd, address) values();


SELECT * FROM attractionImg;
CREATE TABLE attractionImg(
	id INT PRIMARY KEY AUTO_INCREMENT,
    img VARCHAR(200),
    attraction_id INT,
    FOREIGN KEY (attraction_id) REFERENCES attraction(_id) ON DELETE CASCADE
);


SELECT * FROM attraction;
CREATE TABLE attraction(
    rate INT,
    direction TEXT,
    name VARCHAR(255),
    date VARCHAR(255),
    longitude VARCHAR(255),
    REF_WP VARCHAR(255),
    avBegin VARCHAR(255),
    langinfo VARCHAR(255),
    MRT VARCHAR(255),
    SERIAL_NO VARCHAR(255),
    RowNumber VARCHAR(255),
    CAT VARCHAR(255),
    MEMO_TIME TEXT,
    POI VARCHAR(255),
    idpt VARCHAR(255),
    latitude VARCHAR(255),
    description TEXT,
    _id INT PRIMARY KEY,
    avEnd VARCHAR(255),
    address VARCHAR(255)
);

SELECT * FROM member;
CREATE TABLE member(
	id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) ,
    email VARCHAR(255) UNIQUE,
    salt VARCHAR(255) NOT NULL,
    password_hash VARCHAR(500) NOT NULL
);

SELECT * FROM booking;
-- drop table booking;
CREATE TABLE booking(
	id INT PRIMARY KEY AUTO_INCREMENT,
    attraction_id INT NOT NULL,
    member_id INT NOT NULL,
    date DATE,
    time ENUM('afternoon', 'morning'),
    price INT NOT NULL,
    is_deleted BOOL,
    FOREIGN KEY (attraction_id) REFERENCES attraction(_id) ON DELETE CASCADE,
    FOREIGN KEY (member_id) REFERENCES member(id) ON DELETE CASCADE
);

SELECT * FROM orders;
-- drop table orders;
CREATE TABLE orders(
	id INT PRIMARY KEY AUTO_INCREMENT,
    number VARCHAR(255) NOT NULL,
    member_id INT NOT NULL,
    price INT NOT NULL,
    name VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(255),
    status INT NOT NULL,
    FOREIGN KEY (member_id) REFERENCES member(id) ON DELETE CASCADE
);

SELECT * FROM orders_bookings;
-- drop table orders_bookings;
CREATE TABLE orders_bookings(
	id INT PRIMARY KEY AUTO_INCREMENT,
    orders_id INT NOT NULL,
    booking_id INT NOT NULL,
    FOREIGN KEY (orders_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (booking_id) REFERENCES booking(id) ON DELETE CASCADE
);