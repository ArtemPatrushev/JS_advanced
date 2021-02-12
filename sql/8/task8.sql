SELECT Categories.id, Categories.title, COUNT(Categories.id)
FROM Categories JOIN Products ON Products.category_id = Categories.id
GROUP BY Categories.id
ORDER BY Categories.id;