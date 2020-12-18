
insert into account_login (id, email, firstname, lastname, password) values (1,'admin1@gmail.com', 'Uthred', 'Ragnarson', '$2y$12$gkgFot8k.AchxpMP0sTL6OnuFAC24ln4KelcN1qgoqq9Ha/0GXt8S ');
insert into access_level (id,active, level_name, account_id) values  (1,true,'worker',1);
insert into access_level (id,active, level_name, account_id) values  (2,true,'accountant',1);
insert into access_level (id,active, level_name, account_id) values  (3,true,'admin',1);