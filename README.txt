Uruchomienie aplikacji:
Na początku należy wypakować zipa.

Pierwszym etapem jest stworzenie bazy danych.
1. Zainstalowanie PostgreSQL na komputerze.
2. Otworzenie terminalu w folderze Delegations.
3. W terminalu wpisanie komendy:
psql -f delegationsdump.sql -U postgres
Następnie wprowadzić hasło: admin.

Aby uruchomić aplikację z warstwą logiki biznesowej należy:
1. Uruchomić terminal w folderze Delegations/delegation
2. W terminalu wpisać komendę:
mvn spring-boot:run

Aby uruchomić aplikację z warstwą prezentacji(aplikacja frontend) należy:
1. Uruchomić terminal w folderze Delegations/delegation-react.
2. W terminalu wpisać komendę:
npm start

Aby obie aplikacje działały na komputerze musi być zainstalowana Java w wersji minimum 8 
oraz Node.js ze strony https://nodejs.org/en/download/.

Dane dostępowe:
konto z poziomem dostępu Admin:
email: admin1@gmail.com
hasło: deladmin1

konto z poziomem dostępu Accountant:
email: accountant1@gmail.com
hasło: delaccount

konto z poziomem dostępu Worker:
email: worker@gmail.com
hasło: delworker