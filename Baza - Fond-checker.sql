use master;
go
drop database if exists ZavrsniradFondovi;
go
create database ZavrsniradFondovi collate Croatian_CI_AS;
go
use ZavrsniradFondovi;

create table Fond (
sifra int not null primary key identity(1,1),
naziv varchar (100) not null,
iznos_sredstava decimal (20,2),
broj_projekata int,
u_provedbi_do datetime
);


create table Javni_poziv (
sifra int not null primary key identity(1,1),
naziv varchar (100) not null,
iznos_sredstava decimal (20,2),
stopa_sufinanciranja int,
traje_do datetime,
fond int references fond(sifra)
);


create table Projekt (
sifra int not null primary key identity(1,1),
javni_poziv int references Javni_poziv(sifra),
iznos_sredstava decimal (20,2),
stopa_sufinanciranja int,
u_provedbi bit,
korekcije decimal (18,2),
manager varchar (50),
provedbeno_tijelo varchar (100)
);

select * from Fond;

insert into Fond (naziv,iznos_sredstava,broj_projekata,u_provedbi_do) 
values
('Europski socijalni fond','4000000000.00','350','2024-12-31 23:59'),
('Fond za poljoprivredu','6000000000.00','700','2024-12-31 23:59'),
('Fond za digitalnu tranziciju','10000000000.00','900','2024-12-31 23:59');

select * from Javni_poziv;

insert into Javni_poziv (naziv,iznos_sredstava,stopa_sufinanciranja,traje_do,fond)
values
('Smanjenje siromaštva','50000000.00','85','2025-12-31 23:59','4'),
('Poboljšanje socijalnih prava','50000000.00','90','2026-12-31 23:59','3')

select * from Projekt;

insert into Projekt (javni_poziv,iznos_sredstava,stopa_sufinanciranja,u_provedbi,korekcije,manager,provedbeno_tijelo)
values
('2','100000.00','85','0','10000.00','Pero Periæ','Ministarstvo socijalnog rada'),
('2','250000.00','60','20','40000.00','Ivan Iviæ','Ministarstvo socijalnog rada'),
('3','80000.00','70','0','5000.00','Pero Iviæ','Hrvatski zavod za mirovinsko osiguranje');