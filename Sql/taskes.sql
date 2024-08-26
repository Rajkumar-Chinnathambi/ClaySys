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

/*    ========Alter table structure ======*/
-- add coloumn into login_info table
alter table login_info add  islogin bit;

--show alter table after add new column
exec sp_help login_info;

--remove column from login table
alter table login_info drop column islogin;

--view for user_name,password from login_info
create view showloginusers as select user_name,user_password from login_info;

--using view table
select * from showloginusers;