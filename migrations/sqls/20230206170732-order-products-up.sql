CREATE TABLE order_products (
    id SERIAL PRIMARY KEY,
    quantity integer,
    products_id bigint REFERENCES products(id) NOT NULL,
    orders_id bigint REFERENCES orders(id) NOT NULL
);