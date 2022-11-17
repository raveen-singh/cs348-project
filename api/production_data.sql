-- Unit Lister Accounts

INSERT INTO UnitListerAccount
VALUES (NULL, 'johndoe45', 'password123', 'John Doe', '8443212200', 'admin@iconstudents.ca','https://www.iconstudents.com/');

INSERT INTO UnitListerAccount
VALUES (NULL, 'maryjane99', 'mj123!', 'Mary Jane', '5198843670', 'maryjane@wcri.coop','https://www.wcri.coop/');

INSERT INTO UnitListerAccount
VALUES (NULL, 'alex_smith_27', 'as1997!', 'Alex Smith', '5197477276', 'alexs@woch.ca','https://www.rentwoch.com/');

INSERT INTO UnitListerAccount
VALUES (NULL, 'jlee', 'jl_1998_23', 'Jason Lee', '5193400172', 'jlee@accomod8u.com','https://www.accomod8u.com/');

INSERT INTO UnitListerAccount
VALUES (NULL, 'henryDavis123', 'henryPass_!2', 'Henry Davis', '5199548082', 'hdavis@kwproperty.com','https://www.kwproperty.com/');


-- Buildings
INSERT INTO Building
VALUES (NULL,'330 Phillip St',0,'Ensuite','Apartment',0.7);

INSERT INTO Building
VALUES (NULL,'256 Phillip St',1,'Building','Apartment',0.6);

INSERT INTO Building
VALUES (NULL,'254 Phillip St',1,'Ensuite','Apartment',0.5);

INSERT INTO Building
VALUES (NULL,'110 University Ave W',1,'None','House',1.7);

INSERT INTO Building
VALUES (NULL,'315 King St N',0,'Ensuite','Apartment',2.7);

INSERT INTO Building
VALUES (NULL,'339 King St N',1,'Ensuite','Apartment',2.8);

INSERT INTO Building
VALUES (NULL, '181 Lester', 0, 'Ensuite', 'Apartment', 1.0);

INSERT INTO Building
VALUES (NULL, '258C Sunview St', 0, 'Ensuite', 'Apartment', 1.7);

INSERT INTO Building 
VALUES (NULL, '203 Lester St', 1, 'Building', 'Apartment', 1.0);

INSERT INTO Building 
VALUES (NULL, '255 Sunview St', 1, 'Building', 'Apartment', 1.2);

INSERT INTO Building 
VALUES (NULL, '258 Sunview St', 0, 'Building', 'Apartment', 1.1);

INSERT INTO Building 
VALUES (NULL, '238 Lester St', 1, 'Building', 'Apartment', 0.9);

-- Available Units
-- TODO: Please find and upload images to images folder that correspond to the building
INSERT INTO AvailableUnit
VALUES (NULL, 1, 1, 202, 8, 4, 2, '/images/unit_1.jpg', 2, 1000);

INSERT INTO AvailableUnit
VALUES (NULL, 1, 1, 101, 4, 3, 3, '/images/unit_2.jpg', 3, 900);

INSERT INTO AvailableUnit
VALUES (NULL, 1, 1, 303, 12, 2, 4, '/images/unit_3.jpg', 1, 800);

INSERT INTO AvailableUnit
VALUES(NULL, 2, 2, 36, 4, 3, 5, '/images/unit_4.jpg', 2, 750);

INSERT INTO AvailableUnit
VALUES(NULL, 2, 2, 37, 4, 5, 5, '/images/unit_5.jpg', 3, 900);

INSERT INTO AvailableUnit
VALUES(NULL, 5, 3, 12, 8, 3, 1, '/images/unit_6.jpg', 4, 1200);

INSERT INTO AvailableUnit
VALUES(NULL, 5, 3, 14, 8, 3, 1, 'path/to/image', 4, 1100);

INSERT INTO AvailableUnit
VALUES(NULL, 6, 4, 3, 12, 4, 10, 'path/to/image', 3, 950);

INSERT INTO AvailableUnit
VALUES(NULL, 6, 4, 4, 12, 4, 11, 'path/to/image', 3, 950);

INSERT INTO AvailableUnit
VALUES(NULL, 6, 4, 5, 12, 3, 14, 'path/to/image', 1, 700);

INSERT INTO AvailableUnit
VALUES(NULL, 6, 4, 6, 12, 3, 15, 'path/to/image', 1, 700);


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

INSERT INTO Review
VALUES (NULL, 4, 1, 2, 'The pipe is leaking under the sink, but no one from the building management team coming to resolve the issue.', 8);

INSERT INTO Review
VALUES (NULL, 4, 3, 3, 'The admin is not that helpful and the room is not very clean and tidy as well. Overall very average.', 7);

INSERT INTO Review
VALUES (NULL, 5, 4, 5, 'My room has a nice view of the city and is very clean when I move in. The bus stop is also very convenient.', 1);

INSERT INTO Review
VALUES (NULL, 5, 3, 4, 'The room is decently clean and having the ensuite laundry is nice, but the location is a bit too far', 4);

INSERT INTO Review
VALUES (NULL, 6, 5, 5, 'The building admin is very helpful and the room is extremely clean and tidy. Would recommend to anyone staying in Waterloo.', 6);

INSERT INTO Review
VALUES (NULL, 6, 3, 2, 'There is no major issues but the room is not the cleanest. Also the admin can be more responsive to requests.', 3);

INSERT INTO Review
VALUES (NULL, 7, 4, 4, 'The door to the unit sometimes would get stuck. Admin was helpful though! Otherwise, was a great place to live.', 2);

INSERT INTO Review
VALUES (NULL, 7, 0, 0, 'I hate this place. Never rent from 181 again! @!#$% >:(', 4);

INSERT INTO Review
VALUES (NULL, 8, 5, 5, 'Loved living here!! The admin were super helpful, even when our laundry broke and started leaking onto our floors :(', 3);

INSERT INTO Review
VALUES (NULL, 9, 3, 0, 'Literally got bed bugs. Not subletting here again.', 8);

INSERT INTO Review
VALUES (NULL, 9, 2, 1, 'Only upside was living by Cocos. Otherwise would not recommend', 4);

INSERT INTO Review
VALUES (NULL, 9, 3, 3, 'The lighting was not that good. I guess I would live here again? Probably better options out there though.', 1);

INSERT INTO Review
VALUES (NULL, 10, 1, 0, 'Furniture was not great and the apartment had bugs.', 1);

INSERT INTO Review
VALUES (NULL, 10, 2, 3, 'It was ok. Not the best and not the worst place I have lived in.', 6);

INSERT INTO Review
VALUES (NULL, 11, 5, 5, 'The apartment was modern and was not far from campus.', 2);

INSERT INTO Review
VALUES (NULL, 11, 5, 4, 'Building management was responsive when I got locked out of my room.', 3);

INSERT INTO Review
VALUES (NULL, 12, 2, 2, 'Close to the plaza and campus. The rest of the apartment was meh.', 5);

INSERT INTO Review
VALUES (NULL, 12, 4, 4, 'I enjoyed my time here, apartment was clean and I did not have any issues.', 4);
