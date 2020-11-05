CREATE DATABASE founderfinder;

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

INSERT INTO signups WHERE email = '' (
    email,
    first_name,
    last_name,
    postcode,
    skillset,
    looking_for,
    linkedin)
 VALUES ('hello@ryanconnaughton', 'Ryan', 'Connaughton', 'NW3 2XB', 'Designer/Researcher', 'Dev', 'https://linkedin.com/r');

 UPDATE signups
 SET 
    column2 = $2, column2 = $3, column2 = $4, column2 = $5, column2 = $6, column2 = $7
WHERE email = $1;


UPDATE signups
     SET first_name = 'Ryan', last_name  = $3, postcode = $4, skillset = $5, looking_for = $6, linkedin = $7
WHERE email = $1;