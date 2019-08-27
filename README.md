# portalen-craco

Frontend-application og now node backend servicer for backend.

## Generelt om koden

### Backend servicer

* Se api-mappen i repo, alle requester til /api mot now-instans routes inn i api-mappen, se now.json

### Frontend kode

Er altså en react-app med følgende hovedkomponenter:

* [react-app-rewired](https://github.com/timarney/react-app-rewired) - Bruker create-react-app under skallet med lar enn tilpasse webpack/babel konfig slik at man kan bruke hot-reloading via [react-hot-loader](https://github.com/gaearon/react-hot-loader)
* [redux](https://github.com/reduxjs/redux) for global state og useState for lokale behov
* [react-router](https://github.com/ReactTraining/react-router) for routing
* [material-ui](https://github.com/mui-org/material-ui) for komponenter

## Utvikle lokalt

### Med `now dev`

Oppdatert din `.env` fil med riktig info, se `.env-local` for påkrevede env-variabler. Merk at de fleste av env-variablene er for backend servicene.

Merk at `now dev` ennå ikke fungerer så gått i forhold til å redigere frontend-app med hot-reload osv, så det egner seg best når man skal teste at backend servicene fungerer.

### Med `npm start`

Man må først har gjort en deploy med `now` til en url, også bruker man [Proxy funksjonen i CRA](https://create-react-app.dev/docs/proxying-api-requests-in-development) for å sende alle /api requester til en kjørene instans hos now. Så legg inn url slik i din `.env` fil:

```
REACT_APP_LIVEURL=https://portalen-craco.gerhardsletten.now.sh
```

Deretter kjører men `npm start` (nettleser vil åpne automatisk) og kan jobbe med hot-reloads av siden.

## Auth-oppsett

Når en ny bruker kommer inn er løpet slik:

* Klient-applikason starter og gjør et kall mot `/api/auth?baseDomain=www.domene.no`, i servicen skrives det da en `baseDomain` og en `nounce` cookie som da kan brukes av andre backend-servicer ved retur fra auth-service
* Deretter videresender klient-applikasjon bruker til `api/auth` og denne vil sende bruker over til auth-tjeneste for å logge inn
* Etter vellykket innlogging sendes bruker tilbake til `/api/callback` hvor authentisering valideres, og nødvendig brukerdata samles og pakkes inn i jwt-token, bruker blir da videresendt til `/loadauth/<token>` som blir fanget opp i frontend-applikasjon igjen
* Her lagres token i localstorage og blir tilgjenneliggjort i react-applicasjon via context, som da vil rendre den innloggede visningen (se `src/containers/App/AppUser.js`), og token blir sendt med i api-spørringer, se `src/Root.js` og `src/helpers/Apiclient.js`

Ved neste gangs besøk vil lagret token (fra localstorage) brukes og innhold lastes som etter login over.
