# $bog_seo

SEO-сервер для ботов: prerender + crawler + sitemap + robots + llms + canonical/meta-инжект.

Для пользователей — прозрачный proxy к upstream. Только боты (по UA) получают prerendered HTML с инжекченными `<title>` / `<meta>` / `<link rel="canonical">`.

## Env-флаги

| Переменная | Default | Назначение |
|---|---|---|
| `BOG_SEO_PORT` | `3334` | Порт сервиса |
| `BOG_SEO_UPSTREAM` | `http://localhost:9080` | URL-источник (фронт) |
| `BOG_SEO_CACHE` | `true` | Кэшировать рендеры |
| `BOG_SEO_CACHE_TTL` | `3600000` | TTL кэша, ms |
| `BOG_SEO_WARMUP` | `false` | Прогнать crawl на старте |
| `BOG_SEO_MAX_DEPTH` | `10` | Глубина BFS |
| `BOG_SEO_MAX_PAGES` | `1000` | Лимит страниц |
| `BOG_SEO_CANONICAL_BASE` | — | Origin для `<link rel="canonical">` |

## Эндпоинты

- `GET /robots.txt` — robots с ссылкой на sitemap
- `GET /sitemap.xml` — sitemap из обнаруженных URLs
- `GET /llms.txt` — индекс для LLM-агентов (формат llmstxt.org)
- `GET /*` — бот → prerendered HTML; юзер → proxy к upstream

## Зависимости

- `bog/browser` — копия `$mol_browser` с фиксом типа `acceptInsecureCerts` (новый puppeteer)
- `bog/meta` — общий тип `$bog_meta_data` + helper для view + `$bog_meta_inject` для prerender

## Запуск

```bash
npx mam bog/seo
node bog/seo/-/node.js
```
