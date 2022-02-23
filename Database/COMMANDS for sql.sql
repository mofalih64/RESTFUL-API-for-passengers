
CREATE TABLE City (
    id serial PRIMARY KEY,
    city_name varchar(50) UNIQUE NOT NULL,
    code varchar(5) NOT NULL UNIQUE
);

CREATE TABLE Airport (
    id serial PRIMARY KEY,
    city_id INT REFERENCES City(id) UNIQUE,
    code varchar (5) NOT NULL UNIQUE
);

CREATE TABLE Flight (
    id serial PRIMARY KEY,
    origin INT REFERENCES Airport(id) NOT NULL,
    destination INT REFERENCES Airport (id) NOT NULL,
    boarding_time DATE,
    distance INT ,
    attendance_time DATE,
);

CREATE TABLE Users (
    id serial PRIMARY KEY,
    firstname varchar(20) NOT NULL ,
    lastname varchar(20)  ,
    email varchar(50) NOT NULL,
    password VARCHAR(150) not NULL,
    username varchar(20) ,
    passport BIGINT,
    passport_image varchar(70) 
);

CREATE TABLE Flight_for_User (
id serial PRIMARY KEY,
User_id INT REFERENCES Users(id),
Flight_id INT REFERENCES Flights (id)
)

INSERT INTO Users (firstname,password) VALUES ('test','1234') RETURNING *;

ALTER TABLE Airport ADD UNIQUE (code);