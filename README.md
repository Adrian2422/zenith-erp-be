# ZENITH ERP BE

Backend aplikacji Zenith ERP

### Spis treści

1. [Stack](#stack)
2. [Uruchamianie](#uruchamianie)
3. [GIT](#git)
4. [FAQ](#faq)

### Stack

- Nest.js `v.10.0.0`
- pg `v.8.11.5`
- Prisma ORM `v.5.13.0`
- Swagger `v.7.3.1`

### Uruchamianie

1. Dev 2. Instalacja zalezności `npm install` 3. Uruchomienie aplikacji `npm run start:dev`
2. Docker 5. Stworzenie pliku .env 6. `npm run docker:compose`

### Stawianie bazy

1. Tworzymy `.env`
2. Generujemy clienta prismy
3. W kontenerze postgres tworzymy bazę z nazwą `DB_NAME` (adres znajdujemy z pomocą `docker inspect <db_name>`)
4. Uruchamiamy migracje
5. Seedujemy, jeśli potrzeba

### GIT

### FAQ
