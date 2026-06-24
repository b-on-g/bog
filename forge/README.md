# forge

## Dev

```bash
cd /path/to/mam && npm start
# Open http://localhost:9080/bog/forge/app/-/test.html
```

## Build

```bash
npx mam bog/forge
```

## Docker

```bash
docker compose up --build
# Open http://localhost:8080
# Bots → http://localhost:3334 (SEO prerender)
```

## Deploy

Push to `main` → GitHub Actions → GitHub Pages: https://bog.github.io/forge/

Feature branches deploy to: https://bog.github.io/forge/{branch-name}/

## REST API ($mol_server + node:sqlite)

Backend in `bog/forge/api/` — `$bog_forge_api extends $mol_server`. Single shared TS type `$bog_forge_item` lives in `bog/forge/item/item.ts` and is imported by both the REST handler (return type) and the frontend (response type).

Storage: `node:sqlite` (built-in to Node.js 22+, no extra dependency). DB file: `bog/forge/api/forge.sqlite`.

### Endpoints

- `GET /api/items` → `$bog_forge_item[]`
- `POST /api/items` body `{title, body}` → `$bog_forge_item`
- `DELETE /api/items/<id>` → `{ok: true}`

### Run

```bash
npx mam bog/forge/api
node bog/forge/api/-/node.js
# default port 9092, override: FORGE_API_PORT
# default db path: bog/forge/api/forge.sqlite, override: FORGE_DB_PATH
```

## SEO ($bog_seo)

Pathname-router (`$bog_builderui_router.activate()`) активирован в `app.view.ts`. URL формы `/path/key=value` вместо `#!key=value`. Dev-режим (`/-/test.html`) остаётся на хеш-роутере автоматически.

Meta (`<title>`, `<meta description>`, `<meta og:*>`, `<link rel=canonical>`) объявляется в `meta()` и инжектится в head через `$bog_meta_attr` + crawler.

### Локально

```bash
# Поднять собранный app как static (после `npx mam bog/forge`)
npx serve -s bog/forge/app/- -l 9090

# Поднять SEO сервис на :3334
BOG_SEO_UPSTREAM=http://localhost:9090 \
BOG_SEO_WARMUP=true \
node bog/seo/-/node.js

# Эндпоинты
curl http://localhost:3334/sitemap.xml
curl http://localhost:3334/robots.txt
curl http://localhost:3334/llms.txt
curl -A "Googlebot" http://localhost:3334/
```

### Dump-режим (для CI)

```bash
BOG_SEO_UPSTREAM=http://localhost:9090 \
BOG_SEO_DUMP_DIR=bog/forge/app/-/_seo \
BOG_SEO_CANONICAL_BASE=https://bog.github.io/forge \
node bog/seo/-/node.js
```

В CI workflow это уже подключено под тег `v*`.

## Desktop (Tauri)

Tag `v*` triggers Tauri build via GitHub Actions.
