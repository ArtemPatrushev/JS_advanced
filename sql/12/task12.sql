CREATE VIEW show_all_orders AS
SELECT Users.custom_name AS customer,
Products.title AS product,
Categories.title AS category,
Products.properties -> 'legality' AS legality,
Products.price AS price,
Orders.count AS count,
(Orders.count * (SELECT price FROM Products WHERE id=Orders.product_id)) AS total_price
FROM Users
JOIN Orders ON Users.id = Orders.user_id
JOIN Products ON Orders.product_id = Products.id
JOIN  Categories ON Categories.id = Products.category_id
ORDER BY USERS.id;

SELECT * FROM show_all_orders;