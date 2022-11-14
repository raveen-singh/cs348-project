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

-- feature 5: view building reviews with filter and sort functionality
-- sample query 1
SELECT b.building_id, b.address, AVG(r.admin_helpfulness_rating) AS average_admin_helpfulness_rating, AVG(r.cleanliness_rating) AS average_cleanliness_rating, AVG(r.review_helpfulness) AS average_review_helpfulness, b.distance_from_waterloo, b.laundry_availability, b.pet_friendly, b.type_of_unit
FROM Review AS r 
INNER JOIN building AS b
ON r.building_id = b.building_id 
GROUP BY b.building_id;

-- sample query 2
SELECT b.building_id, b.address, AVG(r.admin_helpfulness_rating) AS average_admin_helpfulness_rating, AVG(r.cleanliness_rating) AS average_cleanliness_rating, AVG(r.review_helpfulness) AS average_review_helpfulness, b.distance_from_waterloo, b.laundry_availability, b.pet_friendly, b.type_of_unit
FROM Review AS r 
INNER JOIN building AS b
ON r.building_id = b.building_id 
GROUP BY b.building_id
HAVING AVG(r.review_helpfulness) > 4;

-- sample query 3
SELECT b.building_id, b.address, AVG(r.admin_helpfulness_rating) AS average_admin_helpfulness_rating, AVG(r.cleanliness_rating) AS average_cleanliness_rating, AVG(r.review_helpfulness) AS average_review_helpfulness, b.distance_from_waterloo, b.laundry_availability, b.pet_friendly, b.type_of_unit
FROM Review AS r 
INNER JOIN building AS b
ON r.building_id = b.building_id 
WHERE laundry_availability = 'ensuite'
GROUP BY b.building_id;

-- sample query 4
SELECT b.building_id, b.address, AVG(r.admin_helpfulness_rating) AS average_admin_helpfulness_rating, AVG(r.cleanliness_rating) AS average_cleanliness_rating, AVG(r.review_helpfulness) AS average_review_helpfulness, b.distance_from_waterloo, b.laundry_availability, b.pet_friendly, b.type_of_unit
FROM Review AS r 
INNER JOIN building AS b
ON r.building_id = b.building_id 
GROUP BY b.building_id
HAVING AVG(r.admin_helpfulness_rating) >= 3
ORDER BY AVG(r.review_helpfulness) DESC;