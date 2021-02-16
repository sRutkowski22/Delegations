
insert into account_login (id, email, firstname, lastname, password) values (1,'admin1@gmail.com', 'Uthred', 'Ragnarson', '$2a$10$./akRJ4Esj2.PwkJkzSnBOUb5wN/5Iu6Sa0o0motodjY2GuVOENoK');
insert into access_level (id,active, level_name, account_id) values  (1,false,'WORKER',1);
insert into access_level (id,active, level_name, account_id) values  (2,false,'ACCOUNTANT',1);
insert into access_level (id,active, level_name, account_id) values  (3,true,'ADMIN',1);
insert into account_login (id, email, firstname, lastname, password) values (2,'accountant1@gmail.com', 'Uthred', 'Ragnarson', '$2a$10$S5fj2qG9u.UUNC7ZbqmqFOgLCRHnEChdT7PHo9DueEkvudCkb1foK');
insert into access_level (id,active, level_name, account_id) values  (4,false,'WORKER',2);
insert into access_level (id,active, level_name, account_id) values  (5,true,'ACCOUNTANT',2);
insert into access_level (id,active, level_name, account_id) values  (6,false,'ADMIN',2);
insert into account_login (id, email, firstname, lastname, password) values (3,'worker@gmail.com', 'Uthred', 'Ragnarson', '$2a$10$2Z/UbcFVMzVc/WMfmTf4buBSoBSweQhzmq922i0RPAZNvg/mIZeJm');
insert into access_level (id,active, level_name, account_id) values  (7,true,'WORKER',3);
insert into access_level (id,active, level_name, account_id) values  (8,false,'ACCOUNTANT',3);
insert into access_level (id,active, level_name, account_id) values  (9,false,'ADMIN',3);
insert into account_login (id, email, firstname, lastname, password) values (4,'worker2@gmail.com', 'Uthred', 'Ragnarson', '$2a$10$2Z/UbcFVMzVc/WMfmTf4buBSoBSweQhzmq922i0RPAZNvg/mIZeJm');
insert into access_level (id,active, level_name, account_id) values  (10,true,'WORKER',4);
insert into access_level (id,active, level_name, account_id) values  (11,false,'ACCOUNTANT',4);
insert into access_level (id,active, level_name, account_id) values  (12,false,'ADMIN',4);
insert into status(id,status_name) values (1,'submitted');
insert into status(id,status_name) values (2,'verified');
insert into status(id,status_name) values (3,'cancelled');
insert into status(id,status_name) values (4,'withdrawn');
insert into status(id,status_name) values (5,'draft');
insert into delegation(id,destination,leaving_country_date,crossing_home_border_date,delegation_number, status_id,delegation_end_date,guaranteed_accommodation,guaranteed_domestic_breakfast,guaranteed_domestic_dinner,guaranteed_domestic_supper,guaranteed_foreign_breakfast,guaranteed_foreign_dinner,guaranteed_foreign_supper,delegation_start_date, advance_payment, sum,account_id, distance, greater_than900cm3, home_transport_charge, foreign_allowance,note)
values
(1,'Delegation to Lodz',null,null,'eac557b7-449e-4799-9b21-7d070874a176',1,'21-01-20 12:00',false,true,false,false,false,false,true,'21-01-20 08:00',0,200.0,3,200, false, false, 60,'yas');
insert into delegation(id,destination,leaving_country_date,crossing_home_border_date,delegation_number,status_id,delegation_end_date,guaranteed_accommodation,guaranteed_domestic_breakfast,guaranteed_domestic_dinner,guaranteed_domestic_supper,guaranteed_foreign_breakfast,guaranteed_foreign_dinner,guaranteed_foreign_supper,delegation_start_date, advance_payment, sum,account_id, distance, greater_than900cm3, home_transport_charge, foreign_allowance,note)
values
(2,'Delegation to Warsaw',null,null,'afa59007-4a92-40ad-91c3-02c5df174b3d',2,'21-01-23 12:00',false,true,false,false,false,false,true,'21-01-24 08:00',0,400.0,3,0,false, false, 60,'no');
insert into delegation(id,destination,leaving_country_date,crossing_home_border_date,delegation_number,status_id,delegation_end_date,guaranteed_accommodation,guaranteed_domestic_breakfast,guaranteed_domestic_dinner,guaranteed_domestic_supper,guaranteed_foreign_breakfast,guaranteed_foreign_dinner,guaranteed_foreign_supper,delegation_start_date, advance_payment, sum,account_id, distance, greater_than900cm3, home_transport_charge, foreign_allowance,note)
values
(3,'Delegation to Warsaw',null,null,'afa59007-4a92-40ad-91c3-02c5df174b44',5,'21-01-23 12:00',false,true,false,false,false,false,true,'21-01-24 08:00',0,400.0,3,200,true, false, 60,'another note here');
insert into delegation_route (id,location,delegation_id) values (1,'Lodz',1);
insert into delegation_route(id,location,delegation_id) values (2,'Warsaw',1);
insert into rate(id,domestic_allowance,car_greater900_rate,car_lower900_rate)
values (1,30,0.8358,0.5214);

