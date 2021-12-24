
CREATE TABLE City (
    id serial PRIMARY KEY,
    city_name varchar(50) UNIQUE NOT NULL,
    code varchar(5) NOT NULL UNIQUE
);

CREATE TABLE Airport (
    id serial PRIMARY KEY,
    city_id INT REFERENCES City(id) UNIQUE,
    code varchar (5) NOT NULL
);

CREATE TABLE Flights (
    id serial PRIMARY KEY,
    origin INT REFERENCES Airport (id),
    destination INT REFERENCES Airport (id),
    boarding_time DATE NOT NULL,
    distance INT NOT NULL,
    attendance_time DATE NOT NULL,
);

CREATE TABLE the_user (
    id serial PRIMARY KEY,
    firstname varchar(20) NOT NULL,
    lastname varchar(20)  NOT NULL,
    email varchar(50) NOT NULL,
    password VARCHAR(150) not NULL,
    username varchar(20) UNIQUE NOT NULL,
    passport BIGINT  NOT NULL,
    passport_image varchar(70) NOT NULL
);

CREATE TABLE Flight_for_User (
id serial PRIMARY KEY,
User_id INT REFERENCES the_user(id),
Flight_id INT REFERENCES Flights (id),


)