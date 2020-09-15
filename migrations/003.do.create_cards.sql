DROP TYPE IF EXISTS card_type;
CREATE TYPE card_type AS ENUM (
  'Wild',
  'Regular'
);

DROP TYPE IF EXISTS card_status;
CREATE TYPE card_status AS ENUM (
  'Active',
  'Drawn',
  'Not Drawn'
);

CREATE TABLE IF NOT EXISTS cards (
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    card_type card_type NOT NULL,
    card_copy TEXT NOT NULL,
    card_status card_status NOT NULL,
    thread_count INTEGER NOT NULL,
    message_count INTEGER NOT NULL
);

INSERT INTO cards(id,card_type,card_copy,card_status,thread_count,message_count) VALUES (1,'Regular','Someone spills hot oil on you, you scream...','Not Drawn',1,2);
INSERT INTO cards(id,card_type,card_copy,card_status,thread_count,message_count) VALUES (2,'Regular','You arrive at the emergency room, they ask why you''re here. You calmly say…','Not Drawn',11,6);
INSERT INTO cards(id,card_type,card_copy,card_status,thread_count,message_count) VALUES (3,'Regular','You meet your tinder match, they look at you and say…','Not Drawn',8,12);
INSERT INTO cards(id,card_type,card_copy,card_status,thread_count,message_count) VALUES (4,'Regular','You''re waiting to hear about your newly born baby, the doctor comes out and says…','Not Drawn',4,1);
INSERT INTO cards(id,card_type,card_copy,card_status,thread_count,message_count) VALUES (5,'Regular','You ask siri where the nearest coffee shop is, she replies…','Not Drawn',3,4);
INSERT INTO cards(id,card_type,card_copy,card_status,thread_count,message_count) VALUES (6,'Regular','You ask your crush to be exclusive, they reply…','Not Drawn',7,9);
INSERT INTO cards(id,card_type,card_copy,card_status,thread_count,message_count) VALUES (7,'Regular','Suspicious you ask your mom if you are adopted, she whispers…','Not Drawn',1,10);
INSERT INTO cards(id,card_type,card_copy,card_status,thread_count,message_count) VALUES (8,'Regular','You have the winning Powerball numbers you exclaim…','Not Drawn',3,8);
INSERT INTO cards(id,card_type,card_copy,card_status,thread_count,message_count) VALUES (9,'Regular','Seeing you for the first time after reconstrcutive surgery, your friend gasps and says','Not Drawn',5,2);
INSERT INTO cards(id,card_type,card_copy,card_status,thread_count,message_count) VALUES (10,'Regular','Aliens land on Earth, their message to the world is:','Not Drawn',10,3);
INSERT INTO cards(id,card_type,card_copy,card_status,thread_count,message_count) VALUES (11,'Regular','I love you, you love me…','Not Drawn',12,11);
INSERT INTO cards(id,card_type,card_copy,card_status,thread_count,message_count) VALUES (12,'Regular','You receive a text from yourself 10 years from now. It says:','Not Drawn',2,4);
INSERT INTO cards(id,card_type,card_copy,card_status,thread_count,message_count) VALUES (13,'Regular','Hitting on someone at a bar, you start by saying:','Not Drawn',9,11);
INSERT INTO cards(id,card_type,card_copy,card_status,thread_count,message_count) VALUES (14,'Regular','First day of work, introduced to the person you''ll share a cubicle with, they look at you and say','Not Drawn',4,9);
INSERT INTO cards(id,card_type,card_copy,card_status,thread_count,message_count) VALUES (15,'Regular','I had a dream that:','Not Drawn',10,7);
INSERT INTO cards(id,card_type,card_copy,card_status,thread_count,message_count) VALUES (16,'Regular','You text the babysitter to check on your kids. They reply:','Not Drawn',9,3);
INSERT INTO cards(id,card_type,card_copy,card_status,thread_count,message_count) VALUES (17,'Regular','You see the grand canyon and exclaim:','Not Drawn',7,8);
INSERT INTO cards(id,card_type,card_copy,card_status,thread_count,message_count) VALUES (18,'Regular','Stranded on an island with a stranger, they grab you and say:','Not Drawn',1,6);
INSERT INTO cards(id,card_type,card_copy,card_status,thread_count,message_count) VALUES (19,'Regular','After kissing your soul mate for the first time, they look at you and say:','Not Drawn',10,1);
INSERT INTO cards(id,card_type,card_copy,card_status,thread_count,message_count) VALUES (20,'Regular','Your wifi network password is…','Not Drawn',4,9);
INSERT INTO cards(id,card_type,card_copy,card_status,thread_count,message_count) VALUES (21,'Regular','Seeing your favorite celebrity, you run up to them and say:','Not Drawn',7,10);
INSERT INTO cards(id,card_type,card_copy,card_status,thread_count,message_count) VALUES (22,'Regular','After passing through the body scanner at the airport, the TSA agent looks at you and says:','Not Drawn',3,6);
INSERT INTO cards(id,card_type,card_copy,card_status,thread_count,message_count) VALUES (23,'Regular','You ask your significant other, "How do I look?" They respond:','Not Drawn',2,9);
INSERT INTO cards(id,card_type,card_copy,card_status,thread_count,message_count) VALUES (24,'Regular','Four score and seven years ago…','Not Drawn',12,1);
INSERT INTO cards(id,card_type,card_copy,card_status,thread_count,message_count) VALUES (25,'Regular','During a routine physical, your doctor says to you:','Not Drawn',5,8);
INSERT INTO cards(id,card_type,card_copy,card_status,thread_count,message_count) VALUES (26,'Regular','Your 5 year old asks if God is real. You answer…','Not Drawn',1,4);
INSERT INTO cards(id,card_type,card_copy,card_status,thread_count,message_count) VALUES (27,'Regular','Whenever your parrot meets someone new, it squawks:','Not Drawn',7,5);
INSERT INTO cards(id,card_type,card_copy,card_status,thread_count,message_count) VALUES (28,'Regular','A 5 yeaar-old appears lost. After offering to help them, they calmly reply:','Not Drawn',1,5);
INSERT INTO cards(id,card_type,card_copy,card_status,thread_count,message_count) VALUES (29,'Regular','Your sitcom catchphrase is:','Not Drawn',7,3);
INSERT INTO cards(id,card_type,card_copy,card_status,thread_count,message_count) VALUES (30,'Regular','Your grandmother texts you for the first time:','Not Drawn',4,3);
INSERT INTO cards(id,card_type,card_copy,card_status,thread_count,message_count) VALUES (31,'Regular','The dolphin''s first message to humanity is:','Not Drawn',8,12);
INSERT INTO cards(id,card_type,card_copy,card_status,thread_count,message_count) VALUES (32,'Regular','You startup your phone for the first time, the following messages is displayed','Not Drawn',7,2);
INSERT INTO cards(id,card_type,card_copy,card_status,thread_count,message_count) VALUES (33,'Regular','You have Tourette''s. Periodically you call out:','Not Drawn',1,2);
INSERT INTO cards(id,card_type,card_copy,card_status,thread_count,message_count) VALUES (34,'Regular','Your FB memory from 5 years ago says:','Not Drawn',6,9);
INSERT INTO cards(id,card_type,card_copy,card_status,thread_count,message_count) VALUES (35,'Regular','On the day of your arranged marriage, you lift the veil and say:','Not Drawn',11,6);
INSERT INTO cards(id,card_type,card_copy,card_status,thread_count,message_count) VALUES (36,'Regular','The first words of your autobiography are:','Not Drawn',8,10);
INSERT INTO cards(id,card_type,card_copy,card_status,thread_count,message_count) VALUES (37,'Regular','Your best friend is reading your eulogy. There first words are:','Not Drawn',11,7);
INSERT INTO cards(id,card_type,card_copy,card_status,thread_count,message_count) VALUES (38,'Regular','You''re the captain of the Titanic. The last words to your crew are:','Not Drawn',5,2);
INSERT INTO cards(id,card_type,card_copy,card_status,thread_count,message_count) VALUES (39,'Regular','The voivces in your head keep repeating:','Not Drawn',3,8);
INSERT INTO cards(id,card_type,card_copy,card_status,thread_count,message_count) VALUES (40,'Regular','Your family crest says:','Not Drawn',6,10);
INSERT INTO cards(id,card_type,card_copy,card_status,thread_count,message_count) VALUES (41,'Regular','The birthday card your grandma sent to you says:','Not Drawn',3,1);
INSERT INTO cards(id,card_type,card_copy,card_status,thread_count,message_count) VALUES (42,'Regular','Your final words','Not Drawn',8,2);
INSERT INTO cards(id,card_type,card_copy,card_status,thread_count,message_count) VALUES (43,'Regular','You send back your dish at a restaurant, the chef comes out and says:','Not Drawn',2,4);
