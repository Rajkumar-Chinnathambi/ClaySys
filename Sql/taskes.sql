/*    ========   Basic Queries      ======*/
--1.create table 
create table login_info(
	userId int primary key identity(101,1),
	user_name varchar(50) not null unique,
	user_password varchar(50) not null
);

--show table structure
exec sp_help login_info;

-- insert data into login_info
insert into login_info(user_name,user_password) values
	('Sawyer Alexander','XNV56MDB5BX'),
	('Shelby Burton','LJB63PZG7KT'),
	('Chiquita Duffy','HNY75JEU5OI'),
	('Bruno Fitzpatrick','SDM87NXF4OU'),
	('Cyrus Spence','XNF86QRQ1NA');

--show table values
select * from login_info;

--update username using id
update login_info set user_name='Rajkumar' where userId=101;

--after update show updated row
select * from login_info where userId = 101;

--delete row using userid
delete from login_info where userId=105;

-- after deleting userId 105 remaining data's
select * from login_info;

--not 
select * from login_info where not userId =103;

/*    ========   Alter table structure      ======*/

-- add coloumn into login_info table
alter table login_info add  islogin bit;

--show alter table after add new column
exec sp_help login_info;

--remove column from login table
alter table login_info drop column islogin;


/*    ========   View     ======*/

--view for user_name,password from login_info
create view showloginusers as select user_name,user_password from login_info;

--using view table
select * from showloginusers;



/*  ========== Tasks   ================================  */


--CREATE SIGNUP TABLE 
CREATE TABLE SignUp(
	userid INT PRIMARY KEY IDENTITY(1,1),
	first_name VARCHAR(50) NOT NULL,
	last_name VARCHAR(50) NOT NULL,	
	address VARCHAR(150),
	);

-- INSERT VALUES INTO SIGNUP TABLE
INSERT INTO SignUp(first_name,last_name,address) VALUES
	('RAJ','KUMAR','KRISHNAGIRI'),
	('SIVA','ANBU','SIVAGANGAI'),
	('JAGAN','NATHAN','DHARMAPURI'),
	('KRISHNA','KUMAR','THENI');

CREATE TABLE LoginUp(
	userid INT NOT NULL,
	username VARCHAR(50) NOT NULL UNIQUE,
	user_pwd VARCHAR(50) NOT NULL,
	FOREIGN KEY (userid) REFERENCES SignUP(userid)
	);
--RENAME COLUMN NAME
EXEC sp_RENAME 'LoginUp.Uuser_pwd', 'user_pwd', 'COLUMN';
--SHOW TABLE STRUCTURE
EXEC sp_help 'dbo.LoginUp';  


INSERT INTO LoginUp(userid,username,user_pwd) VALUES
	(1,'RAJ','KRISHNAGIRI123'),
	(2,'SIVA','SIVAGANGAI123'),
	(3,'JAGAN','DHARMAPURI123'),
	(4,'KRISHNA','THENI123');






SELECT L.userid,S.first_name,S.last_name,L.username,L.user_pwd,S.address FROM SignUp S,LoginUp L WHERE S.userid=L.userid;

--top
SELECT TOP 2 * from LoginUp;


--CREATE PROCEDURE [ SHORT NAME  FOR BIG SQL COMMAND ]  

CREATE PROCEDURE showusers 
AS
BEGIN
SELECT L.userid,S.first_name,S.last_name,L.username,L.user_pwd,S.address FROM SignUp S,LoginUp L WHERE S.userid=L.userid ;
END

--EXCUTE PROCEDURE_NAME
EXEC showusers;

--UPDATE 
UPDATE LoginUp SET username='RAJU' WHERE userid=1;

--DELET 
DELETE FROM LoginUp WHERE USERID=4;

--CREATE EMPLOYEE TABLE
CREATE TABLE EMPLOYEE(
	SNO INT IDENTITY(1,1),
	EMPID INT NOT NULL PRIMARY KEY,
	E_NAME VARCHAR(50) NOT NULL,
	E_SAL INT NOT NULL,	
	E_ADDRESS VARCHAR(150),
);

--INSERT DETAILS INTO EMPLOYEE TABLE
INSERT INTO EMPLOYEE(EMPID,E_NAME,E_SAL,E_ADDRESS) VALUES
	(101,'RAJ',200000,'KRISHNAGIRI'),
	(102,'RAMESH',100000,'KARNATAKA'),
	(103,'MALAR',200000,'KARNATAKA'),
	(104,'SHIVAPRIYA',250000,'KRISHNAGIRI'),
	(105,'DEVASRI',500000,'KRISHNAGIRI');





SELECT MIN(E_SAL) [MIN SAL],E_ADDRESS [PLACE] FROM EMPLOYEE GROUP BY E_ADDRESS;
--HAVING CLAUSE
SELECT MIN(E_SAL) [MIN SAL],E_ADDRESS [PLACE] FROM EMPLOYEE GROUP BY E_ADDRESS HAVING E_ADDRESS='KRISHNAGIRI';


--LEFT JOIN FOR SIGNUP AND LOGINUP TABLES
SELECT * FROM SignUp S LEFT JOIN LOGINUP L ON S.SNO=L.USERID;
--RIGHT JOIN FOR SIGNUP AND LOGINUP TABLES
SELECT * FROM SignUp S RIGHT JOIN LOGINUP L ON S.SNO=L.USERID;

--REMOVE USERID COLUMN FROM SIGNUP TABLE
ALTER TABLE SignUp DROP COLUMN USERID;
--SHOW TABLE STRUCTURE
EXEC sp_help 'dbo.SignUp';  

--Like function
SELECT * FROM SignUp WHERE first_name Like '_a%';


--CREATE VIEW
CREATE VIEW EMPDETAILS AS SELECT E_NAME,E_SAL FROM EMPLOYEE;
--USE VIEW
SELECT * FROM EMPDETAILS;


--FIND NUMBER OF EMPLOYEES BASED ON PLACE
SELECT E_ADDRESS [EMPLOYEE ADDRESS],COUNT(*) [TOTAL EMPLOYEE] FROM EMPLOYEE GROUP BY E_ADDRESS

--FIND SECOND HIGHEST SALARY
SELECT MAX(E_SAL) [SECOND HGH SALARY] 
FROM EMPLOYEE 
WHERE E_SAL<(SELECT MAX(E_SAL) FROM EMPLOYEE);



/* ----======  Single Create Procedure ==============-----  */

--create store procedure for insert into login_info table
create procedure insertUser 
	@uname varchar(50),
	@upassword varchar(50)
as
begin 
	insert into login_info(user_name,user_password) values(@uname,@upassword)
end

--execute insert create procedure command
exec insertUser 'raju','Rajkumar123';

--create procedure for update login_info
create procedure updateLoginInfoUser
	@userId int,
	@username varchar(50),
	@password varchar(50)
as
begin
	update login_info set user_name=@username,user_password=@password where userId = @userId

end

exec updateLoginInfoUser 106,'RajBoi','RajuBoi123'

--create procedure for delete row from login_info using  user id
create procedure deleteLoginInfoUser
	@userId int
as
begin
	delete from login_info where userId = @userId
end

exec deleteLoginInfoUser 106


--CREATE PROCEDURE FOR INSERT VALUES INTO EMPLOYEE TABLE
CREATE PROCEDURE CREATEUSER
(
 @EMPID INT,
 @E_NAME VARCHAR(50),
 @E_SAL INT,
 @E_ADDRESS VARCHAR(150)
)
AS
BEGIN
	
	SET NOCOUNT ON;
	INSERT INTO EMPLOYEE(EMPID,E_NAME,E_SAL,E_ADDRESS) VALUES(@EMPID,@E_NAME,@E_SAL,@E_ADDRESS)
END;

EXEC CREATEUSER @EMPID=1006,@E_NAME='SURESH',@E_SAL=500000,@E_ADDRESS='DHARMAPURI';

--CREATE PROCEDURE FOR UPDATE EMPID USING EMP NAME
CREATE PROCEDURE UPDATEUSER 
(
	 @empidINT,
	 @E_NAME VARCHAR(50)
)
AS
BEGIN
	UPDATE EMPLOYEE SET EMPID=@EMPID WHERE E_NAME=@E_NAME
END;

EXEC UPDATEUSER @EMPID=106,@E_NAME='SURESH';


--change table name [exec sp_rename 'oldtable name','new table name']
exec sp_rename 'loginInfo','login_info';

--remove unique constraint
alter table LoginUp drop constraint [UQ__LoginUp__F3DBC572029F9E85];

alter table LoginUp add unique(username);


--pivot table create
create table pivotTable(
	pitem varchar(50),
	area varchar(50),
	price int,
	salteDate date
	);

insert into  pivotTable(pitem,area,price,salteDate) values
	('shop a','slm',200,'2020-02-22'),
	('shop b','slm',400,'2020-02-22'),
	('shop c','slm',800,'2020-02-22'),
	('shop a','dpi',200,'2020-02-22'),
	('shop b','dpi',300,'2020-02-22'),
	('shop c','slm',100,'2020-02-22'),
	('shop d','slm',200,'2020-02-22');

-- third high value 1st method
select min(price) [3rd high value] from (select DISTINCT top 2  price from pivotTable where price < (select max(price) from pivotTable) order by price desc) as source;
-- third high value 2nd method
select min(price) as [3rd high value] from (select distinct top 3 price from pivotTable order by price desc) as source;
--pivot
select * from pivotTable;
select * from (select pitem,area,price from pivotTable) as source 
pivot
(sum(price) for area in([kgi],[slm],[dpi])) as pivotedTable


--unpivot
select * from 
(
select * from (select pitem,area,price from pivotTable) as source 
pivot
(sum(price) for area in([kgi],[slm],[dpi])) as pivotedTable) as source 
unpivot
(price for area in([kgi],[slm],[dpi])) as unpivotedTables

