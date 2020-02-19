DROP TABLE IF EXISTS garden;

CREATE TABLE garden(
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(id),
    picture VARCHAR(300),
    name VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);