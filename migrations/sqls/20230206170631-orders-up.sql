CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    status VARCHAR(100),
    user_id bigint 
    REFERENCES users(id) NOT NULL
    
); 
ALTER TABLE orders DROP CONSTRAINT orders_user_id_fkey;
