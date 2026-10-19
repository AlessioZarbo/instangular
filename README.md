# Instangular

Instangular è una piccola applicazione web realizzata con Angular. Il progetto riproduce una semplice interfaccia social in cui è possibile consultare una lista di post, cercare contenuti per titolo o per tag e visualizzare il profilo di un utente con i post pubblicati.

Il progetto è stato sviluppato con l'obiettivo di applicare alcuni concetti fondamentali di Angular:

- organizzazione del codice in moduli e componenti;
- separazione tra pagine, componenti riutilizzabili, servizi e modelli;
- navigazione tramite Angular Router;
- gestione dei dati asincroni tramite `HttpClient` e RxJS;
- utilizzo di Reactive Forms per la ricerca;
- tipizzazione dei dati tramite interfacce TypeScript;
- progettazione di un'interfaccia responsive e accessibile.

## Indice

1. [Presentazione rapida](#presentazione-rapida)
2. [Funzionalità](#funzionalità)
3. [Tecnologie utilizzate](#tecnologie-utilizzate)
4. [Struttura del progetto](#struttura-del-progetto)
5. [Spiegazione della gerarchia](#spiegazione-della-gerarchia)
6. [Architettura e flusso dei dati](#architettura-e-flusso-dei-dati)
7. [Scelte progettuali](#scelte-progettuali)
8. [Avvio del progetto](#avvio-del-progetto)
9. [Test e build](#test-e-build)
10. [Limiti attuali e sviluppi futuri](#limiti-attuali-e-sviluppi-futuri)
11. [Traccia per la presentazione orale](#traccia-per-la-presentazione-orale)

## Presentazione rapida

L'applicazione presenta una pagina Home e una pagina Profilo. La Home carica i post da un'API esterna e li mostra come card. Sopra le card è presente una barra di ricerca che permette di filtrare i risultati in base al titolo e ai tag.

La barra di navigazione inferiore contiene due tab:

- **Home**, che porta alla rotta `/homepage`;
- **Profilo**, che porta alla rotta `/profile`.

La pagina Profilo mostra i dati dell'utente, il numero di post pubblicati e i post associati all'utente con ID `1`.

## Funzionalità

### Home

- recupero dei post tramite API;
- visualizzazione dei post in card;
- visualizzazione di titolo, testo, tag, autore, numero del post e visualizzazioni;
- immagine associata a ogni post tramite `picsum.photos`;
- ricerca per testo nel titolo;
- filtro per uno o più tag;
- messaggio alternativo quando non sono presenti risultati.

### Profilo

- visualizzazione del nome e cognome dell'utente;
- avatar generato usando le iniziali;
- identificativo dell'utente;
- conteggio dei post pubblicati;
- visualizzazione dei post dell'utente;
- messaggio alternativo quando l'utente non ha post.

### Navigazione

La navigazione è gestita da Angular Router. La rotta sconosciuta viene reindirizzata automaticamente alla Home, così l'utente non rimane su una pagina inesistente.

## Tecnologie utilizzate

- **Angular 21**: framework principale dell'applicazione;
- **TypeScript**: linguaggio utilizzato per componenti, servizi e modelli;
- **Angular Router**: gestione delle rotte;
- **Angular HttpClient**: comunicazione con l'API esterna;
- **RxJS**: gestione degli Observable e dei dati asincroni;
- **Reactive Forms**: gestione della barra di ricerca;
- **Angular Material**: icone Material utilizzate nella navbar;
- **CSS**: stile dei componenti, layout responsive e stati interattivi;
- **DummyJSON**: API utilizzata per ottenere i post;
- **Picsum Photos**: servizio utilizzato per le immagini delle card.

## Struttura del progetto

```text
Instangular-2/
├── angular.json
├── package.json
├── package-lock.json
├── README.md
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.spec.json
├── public/
└── src/
	├── index.html
	├── main.ts
	├── styles.css
	└── app/
		├── app-module.ts
		├── app-routing-module.ts
		├── models/
		│   ├── post-model.ts
		│   └── user-model.ts
		├── pages/
		│   ├── pages-module.ts
		│   ├── home-page/
		│   │   ├── home-page-module.ts
		│   │   └── overview/
		│   │       ├── overview.ts
		│   │       ├── overview.html
		│   │       ├── overview.css
		│   │       └── overview.spec.ts
		│   └── profile/
		│       ├── profile-module.ts
		│       └── profile/
		│           ├── profile.ts
		│           ├── profile.html
		│           ├── profile.css
		│           └── profile.spec.ts
		├── root/
		│   ├── app.ts
		│   ├── app.html
		│   └── app.css
		├── services/
		│   ├── post-service/
		│   │   ├── post-service.ts
		│   │   └── post-service.spec.ts
		│   └── user-service/
		│       ├── user-service.ts
		│       └── user-service.spec.ts
		└── shared/
			├── shared-module.ts
			├── navbar/
			│   ├── navbar.ts
			│   ├── navbar.html
			│   ├── navbar.css
			│   └── navbar.spec.ts
			├── post/
			│   ├── post.ts
			│   ├── post.html
			│   ├── post.css
			│   └── post.spec.ts
			└── search-bar/
				├── search-bar.ts
				├── search-bar.html
				├── search-bar.css
				└── search-bar.spec.ts
```

## Spiegazione della gerarchia

### File di configurazione principali

- `angular.json`: configura il workspace Angular, i comandi di build, il server di sviluppo, gli asset e i test;
- `package.json`: contiene gli script npm e le dipendenze del progetto;
- `package-lock.json`: blocca le versioni effettivamente installate delle dipendenze;
- `tsconfig.json`: configurazione generale di TypeScript;
- `tsconfig.app.json`: configurazione TypeScript specifica dell'applicazione;
- `tsconfig.spec.json`: configurazione TypeScript utilizzata dai test.

### `src/main.ts`

È il punto di ingresso dell'applicazione. Utilizza `platformBrowser()` per avviare `AppModule` nel browser.

### `src/index.html`

È il documento HTML principale. Contiene il tag `<app-root>`, cioè il punto in cui Angular monta il componente radice, e il riferimento al font Material Icons utilizzato da `mat-icon`.

### `src/styles.css`

È il file dedicato agli stili globali. Gli stili specifici sono invece collocati vicino ai relativi componenti, per mantenere il codice più ordinato.

### `app/`

Contiene tutta la logica applicativa. La suddivisione interna segue il ruolo dei file, non il tipo di tecnologia utilizzata.

### `root/`

Contiene il componente radice `App`.

- `app.ts`: definisce il componente root;
- `app.html`: contiene il `router-outlet` e la navbar globale;
- `app.css`: è disponibile per eventuali stili specifici del contenitore principale.

Il `router-outlet` è il punto in cui Angular inserisce il componente associato alla rotta corrente. La navbar è fuori dal `router-outlet`, quindi rimane visibile mentre cambia la pagina.

### `app-module.ts`

È il modulo principale dell'applicazione. Importa:

- `BrowserModule`, necessario per l'esecuzione nel browser;
- `AppRoutingModule`, che contiene le rotte;
- `PagesModule`, che raccoglie le pagine;
- `SharedModule`, che raccoglie i componenti riutilizzabili.

Inoltre avvia l'applicazione tramite `App` nella proprietà `bootstrap`.

### `app-routing-module.ts`

Definisce le rotte principali:

```ts
{ path: 'homepage', component: Overview }
{ path: 'profile', component: Profile }
{ path: '**', redirectTo: 'homepage' }
```

La rotta `**` è una rotta di fallback: intercetta qualsiasi URL non riconosciuto e riporta l'utente alla Home.

### `pages/`

Contiene le pagine vere e proprie dell'applicazione. Una pagina rappresenta una schermata o una sezione raggiungibile tramite routing.

#### `pages-module.ts`

È un modulo aggregatore. Importa `HomePageModule`, `ProfileModule` e `SharedModule`, mantenendo il modulo principale più leggibile.

#### `home-page/`

Contiene la funzionalità della Home. `HomePageModule` dichiara il componente `Overview` e importa `SharedModule` per poter utilizzare la barra di ricerca e la card dei post.

#### `profile/`

Contiene la funzionalità del profilo. `ProfileModule` dichiara il componente `Profile` e importa `SharedModule` per riutilizzare la card dei post.

### `shared/`

Contiene componenti condivisi da più pagine:

- `Navbar`: navigazione comune tra Home e Profilo;
- `SearchBar`: ricerca e filtro dei post;
- `Post`: rappresentazione grafica riutilizzabile di un singolo post.

#### Perché usare `SharedModule`?

`SharedModule` evita di dichiarare gli stessi componenti in più moduli. Un componente Angular può essere dichiarato una sola volta, quindi il modulo condiviso rappresenta un punto centrale in cui dichiarare, importare ed esportare gli elementi riutilizzabili.

In questo progetto `SharedModule` importa anche `ReactiveFormsModule` per la ricerca e `MatIconModule` per le icone Material. Esporta `Navbar`, `SearchBar` e `Post`, rendendoli disponibili ai moduli delle pagine.

Questa scelta porta diversi vantaggi:

- riduce la duplicazione;
- rende esplicita la riusabilità dei componenti;
- facilita la manutenzione;
- mantiene separati i componenti comuni dalla logica specifica di una pagina.

### `models/`

Contiene le interfacce TypeScript che descrivono la forma dei dati:

- `PostModel`: definisce ID, titolo, testo, autore, tag, reazioni e visualizzazioni;
- `UserModel`: definisce ID, nome e cognome dell'utente.

Le interfacce non contengono logica. Servono a documentare il contratto dei dati e a ricevere errori durante lo sviluppo se si utilizzano proprietà non previste.

### `services/`

Contiene i servizi responsabili dell'accesso e della gestione dei dati.

#### `PostService`

È un servizio singleton grazie a `providedIn: 'root'`. Si occupa di:

- chiamare `https://dummyjson.com/posts`;
- trasformare la risposta API nella lista di `PostModel`;
- conservare i post completi in `_allPosts`;
- pubblicare i post visibili tramite `posts$`;
- raccogliere i tag disponibili;
- filtrare i post per titolo e tag;
- recuperare i post di uno specifico utente.

Il `BehaviorSubject` `_posts` conserva l'ultimo valore disponibile. Il componente non accede direttamente al subject privato, ma si iscrive all'Observable pubblico `posts$`. In questo modo il servizio controlla lo stato, mentre i componenti ricevono soltanto i dati necessari.

#### `UserService`

Fornisce i dati dell'utente mostrato nella pagina Profilo. Attualmente restituisce un oggetto mock con ID, nome e cognome. È stato mantenuto come servizio separato per permettere in futuro di sostituire facilmente il mock con una chiamata API reale.

## Architettura e flusso dei dati

### Avvio dell'applicazione

1. `main.ts` avvia `AppModule`.
2. `AppModule` carica `App`, il routing, i moduli delle pagine e il modulo condiviso.
3. `App` visualizza il `router-outlet` e la `Navbar`.
4. Il router sceglie il componente in base all'URL.

### Flusso della Home

1. L'utente apre `/homepage`.
2. Angular crea il componente `Overview`.
3. `Overview` si iscrive a `PostService.posts$`.
4. `Overview` invoca `PostService.getPosts()`.
5. `PostService` effettua la richiesta HTTP a DummyJSON.
6. La risposta viene trasformata in `PostModel[]`.
7. Il servizio aggiorna il `BehaviorSubject`.
8. `Overview` riceve i dati e li passa a `app-post` tramite l'input `[post]`.

### Flusso della ricerca

1. L'utente scrive nella `SearchBar`.
2. Il valore viene gestito da un `FormControl` contenuto in un `FormGroup`.
3. `SearchBar` invoca `filterPost()`.
4. `PostService` normalizza il testo e applica i filtri sui dati già caricati.
5. Il servizio pubblica la nuova lista tramite `posts$`.
6. `Overview` riceve la lista aggiornata e aggiorna la vista.

### Flusso del Profilo

1. L'utente seleziona la tab Profilo.
2. `Navbar` usa `Router.navigate(['/profile'])`.
3. Angular visualizza `Profile` nel `router-outlet`.
4. `Profile` recupera i dati dell'utente da `UserService`.
5. `Profile` chiama `searchByUserId(1)` su `PostService`.
6. I post ricevuti vengono mostrati tramite il componente condiviso `Post`.

## Scelte progettuali

### Separazione delle responsabilità

Ogni parte dell'applicazione ha un compito specifico:

- i componenti gestiscono la presentazione e l'interazione con l'utente;
- i servizi gestiscono dati e chiamate HTTP;
- i modelli descrivono la struttura dei dati;
- il router gestisce la navigazione;
- i moduli organizzano le dipendenze.

Questa separazione evita di inserire chiamate HTTP e logica di filtro direttamente nei template o nei componenti di presentazione.

### Riutilizzo dei componenti

La card `Post` viene usata sia nella Home sia nel Profilo. Invece di duplicare HTML e CSS, il componente riceve un oggetto tramite `@Input()`:

```html
<app-post [post]="post"></app-post>
```

Questo significa che la pagina decide quali dati mostrare, mentre `Post` decide come rappresentare visivamente un singolo elemento.

### Observable e BehaviorSubject

La lista dei post può cambiare dopo una ricerca o un filtro. Per questo il servizio espone un Observable. I componenti rimangono in ascolto e la vista si aggiorna quando il servizio pubblica un nuovo valore.

### Reactive Forms

La barra di ricerca utilizza un `FormGroup` e un `FormControl`. Questa soluzione separa il valore del campo dall'HTML e permette di estendere in futuro il form con validazione, debounce o altri filtri.

### Accessibilità

Sono presenti diversi accorgimenti:

- `aria-label` sulla navbar e sulle azioni iconografiche;
- titoli sui pulsanti della navigazione;
- elementi semantici come `main`, `section`, `article`, `header` e `footer`;
- testi alternativi per le immagini;
- intestazioni collegate alle sezioni tramite `aria-labelledby`;
- stati di focus visibili sui pulsanti della navbar.

### Angular Material

Angular Material viene utilizzato in modo mirato per le icone della navbar. `MatIconModule` è importato in `SharedModule`, perché la navbar è un componente condiviso. Il font Material Icons è caricato in `src/index.html`.

## Avvio del progetto

### Prerequisiti

- Node.js installato;
- npm installato;
- connessione Internet, necessaria per DummyJSON, Picsum Photos e il font Material Icons.

### Installazione

Dalla cartella principale del progetto:

```bash
npm install
```

### Server di sviluppo

```bash
npm start
```

L'applicazione sarà disponibile normalmente all'indirizzo:

```text
http://localhost:4200
```

È possibile aprire direttamente:

- `http://localhost:4200/homepage`
- `http://localhost:4200/profile`

## Test e build

### Build di produzione

```bash
npm run build
```

Il comando compila l'applicazione e genera i file nella cartella `dist/Instangular`.

### Test

```bash
npm test
```

Nel progetto sono presenti test spec per i componenti principali e per i servizi. I test verificano almeno la corretta creazione delle unità e rappresentano il punto di partenza per aggiungere test comportamentali più completi.

### Altri comandi

```bash
npm run watch
```

Esegue una build in modalità sviluppo e ricompila automaticamente quando cambiano i file.

## Limiti attuali e sviluppi futuri

Il progetto è una base didattica funzionante, ma può essere esteso in diversi modi:

- sostituire `UserService.getMokkedUserDetails()` con un endpoint reale;
- aggiungere autenticazione e gestione dell'utente connesso;
- aggiungere paginazione o caricamento progressivo dei post;
- aggiungere un debounce sulla ricerca per evitare un filtro a ogni pressione di tasto;
- usare una gestione degli errori HTTP con messaggi dedicati;
- aggiungere stati di caricamento durante le richieste;
- permettere la creazione, modifica e cancellazione dei post;
- aggiungere test per routing, filtri, chiamate HTTP e rendering dei dati;
- sostituire il caricamento esterno del font Material Icons con una soluzione locale se l'app dovesse funzionare offline;
- introdurre una gestione più completa dello stato se il numero di funzionalità dovesse crescere.

## Traccia per la presentazione orale

### Introduzione

> Ho realizzato Instangular, una piccola applicazione web sviluppata con Angular. L'idea è riprodurre una semplice applicazione social con una Home contenente una lista di post, una ricerca e una pagina Profilo.

### Struttura generale

> Ho organizzato il progetto separando le pagine dai componenti condivisi, dai servizi e dai modelli. Questa divisione permette di mantenere ogni parte focalizzata su una responsabilità e rende il progetto più facile da estendere.

### Moduli

> Il modulo principale è `AppModule`. Al suo interno importo il routing, il modulo delle pagine e il modulo condiviso. `PagesModule` raccoglie i moduli della Home e del Profilo, mentre `SharedModule` raccoglie i componenti riutilizzabili come navbar, barra di ricerca e card dei post.

### Routing

> Il routing definisce due rotte principali: `/homepage` e `/profile`. Il componente `App` contiene un `router-outlet`, che è il punto in cui Angular inserisce la pagina attiva. La navbar rimane fuori dal router outlet, quindi è sempre visibile. Ho anche aggiunto un redirect per gli indirizzi non validi.

### Servizi e API

> La logica dei post è concentrata in `PostService`. Il servizio chiama DummyJSON tramite `HttpClient`, trasforma la risposta in modelli tipizzati e pubblica i dati con un `BehaviorSubject`. I componenti non gestiscono direttamente le chiamate HTTP: ricevono i dati attraverso l'Observable `posts$`.

### Ricerca

> La ricerca è realizzata con Reactive Forms. `SearchBar` contiene un `FormGroup` con un campo per il termine di ricerca. Quando l'utente scrive o seleziona un tag, il componente delega il filtro a `PostService`, che aggiorna la lista pubblicata. In questo modo la Home si aggiorna senza dover ricaricare la pagina.

### Componenti condivisi

> Ho creato il componente `Post` perché la stessa card viene usata nella Home e nel Profilo. Il componente riceve il post tramite `@Input()`. Ho usato `SharedModule` per dichiarare una sola volta i componenti riutilizzabili ed esportarli verso i moduli che ne hanno bisogno.

### Profilo

> La pagina Profilo recupera i dettagli dell'utente da `UserService` e i post da `PostService`. Il servizio utente restituisce attualmente dati mock, mentre i post vengono recuperati dall'endpoint filtrato per user ID. La struttura è già predisposta per sostituire il mock con una chiamata API reale.

### Tipizzazione

> Le interfacce `PostModel` e `UserModel` descrivono la forma dei dati. Questo rende il codice più leggibile e permette a TypeScript di segnalare errori quando una proprietà viene usata in modo errato.

### Material e accessibilità

> Per le icone della navbar ho utilizzato Angular Material con `MatIconModule`. La navbar contiene solo le azioni Home e Profilo e i pulsanti hanno label accessibili. Ho inoltre usato elementi HTML semantici, testi alternativi per le immagini e attributi ARIA dove servono.

### Conclusione

> Il risultato è un'applicazione piccola ma organizzata secondo responsabilità separate. Il passo successivo sarebbe collegare anche i dati dell'utente a un backend reale, aggiungere gestione degli errori e aumentare la copertura dei test.

## Licenza

Questo progetto è stato realizzato a scopo didattico.
