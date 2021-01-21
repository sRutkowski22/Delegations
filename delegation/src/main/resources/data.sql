
insert into account_login (id, email, firstname, lastname, password) values (1,'admin1@gmail.com', 'Uthred', 'Ragnarson', '$2a$10$./akRJ4Esj2.PwkJkzSnBOUb5wN/5Iu6Sa0o0motodjY2GuVOENoK');
insert into access_level (id,active, level_name, account_id) values  (1,false,'WORKER',1);
insert into access_level (id,active, level_name, account_id) values  (2,false,'ACCOUNTANT',1);
insert into access_level (id,active, level_name, account_id) values  (3,true,'ADMIN',1);
insert into account_login (id, email, firstname, lastname, password) values (2,'accountant1@gmail.com', 'Uthred', 'Ragnarson', '$2a$10$hj6tqDc5LbYAvrFaWC5ANeRNck3jynVcU4/GXqwuW1IoffVlLSeY6');
insert into access_level (id,active, level_name, account_id) values  (4,false,'WORKER',2);
insert into access_level (id,active, level_name, account_id) values  (5,true,'ACCOUNTANT',2);
insert into access_level (id,active, level_name, account_id) values  (6,false,'ADMIN',2);
insert into account_login (id, email, firstname, lastname, password) values (3,'worker@gmail.com', 'Uthred', 'Ragnarson', '$2a$10$2Z/UbcFVMzVc/WMfmTf4buBSoBSweQhzmq922i0RPAZNvg/mIZeJm');
insert into access_level (id,active, level_name, account_id) values  (7,true,'WORKER',3);
insert into access_level (id,active, level_name, account_id) values  (8,false,'ACCOUNTANT',3);
insert into access_level (id,active, level_name, account_id) values  (9,false,'ADMIN',3);
insert into delegation(id,leaving_country_date,crossing_home_border_date,delegation_number, delegation_verified,delegation_end_date,guaranteed_accommodation,guaranteed_domestic_breakfast,guaranteed_domestic_dinner,guaranteed_domestic_supper,guaranteed_foreign_breakfast,guaranteed_foreign_dinner,guaranteed_foreign_supper,private_car,delegation_start_date, advance_payment, sum,account_id) values (1,null,null,'eac557b7-449e-4799-9b21-7d070874a176',false,'21-01-20 12:00',false,true,false,false,false,false,false,true,'21-01-20 08:00',0,200,3);
insert into delegation(id,leaving_country_date,crossing_home_border_date,delegation_number,delegation_verified,delegation_end_date,guaranteed_accommodation,guaranteed_domestic_breakfast,guaranteed_domestic_dinner,guaranteed_domestic_supper,guaranteed_foreign_breakfast,guaranteed_foreign_dinner,guaranteed_foreign_supper,private_car,delegation_start_date, advance_payment, sum,account_id) values (2,null,null,'afa59007-4a92-40ad-91c3-02c5df174b3d',false,'21-01-23 12:00',false,true,false,false,false,false,false,true,'21-01-24 08:00',0,400,3);
insert into delegation_route (id,location,delegation_id) values (1,'Lodz',1);
insert into delegation_route(id,location,delegation_id) values (2,'Warsaw',1)
