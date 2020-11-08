CREATE DATABASE tertle;

CREATE TABLE signups (
    signup_id BIGSERIAL NOT NULL PRIMARY KEY,
    email VARCHAR(50) NOT NULL,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    postcode VARCHAR(50),
    skillset VARCHAR(50),
    looking_for VARCHAR(50),
    linkedin VARCHAR(50)
    );
