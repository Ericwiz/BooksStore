CREATE TABLE books (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200),
    author VARCHAR(100),
    total_pages integer,
    type VARCHAR(100),
    summary text
);