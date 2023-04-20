USE sql_injection;

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

DROP TABLE sql_injection.dbo.users;

CREATE TABLE sql_injection.dbo.users (
	id INT IDENTITY(1,1) PRIMARY KEY,
    accessKey varchar(100)
);

DECLARE @i int = 0;
WHILE @i < 10
BEGIN
    DECLARE @length int = ROUND(RAND() * 99 + 1, 0);
    DECLARE @key varchar(100) = '';
    DECLARE @j int = 0;
    WHILE @j < @length
    BEGIN
        SET @key = @key + CHAR(ROUND(RAND() * 25 + 65, 0));
        SET @j = @j + 1;
    END
    INSERT INTO sql_injection.dbo.users (accessKey) VALUES (@key);
    SET @i = @i + 1;
END