INSERT INTO Products (category_id, price, title) VALUES 
(5, 1000, 'Bullets M4, 600'),
(5, 3000, 'Grenade launcher M4'),
(5, 330, 'Box magazine, M4'),
(1, 1500, 'Gentleman Jacks Rare'),
(1, 2200, 'Jack Daniels Honey');

SELECT id, title, price FROM Products WHERE to_tsvector('english', title) @@ plainto_tsquery('M4');
SELECT id, title, price FROM Products WHERE to_tsvector('english', title) @@ plainto_tsquery('Jack');
SELECT id, title, price FROM Products WHERE to_tsvector('english', title) @@ plainto_tsquery('Jack M4');