# Instangular

## 1. Gerarchia dei file

Il progetto è organizzato in modo da separare la configurazione, le pagine, i componenti riutilizzabili, i servizi e i modelli dati.

```text
Instangular-2/
├── angular.json              # Configurazione del progetto Angular
├── package.json              # Dipendenze e comandi npm
├── README.md                 # Documentazione del progetto
├── public/                   # Risorse statiche
└── src/
    ├── index.html            # Pagina HTML principale
    ├── main.ts               # Punto di avvio dell'applicazione
    ├── styles.css            # Stili globali
    └── app/
        ├── app-module.ts     # Modulo principale
        ├── app-routing-module.ts
        │                         # Configurazione delle rotte
        ├── root/             # Componente principale dell'app
        │   ├── app.ts
        │   ├── app.html
        │   └── app.css
        ├── pages/            # Pagine raggiungibili tramite routing
        │   ├── pages-module.ts
        │   ├── home-page/
        │   │   ├── home-page-module.ts
        │   │   └── overview/ # Pagina Home
        │   └── profile/      # Pagina Profilo
        ├── shared/           # Componenti riutilizzabili
        │   ├── shared-module.ts
        │   ├── navbar/
        │   ├── search-bar/
        │   └── post/
        ├── services/         # Logica e accesso ai dati
        │   ├── post-service/
        │   └── user-service/
        └── models/           # Interfacce TypeScript
            ├── post-model.ts
            └── user-model.ts
```

La cartella `pages` contiene le schermate specifiche dell'applicazione. La cartella `shared` contiene invece elementi che possono essere utilizzati da più pagine. I `services` gestiscono i dati e le chiamate HTTP, mentre i `models` descrivono la struttura degli oggetti usati dall'applicazione.

## 2. Moduli Angular

Il progetto utilizza gli NgModule per organizzare le dipendenze.

### `AppModule`

È il modulo principale. Importa:

- `BrowserModule`, necessario per eseguire l'applicazione nel browser;
- `AppRoutingModule`, che contiene la configurazione del routing;
- `PagesModule`, che raccoglie le pagine;
- `SharedModule`, che raccoglie i componenti condivisi.

`AppModule` avvia il componente principale `App` tramite la proprietà `bootstrap`.

### `PagesModule`

È un modulo aggregatore che raccoglie:

- `HomePageModule`;
- `ProfileModule`;
- `SharedModule`.

In questo modo `AppModule` non deve conoscere nel dettaglio ogni singola pagina.

### `HomePageModule` e `ProfileModule`

Ogni pagina ha il proprio modulo. Questa scelta mantiene separata la logica della Home da quella del Profilo e rende più semplice aggiungere nuove funzionalità.

### `SharedModule`

Contiene e rende disponibili i componenti riutilizzabili:

- `Navbar`;
- `SearchBar`;
- `Post`.

Abbiamo usato `SharedModule` perché questi componenti non appartengono a una sola pagina. Ad esempio, `Post` viene utilizzato sia nella Home sia nel Profilo. Dichiarandolo una sola volta nel modulo condiviso evito duplicazioni e posso riutilizzarlo dove serve.

`SharedModule` importa anche:

- `CommonModule` per le funzionalità comuni di Angular;
- `ReactiveFormsModule` per la barra di ricerca;
- `MatIconModule` per le icone Angular Material della navbar.

## 3. RxJS e gestione dei dati

RxJS viene utilizzato per gestire dati asincroni e chiamate HTTP.

Il servizio principale è `PostService`. Quando viene aperta la Home, il servizio esegue una richiesta a:

```text
https://dummyjson.com/posts
```

La risposta viene convertita in una lista di `PostModel` tramite operatori RxJS come `map` e `tap`.

Il servizio utilizza un `BehaviorSubject` privato per conservare la lista dei post:

```ts
private _posts: BehaviorSubject<PostModel[]> =
  new BehaviorSubject<PostModel[]>([]);
```

All'esterno non viene esposto direttamente il subject, ma un Observable in sola lettura:

```ts
readonly posts$: Observable<PostModel[]> = this._posts.asObservable();
```

Questa scelta è importante perché il servizio mantiene il controllo sui dati, mentre i componenti possono soltanto osservarli.

Il flusso è quindi:

1. `Overview` si iscrive a `posts$`;
2. `Overview` chiama `getPosts()`;
3. `PostService` fa la richiesta HTTP;
4. la risposta viene trasformata in `PostModel[]`;
5. il `BehaviorSubject` pubblica la nuova lista;
6. `Overview` aggiorna la pagina.

Lo stesso meccanismo viene usato quando l'utente cerca un post: il servizio filtra i dati già caricati e pubblica una nuova lista. La Home riceve automaticamente il nuovo valore senza ricaricare la pagina.

## 4. Componenti

### `App`

È il componente principale dell'applicazione. Il suo template contiene:

- `router-outlet`, dove Angular inserisce la pagina attiva;
- `app-navbar`, che rimane sempre visibile.

### `Navbar`

È il componente di navigazione globale. Contiene due tab:

- Home;
- Profilo.

Al click utilizza `Router.navigate()` per cambiare rotta. È inserita fuori dal `router-outlet`, quindi non viene ricreata quando si cambia pagina.

### `Overview`

Rappresenta la Home. Si occupa di:

- richiedere i post al `PostService`;
- ascoltare l'Observable `posts$`;
- mostrare la barra di ricerca;
- creare una card per ogni post.

La card viene utilizzata così:

```html
<app-post [post]="post"></app-post>
```

### `Profile`

Rappresenta la pagina del profilo. Utilizza:

- `UserService` per ottenere i dati dell'utente;
- `PostService` per ottenere i post dell'utente con ID `1`.

Mostra nome, cognome, iniziali, numero di post e lista dei contenuti pubblicati.

### `SearchBar`

Gestisce la ricerca tramite Reactive Forms. Contiene un `FormGroup` con un `FormControl` per il termine inserito dall'utente.

Quando l'utente scrive o seleziona un tag, il componente chiama il metodo di filtro del `PostService`. La logica del filtro rimane quindi nel servizio e non nel template.

### `Post`

È la card riutilizzabile che rappresenta un singolo post. Riceve il dato tramite `@Input()` e mostra:

- titolo;
- testo;
- autore;
- tag;
- numero di visualizzazioni;
- immagine associata.

Questo componente evita di scrivere due volte la stessa struttura HTML nella Home e nel Profilo.

### Modelli

`PostModel` e `UserModel` sono interfacce TypeScript. Non visualizzano nulla e non contengono logica: descrivono semplicemente la forma dei dati e aiutano TypeScript a controllare il codice.

## 5. Routing

Il routing collega gli URL ai componenti da visualizzare:

```ts
const routes: Routes = [
  { path: 'homepage', component: Overview },
  { path: 'profile', component: Profile },
  { path: '**', redirectTo: 'homepage' },
];
```

Il comportamento è il seguente:

- `/homepage` visualizza `Overview`;
- `/profile` visualizza `Profile`;
- qualsiasi URL non riconosciuto viene reindirizzato a `/homepage`.

Il componente `App` contiene il tag `<router-outlet />`. Quando cambia l'URL, Angular sostituisce il contenuto del router outlet con il componente associato alla nuova rotta.

La navbar utilizza il router in questo modo:

```ts
this._router.navigate(['/homepage']);
this._router.navigate(['/profile']);
```

Questa navigazione non richiede il ricaricamento completo della pagina, perché Angular aggiorna soltanto il componente visualizzato.

## 6. Scelte progettuali

Abbiamo separato le responsabilità in questo modo:

- i componenti gestiscono la visualizzazione;
- i servizi gestiscono dati, API e filtri;
- gli Observable comunicano i cambiamenti ai componenti;
- i modelli descrivono la struttura dei dati;
- i moduli organizzano le dipendenze;
- il router gestisce la navigazione.

Questa struttura rende il progetto più leggibile e manutenibile. Se in futuro volessi sostituire l'API o aggiungere un backend reale, potrei intervenire principalmente sui servizi senza modificare tutti i componenti.

## 7. Avvio del progetto

```bash
npm install
npm start
```

L'applicazione sarà disponibile su:

```text
http://localhost:4200
```

Per compilare il progetto:

```bash
npm run build
```

Per eseguire i test:

```bash
npm test
```
