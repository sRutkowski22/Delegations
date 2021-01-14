
insert into account_login (id, email, firstname, lastname, password) values (1,'admin1@gmail.com', 'Uthred', 'Ragnarson', '$2y$12$zFURP9ov.Gq35jHlhYMZDufkilTPUyFCzdZrPSepWr34n5/gqLiTK  ');
insert into access_level (id,active, level_name, account_id) values  (1,true,'WORKER',1);
insert into access_level (id,active, level_name, account_id) values  (2,true,'ACCOUNTANT',1);
insert into access_level (id,active, level_name, account_id) values  (3,true,'ADMIN',1);