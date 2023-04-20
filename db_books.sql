-- ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '12345678';
-- REVOKE ALL PRIVILEGES, GRANT OPTION FROM 'your_username'@'localhost';
-- OR
-- DROP USER 'your_username'@'localhost';


CREATE SCHEMA `db_library_dev`;

CREATE TABLE db_library_dev.books(
	id varchar(10),
    title varchar(100),
    publisher varchar(20),
    year varchar(4),
    PRIMARY KEY (`id`)
);

CREATE TABLE db_library_dev.branches(
	id varchar(10),
    name varchar(50),
    address varchar(100),
    PRIMARY KEY (`id`)
);

CREATE TABLE db_library_dev.copies(
	branch_id varchar(10),
    book_id varchar(10),
    available int,
    copy_number int,
    PRIMARY KEY(branch_id, book_id),
    FOREIGN KEY (branch_id) REFERENCES branches(id),
    FOREIGN KEY (book_id) REFERENCES books(id)
);

CREATE TABLE db_library_dev.authors(
    name varchar(50),
    age varchar(4),
    PRIMARY KEY (name, age)
);

CREATE TABLE db_library_dev.books_authors(
	book_id varchar(10),
    author_name varchar(50),
    author_age varchar(4),
    FOREIGN KEY (book_id) REFERENCES db_library_dev.books(id),
    FOREIGN KEY (author_name, author_age) REFERENCES db_library_dev.authors(name, age)
);

INSERT INTO db_library_dev.books (id, title, publisher, year) VALUES ("QF2020001", "Quản Lý Thời Gian Thông Minh Của Người Thành Đạt: Bí Quyết Thành Công Của Triệu Phú Anh", "Fahasa", "2020")

-- SELECT * FROM db_library_dev.books;

-- SELECT TABLE_NAME 
-- FROM INFORMATION_SCHEMA.TABLES
-- WHERE TABLE_TYPE = 'BASE TABLE' AND TABLE_SCHEMA='db_library_dev'

-- DROP SCHEMA db_library_dev;