CREATE TABLE order_products (
    id SERIAL PRIMARY KEY,
    quantity VARCHAR,
    product_id bigint REFERENCES products(id) NOT NULL,
    orders_id bigint REFERENCES orders(id) NOT NULL
)