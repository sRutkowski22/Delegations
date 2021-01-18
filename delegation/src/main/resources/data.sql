
insert into account_login (id, email, firstname, lastname, password) values (1,'admin1@gmail.com', 'Uthred', 'Ragnarson', '$2a$10$./akRJ4Esj2.PwkJkzSnBOUb5wN/5Iu6Sa0o0motodjY2GuVOENoK');
insert into access_level (id,active, level_name, account_id) values  (1,false,'WORKER',1);
insert into access_level (id,active, level_name, account_id) values  (2,false,'ACCOUNTANT',1);
insert into access_level (id,active, level_name, account_id) values  (3,true,'ADMIN',1);
insert into account_login (id, email, firstname, lastname, password) values (2,'accountant1@gmail.com', 'Uthred', 'Ragnarson', '$2a$10$hj6tqDc5LbYAvrFaWC5ANeRNck3jynVcU4/GXqwuW1IoffVlLSeY6');
insert into access_level (id,active, level_name, account_id) values  (4,false,'WORKER',2);
insert into access_level (id,active, level_name, account_id) values  (5,true,'ACCOUNTANT',2);
insert into access_level (id,active, level_name, account_id) values  (6,false,'ADMIN',2);