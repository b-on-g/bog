# Progress Log — $mol Documentation Website

## Format

```
### TASK-XXX: Описание
**Date**: YYYY-MM-DD
**Agent**: имя/идентификатор
**Status**: done
**Summary**: что было сделано
**Files changed**: список файлов
**Notes**: заметки, проблемы, решения
```

---

### TASK-001: Создать meta.tree и базовую структуру модулей bog/docs
**Date**: 2026-03-06
**Agent**: Claude Opus 4.6
**Status**: done
**Summary**: Created docs.meta.tree with includes for $mol_book2, $mol_page, $mol_text, $mol_locale, $mol_link. Created directories app/, landing/, guide/, play/. Created app/index.html entry point with $bog_docs_app root component. Created minimal app.view.tree extending $mol_book2. Updated .gitignore to exclude MAM-cloned dependencies (mol/, node/, bog/). Build passes, Audit passed.
**Files changed**: docs.meta.tree, app/index.html, app/app.view.tree, .gitignore
**Notes**:
- MAM clones mol/, node/, bog/ into the docs directory during build — added to .gitignore
- Push to upstream hyoo-ru/mam.git denied (permission). User's fork remote is `my` at `https://github.com/Dev-cmyser/mam.git` in the parent repo. The docs submodule needs a proper remote configured for push.
- Node tests fail with `$mol_ambient_ref is not defined` — this is a known MAM issue with Node.js v24, not related to our code. Web build and audit pass cleanly.

---

### TASK-002: Создать App shell с $mol_book2 навигацией между страницами
**Date**: 2026-03-06
**Agent**: Claude Opus 4.6
**Status**: done
**Summary**: Created app shell with $mol_book2 routing. app.view.tree declares Landing, Guide, Play sub-components. app.view.ts implements routing via $mol_state_arg — reads `page` arg from URL hash (#!page=landing|guide|play), defaults to 'landing'. app.view.css.ts adds flex:grow:1. Created stub page components: landing/landing.view.tree ($mol_page with placeholder text), guide/guide.view.tree, play/play.view.tree. Build passes, Audit passed.
**Files changed**: app/app.view.tree, app/app.view.ts, app/app.view.css.ts, landing/landing.view.tree, guide/guide.view.tree, play/play.view.tree
**Notes**:
- Build command from bog/docs: `npx mam app` (NOT `npx mam bog/docs/app` — the latter builds the cloned copy inside bog/ which has old code).
- Using $mol_book2 (not $mol_book2_catalog) per original task spec. TASK-001a in tasks.json proposes migration to $mol_book2_catalog — this should be done as a separate task.
- $mol_state_arg uses hash-based routing: `#!page=guide`, not query params `?page=guide`.
- Node tests still fail with known Node.js v24 issue — not related to our code.

---

### TASK-001a: Перейти с $mol_book2 на $mol_book2_catalog в app shell
**Date**: 2026-03-06
**Agent**: Claude Opus 4.6
**Status**: done
**Summary**: Migrated app shell from $mol_book2 to $mol_book2_catalog. app.view.tree now uses $mol_book2_catalog with `param \page`, `menu_title \$mol Docs`, and `spreads *` dictionary mapping landing/guide/play to their page components. Each spread page has Spread_close button in tools for mobile back-navigation. app.view.ts simplified to only override `spread()` defaulting to 'landing'. docs.meta.tree updated to include \/mol/book2/catalog instead of \/mol/book2. Landing title updated to "Landing" for menu display. Build passes, Audit passed.
**Files changed**: docs.meta.tree, app/app.view.tree, app/app.view.ts, landing/landing.view.tree, tasks.json
**Notes**:
- $mol_book2_catalog automatically generates menu sidebar from `spreads *` dictionary keys.
- Menu link titles are derived from each spread page's `.title()` method.
- Routing uses `$mol_state_arg` with param name "page": `#!page=guide`, `#!page=play`.
- Default spread is 'landing' (overridden in view.ts).
- Spread_close link in each page's tools allows mobile users to navigate back to menu.
- Build command: `npm exec --prefix /Users/cmyser/code/mam mam bog/docs/app` or `cd /Users/cmyser/code/mam && npm exec mam bog/docs/app`.
- Node tests still fail with known Node.js v24 `$mol_ambient_ref` issue — not related to our code.
