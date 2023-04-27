USE master;
ALTER DATABASE sql_injection SET SINGLE_USER WITH ROLLBACK IMMEDIATE;
DROP DATABASE sql_injection;
CREATE DATABASE sql_injection;
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

INSERT INTO users (username, password) VALUES ('adminstrator', 'admin@123');


CREATE TABLE keys (
	id INT PRIMARY KEY IDENTITY(1,1),
    accessKey varchar(10)
);

DECLARE @i int = 0;
WHILE @i < 10
BEGIN
    DECLARE @length int = FLOOR(RAND() * (6)) + 5; -- random length between 5 and 10
    DECLARE @accessKey varchar(10) = '';
    DECLARE @j int = 0;
    WHILE @j < @length
    BEGIN
        SET @accessKey = @accessKey + CHAR(FLOOR(RAND() * (123 - 97)) + 97); -- random lowercase letter
        SET @j = @j + 1;
    END
    INSERT INTO keys (accessKey) VALUES (@accessKey);
    SET @i = @i + 1;
END

DECLARE @i INT = 1;
DECLARE @randomString NVARCHAR(10) = '';
WHILE @i <= 10
BEGIN
    SET @randomString = @randomString + SUBSTRING('abcdefghijklmnopqrstuvwxyz', CONVERT(INT, RAND(CHECKSUM(NEWID())) * 26) + 1, 1);
    SET @i = @i + 1;
END
SELECT @randomString;