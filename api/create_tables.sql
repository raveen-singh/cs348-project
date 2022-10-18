CREATE DATABASE IF NOT EXISTS cs348db;
USE cs348db;

CREATE TABLE IF NOT EXISTS UnitListerAccount(
    pm_id int NOT NULL AUTO_INCREMENT,  
    name VARCHAR(255) NOT NULL,
    phone_num VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    website VARCHAR(255) NOT NULL,
    PRIMARY KEY (pm_id)
    );

CREATE TABLE IF NOT EXISTS Building(
    building_id int NOT NULL AUTO_INCREMENT,
    address VARCHAR(255) NOT NULL,
    pet_friendly TINYINT(1) NOT NULL, -- TINYINT functions as a boolean
    laundry_availability VARCHAR(255) NOT NULL, -- Do we want a yes or no, or ensuite vs in building
    type_of_unit VARCHAR(255) NOT NULL, -- use a multiselect on frontend so values are consistent
    distance_from_waterloo DECIMAL(3,1) NOT NULL,
    PRIMARY KEY (building_id)
);

CREATE TABLE IF NOT EXISTS AvailableUnit(
    unit_id int NOT NULL AUTO_INCREMENT,
    building_id int,
    pm_id int,
    room_num int NOT NULL,
    lease_term int NOT NULL, -- measured in months or years?
    num_beds int NOT NULL,
    floor_num int NOT NULL,
    num_washrooms int NOT NULL,
    rent_price int NOT NULL,
    PRIMARY KEY (unit_id),
    FOREIGN KEY (building_id) REFERENCES Building(building_id),
    FOREIGN KEY (pm_id) REFERENCES UnitListerAccount(pm_id)
);


CREATE TABLE IF NOT EXISTS Review(
    review_id int NOT NULL AUTO_INCREMENT,
    building_id int,
    admin_helpfulness_rating int NOT NULL,
    cleanliness_rating int NOT NULL,
    comment TEXT NOT NULL,
    review_helpfulness int NOT NULL,
    PRIMARY KEY (review_id),
    FOREIGN KEY (building_id) REFERENCES Building(building_id)
);

DESCRIBE UnitListerAccount;

DESCRIBE Building;

DESCRIBE AvailableUnit;

DESCRIBE Review;