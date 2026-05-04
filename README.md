# Stackul utilizat

    Better-SQLite si NodeJS (express.js)

# Cheile API

    Localizeaza documentul .env_example si redenumestel in .env
    Inlocuieste continutul dintre ghilimele cu codul la cheia API

# Cum lucreaza programul

1. User Input este transformat in vector, 
2. Vectorul este comparat cu vectorii la ideile deja existe din aceasi categorie si sunt extrase din DB 3 cele mai asemanatoare idei dupa vector
3. Acele 3 idei impreuna cu User Input este trimis catre AI pentru comparare (1-Unic, 2-Duplicat, 3-eroare de cenzura sau idei radicale, 4-Text random, nu la tema, nefinalizat )


# Problemele abordata

1. Foarte des studentii cer sa se organizeze mai multe activitati extracuriculare, dar cand ele se organizeaza foarte putini participa
2. Parerile  studentilor pe scara larga poate fi obtinuta momentan doar prin formulare,dar alcatuirea si completarea acestora dureaza saptamani

# De ce acest proiect este solutia

Noi credem ca studentii au dreptate, dar nu sunt intrebati ce anume ei doresc. In procesul de identificare si alegere a evenimentelor, consideram ca este important sa le putem oferi studentilor ocazia de a propune sau a se alatura la initiativa de prpunere a unei idei noi.

# Nota importanta

Desi acest proiect este focusat pe faculatea de Matematica si Informatica, asemenea proiect poate fi implementat si in paginile web ale altor facultati din universitate sau chir altor universitati

# Functionalitati principale

# Promovarea ideilor proprii
1. Studentii pot propune sugestii, veni cu initiative si raporta probleme
2.  Sistem de apreciere, prin care studentii pot sustine ideile
3.   Lista de idei - ideile cele mai apreciate sunt afisate primele in lista de idei, este important de mentionat ca o idee poate ajunge pe primele locuri, daca au mai mult de 10 apreciere, restul ideilor vor fi plasate intr-o lista mai simpla si compacta
4.   Doar studentii USM, folosind emailul universtitatii cu usm.md
5. Administratorul pot aprecia de asemene ideile publicate de studenti (vor fi marcate prin stea si ridicate la nivel inalt)
6. Administratorul poate publica o idee
7. Administratorul poate crea formulare pentru studenti sau voting polls

# Idei pentru viitor

[*] Administratorii pot afisa evenimentele, care se apropie pe baza la o idee existenta 
[*] Administratorii pot vizualiza date statistici cu creatorii si studentii, care au apreciat o idee anumita (Nume, Prenume,Facultate, An, Specialitate)
[*] Statistici pe baza interactionarii studentilor cu formulare si idei

# Echipa Hackathon
Sorin Grajdian, Petrache Iulian si Chilimciuc Tristan
