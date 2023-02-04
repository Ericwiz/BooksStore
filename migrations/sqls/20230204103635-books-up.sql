CREATE TABLE books (
    title VARCHAR(200), 
    author VARCHAR(100), 
    total_pages integer, 
    type VARCHAR(50),
    summary text,
    id SERIAL PRIMARY KEY
);