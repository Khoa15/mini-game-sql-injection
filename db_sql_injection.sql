CREATE TABLE users(
    id INT IDENTITY(1,1) PRIMARY KEY,
    username varchar(50),
    password varchar(50),
)
-- varchar is can be used by equal in where condition
-- text is can't be used by equal in where condition

INSERT INTO users (username, password)
VALUES ('alice', 'jkl159'),
       ('bob', 'qwe753'),
       ('charlie', 'bnm246'),
       ('dave', 'rty369'),
       ('eve', 'zxc987'),
       ('frank', 'uio321'),
       ('grace', 'asd654'),
       ('heidi', 'ghj123'),
       ('ivan', 'vbn456'),
       ('judy', 'fgh789');