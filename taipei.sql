CREATE DATABASE  taipeiAttractions;
USE taipeiAttractions;
-- DROP TABLE attraction;
-- DROP TABLE attractionImg;

SELECT subquery.Mrt, subquery.num_around_attractions
FROM (
    SELECT attraction.Mrt, COUNT(attraction._id) AS num_around_attractions
    FROM attraction
    GROUP BY attraction.Mrt
) AS subquery
ORDER BY subquery.num_around_attractions DESC;

SELECT attraction.Mrt, COUNT(attraction._id) AS num_around_attractions
FROM attraction
GROUP BY attraction.Mrt;

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


SELECT MRT, COUNT(MRT) FROM attraction group by MRT;

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