CREATE DATABASE cs348db;
USE cs348db;
CREATE TABLE users(
    firstname VARCHAR(30) NOT NULL,  
    lastname VARCHAR(30) NOT NULL);
INSERT INTO users VALUE(
    "cs348db",
    " connected"
);
DESCRIBE users;