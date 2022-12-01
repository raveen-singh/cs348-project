-- prior, make sure to run cleanup_tables.sql, create_tables.sql and populate_tables.sql

-- feature 1: register user
INSERT INTO UnitListerAccount
VALUES (
    NULL, 'johndoe30', 'password123', 'John Doe', '8443212200', 
    'johndoe@gmail.ca', 'www.johndoe.com');

-- feature 2: Posting a Unit
INSERT INTO AvailableUnit
VALUES (NULL, 1, 1, 202, 8, 4, 2, 'path/to/image', 2, 1000);

-- feature 3: Review a Building
INSERT INTO Review
VALUES (NULL, 1, 5, 5, 'I enjoyed my time here. The apartment was clean and organized!', 4);

-- feature 4: view available units with filter and sort functionality
-- sample query 1
SELECT u.name AS lister, u.email, u.phone_num, b.address, b.distance_from_waterloo, au.num_beds, au.num_washrooms, au.lease_term, au.rent_price, b.laundry_availability, b.pet_friendly, b.type_of_unit
FROM AvailableUnit AS au 
LEFT JOIN building AS b 
ON au.building_id = b.building_id 
LEFT JOIN UnitListerAccount AS u 
ON au.account_id = u.account_id;
-- sample query 2
SELECT u.name AS lister, u.email, u.phone_num, b.address, b.distance_from_waterloo, au.num_beds, au.num_washrooms, au.lease_term, au.rent_price, b.laundry_availability, b.pet_friendly, b.type_of_unit
FROM AvailableUnit AS au 
LEFT JOIN building AS b 
ON au.building_id = b.building_id 
LEFT JOIN UnitListerAccount AS u 
ON au.account_id = u.account_id
WHERE num_washrooms > 1 and num_beds > 2;
-- sample query 3
SELECT u.name AS lister, u.email, u.phone_num, b.address, b.distance_from_waterloo, au.num_beds, au.num_washrooms, au.lease_term, au.rent_price, b.laundry_availability, b.pet_friendly, b.type_of_unit
FROM AvailableUnit AS au 
LEFT JOIN building AS b 
ON au.building_id = b.building_id 
LEFT JOIN UnitListerAccount AS u 
ON au.account_id = u.account_id
WHERE lease_term >= 8
ORDER BY rent_price;

-- feature 5: view building reviews (all reviews and average)
-- sample query 1 for viewing average reviews for all buildings
SELECT b.building_id, r.admin_rating, r.cleanliness_rating, b.distance_from_waterloo, b.laundry_availability, b.pet_friendly, b.type_of_unit 
FROM Building b 
LEFT JOIN (
    SELECT building_id, ROUND(AVG(admin_helpfulness_rating), 1) AS admin_rating, ROUND(AVG(cleanliness_rating), 1) AS cleanliness_rating 
    FROM Review 
    GROUP BY building_id
) r
ON b.building_id = r.building_id

-- sample query 2 for viewing all reviews for a single building
Query 2: 
SELECT review_id, admin_helpfulness_rating, cleanliness_rating, review_helpfulness, comment
FROM Review r
LEFT JOIN building b ON r.building_id = b.building_id
WHERE b.building_id = 1

-- feature 6: 
DELETE FROM AvailableUnit WHERE unit_id = 1;
SELECT * FROM AvailableUnit WHERE unit_id = 1;