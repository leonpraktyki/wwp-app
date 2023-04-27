# Wyszukaj w pobliżu

#### Stack

- React.js
- Koa.js
- PostgreSQL

---

Instalacja front-endu:

- `cd wwp-front-end`
- `npm install`
- `npm run dev`

Instalacja back-endu:

- `cd wwp-back-end`
- `npm install`
- `node server.ts`

Instalacja bazy danych:

- Pobierz plik z danymi OSM dla regionu Polska z https://download.geofabrik.de/europe/poland.html
- Użyj narzędzia `osm2pgsql` aby przekształcić plik OSM do bazy danych PostgreSQL
- Zainstaluj rozszerzenie PostGIS
- W folderze `wwp-back-end` utwórz plik `.env` i dodaj do niego zmienną `DATABASE_URL`
