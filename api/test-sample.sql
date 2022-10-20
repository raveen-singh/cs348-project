-- prior, make sure to run cleanup_tables.sql, create_tables.sql and populate_tables.sql

-- feature 1: register user
INSERT INTO UnitListerAccount
VALUES (
    NULL, 'johndoe45', 'password123', 'John Doe', '8443212200', 
    'admin@iconstudents.ca', 'www.iconstudents.com'
)

-- query to show the newly inserted row
SELECT * FROM UnitListerAccount
WHERE username = 'johndoe45';

-- feature 4: view available units with filter and sort functionality
-- sample query 1
SELECT u.name AS lister, u.email, u.phone_num, b.address, b.distance_from_waterloo, au.num_beds, au.num_washrooms, au.lease_term, au.rent_price, b.laundry_availability, b.pet_friendly, b.type_of_unit
FROM AvailableUnit AS au 
LEFT JOIN building AS b 
ON au.building_id = b.building_id 
LEFT JOIN UnitListerAccount AS u 
ON au.pm_id = u.pm_id;
-- sample query 2
SELECT u.name AS lister, u.email, u.phone_num, b.address, b.distance_from_waterloo, au.num_beds, au.num_washrooms, au.lease_term, au.rent_price, b.laundry_availability, b.pet_friendly, b.type_of_unit
FROM AvailableUnit AS au 
LEFT JOIN building AS b 
ON au.building_id = b.building_id 
LEFT JOIN UnitListerAccount AS u 
ON au.pm_id = u.pm_id
WHERE num_washrooms > 1 and num_beds > 2;
-- sample query 3
SELECT u.name AS lister, u.email, u.phone_num, b.address, b.distance_from_waterloo, au.num_beds, au.num_washrooms, au.lease_term, au.rent_price, b.laundry_availability, b.pet_friendly, b.type_of_unit
FROM AvailableUnit AS au 
LEFT JOIN building AS b 
ON au.building_id = b.building_id 
LEFT JOIN UnitListerAccount AS u 
ON au.pm_id = u.pm_id
WHERE lease_term >= 8
ORDER BY rent_price;