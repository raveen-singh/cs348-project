-- Unit Lister Accounts

INSERT INTO UnitListerAccount
VALUES (NULL, 'johndoe45', 'password123', 'John Doe', '8443212200', 'admin@iconstudents.ca','https://www.iconstudents.com/');

-- Buildings
INSERT INTO Building
VALUES (NULL,'330 Phillip St',0,'Ensuite','Apartment',0.7);

INSERT INTO Building
VALUES (NULL,'256 Phillip St',1,'Building','Apartment',0.6);

INSERT INTO Building
VALUES (NULL,'254 Phillip St',1,'Ensuite','Apartment',0.5);

-- Available Units
-- TODO: Please find and upload images to images folder that correspond to the building
INSERT INTO AvailableUnit
VALUES (NULL, 1, 1, 202, 8, 4, 2, 'path/to/image', 2, 1000);

INSERT INTO AvailableUnit
VALUES (NULL, 1, 1, 101, 4, 3, 3, 'path/to/image', 3, 900);

INSERT INTO AvailableUnit
VALUES (NULL, 1, 1, 303, 12, 2, 4, 'path/to/image', 1, 800);


-- Reviews
INSERT INTO Review
VALUES (NULL, 1, 4, 5, 'I greatly enjoyed my time at 330 Phillip.', 2);

INSERT INTO Review
VALUES (NULL, 1, 2, 1, 'Please do not live at 330 Phillip. My unit was dirty when I moved in.', 3);

INSERT INTO Review
VALUES (NULL, 1, 4, 4, 'I was worried about my unit being clean when I moved in after I read the earlier comments, but my unit was clean & I had no issues with building management.', 3);

INSERT INTO Review
VALUES (NULL, 2, 5, 4, 'I felt the walls were quite thin at 256 Phillip. I could hear my roommate quite easily!', 4);

INSERT INTO Review
VALUES (NULL, 2, 5, 3, 'The water to my unit stopped working, but the building management resolved the issue quickly.', 5);

INSERT INTO Review
VALUES (NULL, 2, 3, 1, 'My room was dirty when I moved in. There also were bugs in the apartment.', 5);

INSERT INTO Review
VALUES (NULL, 3, 5, 3, 'I liked my time at 254 Phillip. Having the ensuite laundry was a nice addition.', 4);

INSERT INTO Review
VALUES (NULL, 3, 4, 5, 'Had a good time a 254 Phillip. Would stay here again next time.', 4);

INSERT INTO Review
VALUES (NULL, 3, 5, 5, 'I had no issues with my stay. Building is in a convienent location and close to campus', 5);
