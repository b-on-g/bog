# The Best Web Framework You've Never Heard Of

## [0:00] Intro (1 min)

Selling points:

- One app -> Web / Windows / macOS / Linux / Android / iOS + WebExtension
- Works offline, no internet needed
- Data syncs automatically when online, zero conflicts (CRDT)
- No server, no DB, no backups — all data on clients
- Auth happens instantly on first page load
- Local state + sync via Giper Baza
- Strong typing, real-time sync, end-to-end encryption
- A website that behaves like a native app with zero server infrastructure

Show the final deployed result.

---

## [1:00] What is $mol (1 min)

- Declarative, automatic reactivity (no useState/useEffect)
- ~100KB bundle (vs React+Redux+Router 300KB+)
- Built-in: components, routing, themes, i18n
- CSS-in-TS (typed styles)
- MAM build system — zero config (no webpack/vite)

---

## [2:00] Install & run (1.5 min)

```bash
git clone https://github.com/hyoo-ru/mam.git ./mam && cd mam
npm install && npm star
```

- Dev server at `localhost:9080`
- MAM structure: folder = module, file name = purpose

---

## [3:30] Create app from richtemplate (3 min)

```bash
git clone https://github.com/USER/PROJECT.git my/app
```

Structure:

```
my/app/
  app/          index.html, app.view.tree, app.view.ts, app.view.css.ts, app.meta.tree
  button/       custom component + demo/
  logo/         logo with animation
  docs/         storybook ($mol_app_demo)
```

Find & replace:

1. `company_template` -> `my_app`
2. `company/template` -> `my/app`
3. `Lyumih/richtemplate` -> `USER/PROJECT`

Run, show it works.

---

## [6:30] Key files (2 min)

### view.tree

- `<=` one-way, `<=>` two-way, `/` list, `\` string, `@` i18n, `*` dict

### view.ts

- `@$mol_mem` — reactive cached property
- `@$mol_action` — state mutation
- Auto dependency tracking

### view.css.ts

- `$mol_style_define` — TS validates CSS
- `$mol_theme` — built-in themes

---

## [8:30] Deploy to GitHub Pages (1.5 min)

Show `deploy.yml`:

- `hyoo-ru/mam_build@master2` — builds the app
- `hyoo-ru/gh-deploy@v4.4.1` — deploys to gh-pages
- Push to master = auto deploy
- Settings -> Pages -> gh-pages branch

---

## [10:00] Giper Baza (3 min)

### Data model

- `$giper_baza_entity.with({ Name, Email, PhotoFile })` — that's the whole model, no REST, no backend

### Connect to UI

- `$giper_baza_glob.home().land().Data(...)` — get/create profile
- Read/write via `.val()` / `.val(next)`
- Avatar via `$giper_baza_file` -> `URL.createObjectURL(file.blob())`

### Demo

- Type name -> auto-saves
- Show profile ID
- Upload avatar
- Reload -> data persists
- Open second tab -> real-time sync

### Key transfer between browsers

- User = cryptographic key (not login/password), stored in localStorage
- Transfer: encrypt key with password -> generate link -> open in other browser -> enter password -> restored
- **TODO:** implement this feature

### Giper Baza facts (list, no demo)

- CRDT, offline-first
- Crypto auth, no backend needed
- Access levels: deny / read / post / pull / rule
- Proof-of-Work spam protection
- E2E encryption
- Real-time sync
- Every change signed by author

---

## [13:00] More $mol features (1 min, just list)

- `$mol_grid` — virtual tables
- `$mol_book2` — multi-page routing
- `$mol_form` — forms + validation
- `$mol_select`, `$mol_check`, `$mol_switch`, `$mol_calendar`
- `$mol_app_demo` — built-in storybook
- `@` localization with auto-generated translation files

---

## [14:00] Tauri (30 sec)

- Wrap $mol app into native desktop via Tauri
- CI/CD workflow builds for macOS / Windows / Linux
- Config: just set `frontendDist` path to the bundle

---

## [14:30] GLSL (15 sec)

- $mol supports GLSL shaders out of the box

---

## [14:45] Outro (15 sec)

- Links: mol.hyoo.ru, GitHub, Telegram @h_y_o_o
- richtemplate link
- Subscribe, more detailed videos coming

---

## Pre-recording TODO

- [ ] Prepare richtemplate
- [ ] Giper Baza demo data (profile + avatar)
- [ ] Test deploy workflow on clean repo
- [ ] Extract reusable GitHub workflows (deploy + Tauri)
- [ ] Implement key transfer via encrypted link
