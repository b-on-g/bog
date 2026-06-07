## $mol Getting Started

**Apps that work offline, sync without a backend, and weigh ~140 KB brotli with everything bundled.** Reactivity, storage, and UI come from a single stack — you focus on the app, not on wiring libraries together.

By the end of this guide you'll have a real $mol app with offline support, themes, and local storage — running locally and built with one command. About ten minutes if a terminal and editor are already at hand.

## What you'll get

A running app that already includes the things you usually bolt on later:

- installable as a PWA, works offline,
- local storage with conflict-free sync (no backend code on your side),
- light and dark themes with a toggle,
- client-side routing,
- a GitHub Action for deploying to Pages.

All of this comes from the scaffolder. After that, change one line and watch it recompute itself.

## What you'll need

- [Node.js](https://nodejs.org/) 24+ and `git`.

That's the whole list. The bundle only includes modules your code references. No one maintains `dependencies` by hand.

## Step 1. Bring up the workspace and dev server

```bash
git clone https://github.com/hyoo-ru/mam.git ./mam && cd mam
npm install && npm start
```

In the same terminal and process, start the Hyper Base:

<img width="767" height="618" alt="image" src="https://github.com/user-attachments/assets/025919b1-8aa5-46d8-b2bf-e24247f8da76" />

```bash
+ giper/baza/app/run port=9090
```

`mam` works as a monorepo workspace of independent modules. Your app lives in it as a couple of files in its own namespace, and the bundle only contains modules your code actually reached. The dev server at `http://localhost:9080` builds each bundle on demand.

## Step 2. Generate the app (one command)

From the `mam` folder, create the project. Pick your namespace and app name, for example `my/hello`:

```bash
npm create view-tree-lsp@latest my/hello -- --no-docker --no-tauri
```

The command creates a working app in `./my/hello/`:

```
my/hello/
├── app/
│   ├── index.html        # web entry point
│   ├── app.view.tree     # declarative component description
│   ├── app.view.ts       # behavior
│   ├── app.view.css.ts   # styles (typed CSS-in-TS)
│   ├── app.test.ts       # test
│   ├── app.meta.tree     # offline install
│   └── app.locale=en.json
├── store/
│   └── store.ts          # local storage
├── assets/logo.svg
└── .github/workflows/deploy.yml
```

The app is ready to run.

## Step 3. Open it

Go to **`http://localhost:9080/my/hello/app/`**. The first load takes a few seconds — the dev server builds JS and CSS for this module on the fly. After that, everything is incremental. You'll see an app with themes, a few screens, and working navigation, ready to live locally without a server.

> The scaffolder also prints a test runner URL (`…/app/-/test.html`) where you can watch the built-in test pass.

## What you got (and why it matters)

The scaffolder lays out a minimal *real* $mol app, and that's on purpose. It already has:

- **Local storage out of the box.** `store/store.ts` is built on a CRDT: state persists locally and merges cleanly between devices. No sync code on your side, no backend.
- The line `include \/mol/offline/install` in `app.meta.tree` wires in the PWA module. The app installs to a phone and keeps working without a network. Offline is just another module.
- A light/dark theme toggle and URL-driven navigation (`$mol_state_arg`) are already in place. Don't need them? Remove `Theme_toggle` from view.tree — it's gone from both the DOM and the bundle.
- Styles are typed: `app.view.css.ts` is CSS-in-TS, a typo fails at compile time.

## Make it reactive

Open `app/app.view.tree`, find the welcome text. Add an input bound to a property, and a line that depends on it:

```tree
home <= Home $mol_page
	title \Home
	body /
		<= Name $mol_string
			hint \Name
			value? <=> name? \
		<= Greeting $mol_text
			text <= greeting \
```

Then in `app/app.view.ts`, describe `greeting` as a function of `name`:

```typescript
greeting() {
	const name = this.name()
	return name ? `Hi, ${name}!` : ''
}
```

Try typing. The greeting updates by itself. You didn't subscribe to the field, you didn't schedule a rerender: `greeting` reads `this.name()`, so $mol records the dependency and recomputes just that value when `name` changes. The same reactive model runs through every layer, including data loading: a value that isn't ready yet "suspends" and slots in once it arrives. That's why async code reads like ordinary sync code.

## Set up the editor (a minute)

`view.tree` is indentation-sensitive, so editor support helps a lot:

- **VS Code**: install the [view.tree language plugin](https://marketplace.visualstudio.com/items?itemName=valikov.tree-language-service); use the `.editorconfig` plugin to get **tabs for indentation** and **LF line endings**.
- **Zed**: the [view.tree extension](https://zed.dev/extensions/viewtree) adds highlighting, go-to-definition, and autocomplete.
- The Zed extension is built on the [view.tree LSP](https://www.npmjs.com/package/view-tree-lsp) and a [tree-sitter grammar](https://github.com/Dev-cmyser/tree-sitter-viewtree) — you can plug them into other editors too.

## Deploy

The scaffold already includes a GitHub Actions workflow: push to `main`, it builds and publishes to GitHub Pages. Feature branches get their own preview URL.

## Try it

Generate the app, turn the welcome screen into something you'd actually use, and put that into the generated store so it survives a page reload and runs offline. When you need the full set of building blocks (inputs, lists, charts, pickers), check the [module catalog](https://github.com/hyoo-ru/mam_mol) — every one with examples.

If you get stuck, there's a skill for AI coding agents that knows `view.tree` and can suggest how to do a specific thing:

```bash
npx skills add b-on-g/mol_skill --all -g
```
