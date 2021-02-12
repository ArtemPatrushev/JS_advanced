INSERT INTO users (first_name, second_name, phone)
VALUES
('Peter', 'Griffin', '88002000300'),
('Joe', 'Swanson', '89002341222'),
('Glenn', 'Quagmire', '+79192461788'),
('Cleveland', 'Brown', '89991230203');

INSERT INTO categories (title) 
VALUES 
('Alcohol'),
('Cars'),
('Drugs'),
('Mobile phones'),
('Weapons');

ALTER TABLE Products ADD title VARCHAR(30);

INSERT INTO Products (category_id, price, title)
VALUES
(1, 5000, 'Jack Daniels Barrel'),
(5, 12000, 'Carbine, 5.56 mm, M4'),
(1, 999, 'Pawtucket Patriot Beer'),
(3, 300, 'Weed'),
(3, 500, 'LSD'),
(4, 130, 'iPhone X'),
(4, 123, 'iPnone 8'),
(2, 40000, 'Mustang GT 2019');

INSERT INTO Orders (user_id, product_id, count)
VALUES
(1, 1, 1),
(2, 2, 8),
(1, 3, 3),
(2, 4, 16),
(2, 5, 8),
(4, 6, 2),
(4, 7, 2),
(3, 8, 2);