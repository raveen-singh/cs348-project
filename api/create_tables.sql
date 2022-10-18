CREATE DATABASE IF NOT EXISTS cs348db;
USE cs348db;

CREATE TABLE IF NOT EXISTS UnitListerAccount(
    pm_id int NOT NULL AUTO_INCREMENT,  
    name VARCHAR(255) NOT NULL,
    phone_num VARCHAR(10) NOT NULL,
    email VARCHAR(255) NOT NULL,
    website VARCHAR(255),
    PRIMARY KEY (pm_id)
    );

CREATE TABLE IF NOT EXISTS Building(
    building_id int NOT NULL AUTO_INCREMENT,
    address VARCHAR(255) NOT NULL,
    pet_friendly TINYINT(1) NOT NULL,
    laundry_availability ENUM('building', 'ensuite', 'none') NOT NULL,
    type_of_unit ENUM('apartment','house') NOT NULL,
    distance_from_waterloo DECIMAL(3,1) NOT NULL,
    PRIMARY KEY (building_id)
);

CREATE TABLE IF NOT EXISTS AvailableUnit(
    unit_id int NOT NULL AUTO_INCREMENT,
    building_id int NOT NULL,
    pm_id int NOT NULL,
    room_num int NOT NULL,
    lease_term int NOT NULL, 
    num_beds int NOT NULL,
    floor_num int NOT NULL,
    image_path VARCHAR(100) NOT NULL,
    num_washrooms int NOT NULL,
    rent_price int NOT NULL,
    PRIMARY KEY (unit_id),
    FOREIGN KEY (building_id) REFERENCES Building(building_id),
    FOREIGN KEY (pm_id) REFERENCES UnitListerAccount(pm_id)
);


CREATE TABLE IF NOT EXISTS Review(
    review_id int NOT NULL AUTO_INCREMENT,
    building_id int NOT NULL,
    admin_helpfulness_rating int NOT NULL,
    cleanliness_rating int NOT NULL,
    comment TEXT,
    review_helpfulness int NOT NULL,
    PRIMARY KEY (review_id),
    FOREIGN KEY (building_id) REFERENCES Building(building_id) ON DELETE CASCADE
);

DESCRIBE UnitListerAccount;

DESCRIBE Building;

DESCRIBE AvailableUnit;

DESCRIBE Review;
