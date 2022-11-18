-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS users;

DROP TABLE IF EXISTS secrets;

CREATE TABLE users(
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    first_name VARCHAR NOT NULL,
    last_name VARCHAR NOT NULL,
    email VARCHAR NOT NULL,
    password_hash TEXT NOT NULL
);

CREATE TABLE secrets(
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title VARCHAR NOT NULL,
    description VARCHAR NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO
    secrets (title, description)
VALUES
    ('SECRET', 'THIS IS THE ULTIMATE SECRET'),
    ('SECRET 1', 'THIS IS THE REAL SECRET'),
    (
        'SECRET 2',
        'ALL SECRETS ARE LIES EXCEPT THIS ONE'
    )