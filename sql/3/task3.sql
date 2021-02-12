CREATE TABLE Users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(20) NOT NULL,
    second_name VARCHAR(20) NOT NULL,
    phone VARCHAR(15) UNIQUE
);
CREATE TABLE Categories (
    id SERIAL PRIMARY KEY,
    title VARCHAR(20) NOT NULL UNIQUE
);
CREATE TABLE Products (
    id SERIAL PRIMARY KEY,
    category_id INTEGER REFERENCES Categories(id),
    price INTEGER CHECK (Price > 0)
);
CREATE TABLE Orders (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES Users(id),
    product_id INTEGER REFERENCES Products(id),
    count INTEGER DEFAULT 1,
    order_date DATE NOT NULL DEFAULT NOW()
);