pornire frontend:
- cd frontend/bugs-app
- npm start
pornire backend:
- cd backend
- node/nodemon index.js

Backend:
pachete folosite:
- body-parser -> pt parsarea bodyului requestului si responsului (ca sa nu mai faci JSON.parse, JSON.stringify)
- cors -> in caz ca vrei sa testezi aplicatia si altfel decat pe localhost (aici sunt multe de zis, cors e un standard caruia trebuie sa i se supuna orice http request care trece de localhost)
- express -> librarie standard pt construit apiuri in nodejs.
- mysql2 -> necesar pt sequelize
- sequelize -> ORM (practic un query-builder mai smecher) pentru nodejs.

modelele bazei de date (in ./models): User, Team, Project, Commit, Bug
in index.js gasesti toate asocierile dintre tabele.
Userul face parte dintr-o echipa, echipa are mai multe proiecte. Fiecare proiect e alcatuit din mai multe commituri. Un commit poate avea unul sau mai multe buguri. Bugul e asociat de 2 ori cu commitul: odata pentru ca bugul este al unui commit (descoperi un bug la un commit) si a doua oara pentru rezolvarea unui bug se face cu un alt commit.
rutele apiului (in ./routes). o sa vorbesc despre ele pe parcurs, in partea de frontend.
flow: -app.js da require la toate rutele si .use() la fiecare pe pathul potrivit (users.js pe /users, commits.js pe /commits etc);
E destul de straight backendul, nimic special.



Frontend:
pachete folosite:
-axios -> pt http requests. (axios.get, axios.post etc)
-react-router-dom -> ca sa integrez routing in aplicatie.

cum urmaresti frontendul:
de sine-statatoare sunt config.js (doar export hostul acolo, ca sa nu scriu la fiecare request axios.get('localhost:5000/ceva'), scriu axios.get(`${host}/ceva`)) si history.js, unde se apeleaza o functie dintr-un pachet default din react (createBrowserHistory). functia asta iti intoarce un obiect care te ajuta sa navighezi intre rutele aplicatiei programatic (exemplu: la apasarea unui buton, vrei sa mergi de pe pagina de login pe pagina de register).
In App.js am construit Routerul. Sunt 4 componente viewuri (pagini): Register, Login, Home si Set-Team, fiecare cu ruta corespunzatoare (/login, /home, /set-team, /register). Nimic special aici, Routerul se face la fel pt orice aplicatie.
In folderul ./components sunt toate componentele (si cele care sunt pagini si cele mai micute). O sa iau fiecare componenta-pagina in parte si o sa explic ce se intampla.

Register: e un form de register standard. Am decis ca la register sa se seteze rolul userului (MP sau TST). In functie de rolul ales, aplicatia va fi diferita (se va comporta si va arata diferit pt un TST fata de pentru un MP). Am cate o metoda handler pt fiecare input/select: Cand se scrie ceva in inputul de email, se apeleaza emailChanged(event) si se seteaza in this.state noua valoare si la fel pt toate celelalte.
Jos e un <Link/> (componenta default exportata de react-router-dom) catre pagina de login (componenta <Login/>)
La apasarea butonului register se apeleaza handleRegister(), se face un httpRequest cu axios catre backend pe /users/register. Daca nu apar probleme (daca emailul introdus nu mai exista, daca backendul nu e oprit etc), se face inregistrarea userului si se navigheaza (cu history, de care ziceam mai sus) catre pagina de login.

Login: similar cu Register cu handlere pentru emailChanged si passwordChanged. Simetric, are un <Link/> catre componenta Register. La apasarea butonului de login se apeleaza handleLogin(), care face un http request (cu axios) la backend, pe ruta /users/login. Daca credentialele sunt corecte, backendul raspunde cu userul pe care l-a cautat in baza de date. Frontendul (clientul) seteaza in localStorage datele userului (datele proprii).
localStorage e o variabila speciala, globala a browserului si iti permite sa accesezi anumite variabile oriunde te-ai afla in cadrul aplicatiei (de exemplu daca imi definesc o variabila in componenta Login, eu nu o pot folosi in componenta Register. Dar daca o setez in localStorage, am access la ea din orice componenta). Se seteaza deci in localStorage idul, emailul, rolul, echipa si daca userul e alocat la rezolvarea unui bug sau nu. Dupa se navigheaza (cu history) catre urmatoarea componenta. Daca userul face parte dintr-o echipa, se navigheaza pe /home. Daca nu, se navigheaza pe /set-team.

Set-Team: Userul poate ajunge pe componenta asta doar daca nu se afla deja intr-o echipa. Aici poate fie sa isi creeze o echipa si sa devina membru al ei, fie sa se alature unei echipe deja existente. Se face un http request catre backend ca se obtina toate echipele si se afiseaza in pagina. daca apasa pe Join in dreptul unei echipe, se apeleaza metoda joinTeam(), care face un alt httpRequest catre /users/team, unde backendul updateaza userul curent pe coloana team_id cu id-ul echipei corespunzatoare. Daca userul vrea sa creeze o echipa, se apeleaza submitCreateTeam(), unde se face un httpRequest pe /host/teams, iar backendul creeaza echipa cu numele dat de utilizator si ii seteaza lui team_idul echipei nou creeate.
Dupa ce utilizator isi seteaza o echipa (in oricare din cele 2 moduri), ajunge pe pagina de Home.


Home:
 Se face un get (tot httpRequest) catre /users/:id (daca e userul 1, se face pe /users/1, daca e userul 2, se face pe /users/2). In ruta asta, serverul selecteaza din baza de date niste informatii despre echipa respectiva: membrii echipei, care pot fi vazuti la click pe numele echipei si proiectele echipei. Jocul asta cu expand la click e facut de mai multe ori in cadrul aplicatiei pentru ca era o aplicatie prea micuta pentru a face mai multe pagini, ar fi fost prea goale. Asa ca am ales metoda asta cu expand la click pe o chestie (super simplu, ma joc cu niste variabile boolean si afisez sau ascund anumite chestii).
in metoda de render o sa vezi ca am folosit componenta Redirect din react-router-dom. Practic daca userul ajunge cumva pe pagina asta fara sa aiba o echipa setata(de exemplu daca scrie urlul de mana), il redirectez catre pagina de setare echipa. Am mapat fiecare proiect din raspunsul backendului intr-o componenta noua, ProjectDetails. ProjectDetails e un wrapper. Componenta ProjectDetails poate fi ori un ProjectDetailsMP, ori un ProjectDetailsTST (in functie de rolul userului). e destul de simplu sa intelegi daca te uiti in metoda render() din ProjectDetails, am doar un if-else. Sub toate proiectele echipei, apare un mic form de adaugare proiect nou. Userul introduce numele proiectului, apasa butonul si se apeleaza handleAddProject(), unde se face un post(httpRequest) catre /teams/:id/projects. De exemplu, daca userul se afla in echipa cu idul 3, se face un post pe localhost:5000/teams/3/projects. In ruta asta, serverul face un insert in baza de date cu noul proiect, setandu-i proiectului ca team_id idul acestei echipe.
Cum ziceam, daca userul e un MP, fiecare proiect, in momentul in care se da click pe el, se transforma intr-un ProjectDetailsMP. Daca userul e TST, la click pe proiect obtii un ProjectDetailsTST.



ProjectDetailsMP:
un projectDetailsMp e o lista de commituri. Fiecare commit are link, mesaj si eventual o lista buguri. La click pe Bugs se face toggle la bugurile commitului respectiv. Bugurile sunt randate in pagina prin componenta Bug. Daca sunt MP, pot sa imi atribui (aloc) rezolvarea unui bug (un singur bug la un moment dat). Dupa ce mi l-am atribuit, pot sa il rezolv, dupa care raman iar fara niciun bug nealocat, deci imi pot atribui altul. Pretty easy. In componenta Bug, toate functionalitatile sunt realizate de catre componentele parinte. De exemplu: Cand se apasa pe Solve, componenta Bug apeleaza onSolve, dat ca props din parintele ei, ProjectDetailsMP, care la randul ei apeleaza onSolve dat ca props din ProjectDetails. Abia aici se face request la backend si se fac modificarile aferente (se seteaza userul ca fiind nealocat din nou, se seteaza commitului de rezolvare al bugului prin update la baza de date).
Cand isi atribuie un bug, celelalte buguri nu mai pot fi atribuite (se seteaza booleanul user.alocated pe true si in baza de date si in localStorage).



ProjectDetailsTST
similara cu ProjectDetailsMP, doar ca pentru un tester. Testerul nu poate adauga commituri, nu isi poate atribui sau rezolva buguri. Poate doar sa adauge buguri la commituri. (practic cosmarul oricarui developer). La fel ca la ProjectDetailsMP, functionalitatile sunt pasate catre parinte pana la ProjectDetails, care face requesturile la backend, iar backendul modifica baza de date corespunzator (adauga bugul respectiv, setand alocatedUser si solvedCommit pe null, pentru ca bugul nu are momemtan niciun student alocat si evident nici nu a fost rezolvat inca prin niciun commit).


*!*!*!* Sintaxa pe care s-ar putea sa nu o cunosti:
const { x } = obj <=> const x = obj.x;
const obj1 = {...obj2, otherKey: 10} <=> se face deep copy la obj2 in obj1 si se adauga si cheia otherKey cu valoarea 10.
const arr1 = [...arr2] <=> deep copy la arr2 in arr1.
(deep copy doar pe primul nivel. daca una din chei e un alt obiect, iar acel obiect are o cheie care e un alt obiect, se schimba treaba). *!*!*!*