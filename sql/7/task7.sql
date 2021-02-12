ALTER TABLE products DROP CONSTRAINT products_category_id_fkey;
ALTER TABLE products ADD CONSTRAINT products_category_id_fkey FOREIGN KEY (category_id) REFERENCES categories (id) ON DELETE CASCADE;
ALTER TABLE orders DROP CONSTRAINT orders_product_id_fkey;
ALTER TABLE orders ADD CONSTRAINT orders_product_id_fkey FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE CASCADE;
DELETE FROM Categories WHERE title='Mobile phones';
