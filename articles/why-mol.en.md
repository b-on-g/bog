## Why $mol?

TLDR — $mol comes with reactivity, local storage, offline, and themes all in one bundle. There are downsides, but they're almost all about community and tooling, not the code itself. You can live with them.

Let me start with those — feels more honest. No particular order.

There's no CDN build of $mol, the kind where you drop a single `<script src=...>` into HTML and start writing UI like you would with Vue. The class name in $mol is tied to its filesystem path (`$mol_button` lives in `mol/button/`), and the bundler builds the bundle from those paths. A CDN variant is theoretically possible, but someone would have to rewrite the bundler, and no enthusiast has stepped up.

Not enough "serious" public cases. Corporate apps exist but are hidden behind NDAs, leaving mostly demos and pet projects in public. From what I can show:

- [web.giper.dev](https://web.giper.dev/) — a product ecosystem ( Google-style ) by $mol's author.
- [b-on-g.github.io/blitz](https://b-on-g.github.io/blitz) — my real-time quiz built on $mol + Giper Baza. Took a long time, polished it a lot.

Not much built-in tooling. Working in $mol is pleasant, but only once you're already "in the know" — it's rough for newcomers, the IDE support is thin. VS Code has official extensions but no go-to-definition or syntax hints.

Error stack traces look genuinely awful)

<img width="2958" height="1832" alt="image" src="https://github.com/user-attachments/assets/aa09a9ff-0001-490e-9571-225b40e65ee8" />

*An error stack trace in $mol*

I don't know if this can be fixed, we need a volunteer) Attempts have been made, but it needs more time — basically the noise and duplication just need to be cleaned up. That said, debugging in the browser is pretty straightforward thanks to human-readable class names.

Some of the tooling I built myself:

1. LSP — `npm i -g view-tree-lsp@latest`, plus app scaffolding in one command: `npm create view-tree-lsp@latest bog/myapp -- --no-docker --no-tauri`.
2. [tree-sitter grammar](https://github.com/Dev-cmyser/tree-sitter-viewtree.git) for view.tree.
3. [Zed extension](https://zed.dev/extensions/viewtree) built on top of them, with working go-to-definition, highlighting, and other niceties. 30k downloads there — probably bots indexing everything for tests)

The great and dreadful view.tree ( the format for declaratively describing components ) I don't count as a drawback. Compare it with your first time seeing JSX, for example. view.tree just describes regular JS classes — in a way that makes the relationships between components easier to see and avoids boilerplate.

Plus — a nice separation of layers: view.tree is the abstraction over HTML, ts is the logic, css.ts is the styles. Less to get confused about. Here's a quick example:

<img width="1213" height="382" alt="Pasted image 20260401223034" src="https://github.com/user-attachments/assets/b515f349-015a-4fef-a1ee-218eb4048c78" />

*mol.hyoo.ru — tree playground*

You can see a base component ( a div by default, but it can be anything ) and its compiled JS form. You can override class methods in your `.ts`, or add new methods in either file.

Basically, all the problems described above come down to a small community and weak marketing. Well — volunteers needed!)

A more serious problem is npm integration. There are three ways to pull in a library right now:

- through a CDN — painless, but no types,
- download the lib into your repo and commit it,
- use the community tool for reproducible builds ( I haven't tried it myself, ask in [@mam_mol_development](https://t.me/mam_mol) ).

It just isn't native, it grates a bit. But the community keeps at it — there's ongoing work on the bundler.

<img width="848" height="848" alt="image" src="https://github.com/user-attachments/assets/1071adff-549c-44c1-9626-c76fc31e97d2" />


People also write to me with this one a lot:

> "There are no $mol jobs, and if there were, you couldn't find specialists."

Jobs, yes, almost none. But you can start a new project at your company or in a startup. And you don't need a "$mol specialist" — you need a TS developer who understands components and reactivity. The onboarding is 2–4 weeks, which is less than figuring out a stranger's React codebase with its Redux/Zustand/RTK/Tanstack zoo.

There's also plenty of design work you'll do from scratch, even though $mol has plenty of ready-made components. But once you build it, you can reuse those components across apps like a unified UI kit. Designer disputes guaranteed — beauty requires sacrifice :)

If design isn't a concern, you can throw together an interface very quickly from the available primitives — for an admin panel, for example.


What really needs serious work is the documentation and getting started. I think ( and many people write the same ) this is the main entry barrier right now. Good docs are hard to write, but necessary so people can pick things up faster and don't leave disappointed. I took a shot at this myself — wrote a [Getting Started](https://github.com/hyoo-ru/mam/blob/master/bog/articles/getting-started.en.md), from cloning mam to a working app with offline and sync. How well it turned out, you can judge)

About the toxic halo around $mol. A lot of people have run into hostile reactions under $mol posts — sometimes fair, sometimes not. The community itself is actually warm and friendly. Drop into [@giper_dev](https://t.me/giper_dev) (Russian-speaking), or better, come hang out in person at [@piterjs](https://t.me/piterjs). In person it's hard to stay toxic anyway :) I also run free intro sessions on $mol — DM me.

That's about it for the drawbacks. On to the upsides.

I'll start from a tangent. I was listening to a React-focused podcast recently and remembered how much manual tuning modern React needs. For every component with a heavy render you reach for `useTransition` or `useDeferredValue` to keep the UI from lagging on thousands of rows. And even if you add virtualization, it's virtualization only for that one component. In $mol all rendering is fully virtual: components outside the viewport physically don't exist, that "tuning" is hidden under the hood.

Compare the live Sierpinski Triangle demos by Karlovsky:

- [React](https://nin-jin.github.io/sierpinski/stack.html) — chokes during animation,
- [$mol](https://mol.js.org/perf/sierp/-/) — no stutter.

Same scenario, same hardware. [Sources for both demos](https://github.com/nin-jin/sierpinski).

And here's the standard [js-framework-benchmark](https://nin-jin.github.io/js-framework-benchmark/webdriver-ts-results/table.html), where Karlovsky added $mol — virtual rendering tears everything else apart, because components outside the viewport simply don't exist.

I had a burst of inspiration recently, wrote an earlier post about web components and put together a [benchmark](https://github.com/b-on-g/todomvc-compare) that counts lines of code:

<img width="883" height="336" alt="Pasted image 20260406235307" src="https://github.com/user-attachments/assets/c8ef7068-125a-4d80-9607-9d902575ae1f" />


Now about reactivity. Most reactive systems have the same edge case: one invalid value in the computation graph can drag along its neighbors, even ones that formally don't depend on it. I'll show it on [Svelte](https://svelte.dev/tutorial/svelte/numeric-inputs) because their own tutorial lets you try it hands-on.

We break {a}, and {b} falls over:

<img width="1580" height="1658" alt="image" src="https://github.com/user-attachments/assets/03258047-59b9-4931-a27f-e8dee0deb28f" />


{b} doesn't depend on {a} in the code, but the effect cascades. You can catch the same thing in most top frameworks — it's usually fixed with manual `try/catch` or by splitting things across components. When {a} comes back, the sum is recomputed.

Tell me in the comments: if you split this across components, is the behavior the same? And how do other frameworks deal with it? I took the case from [this video](https://youtu.be/6wYbYxBOuko?si=1yDEyRZB46Q5XJrz&t=515).

Now the same thing in [$mol](https://b-on-g.github.io/sum):

<img width="2034" height="1758" alt="image" src="https://github.com/user-attachments/assets/c21d3b33-d5e0-49cb-b529-5ed0296f3456" />

<img width="241" height="188" alt="Pasted image 20260402000509" src="https://github.com/user-attachments/assets/88f664f7-8c5a-4d37-bb34-a65bf2ab2fe8" />


*{b} is recomputed independently.*

<img width="420" height="376" alt="image" src="https://github.com/user-attachments/assets/03a68336-c4ef-462d-93ff-66da7b8325e4" />


*When {a} comes back, the sum is recomputed too.*

In $mol this problem is solved architecturally. Every getter is an isolated atom: if one fails, the others don't recompute and don't even know about it. No need to write try-catch, everything fixes itself without a reload. [A deeper look at reactivity](https://page.hyoo.ru/#!=vuypgx_v55bpt).


### OOP, but every method is an extension point

In $mol, reactivity isn't at the variable level — it's at the class method level. A getter automatically becomes a computed reactive cell: it reads data → records dependencies → recomputes when they change. No `useState`, `useMemo`, `useEffect`, or `$derived` — that's hidden under the hood.

Reusing a component means writing its name in view.tree. No copy-paste, no `npm install`, even across repos:

```tree
$my_dashboard $mol_page
	body /
		<= Chart $hyoo_crus_chart_pie
		<= Edit $bog_some_editor
```

This works because $mol modules are addressed by class name, and the mam bundler pulls in what it needs. The line between "your" code and "someone else's" code disappears.

### CSS in TS

I'm not great at CSS — that's my personal pain, I don't want to memorize a pile of rules. In $mol, styles are just a TS object with typed properties. Don't know a property? Just tab through autocomplete and it works) An AI assistant handles it well too — it can self-correct, which is genuinely convenient.

### Offline in one line

In `app.meta.tree` you write:

```
include \/mol/offline/install
```

That's it — the app installs as a PWA and runs offline. The manifest is assembled by the bundler.

### Localization

In view.tree you put `@` before a string:

```tree
$my_page $mol_page
	title @ \Hello, World!
```

view.tree is transpiled to JS, and this string becomes a method:

```typescript
/** title @ \Hello, World! */
title() {
	return $mol_locale.text( "$my_page_title" )
}
```

The en locale is extracted from default values automatically, and the key is built from the component name + property name. That part is important — the identifier is human-readable and immediately points to where it's used, both in the filesystem and in the component. Drop a `page.locale=ru.json` next to it with translations:

```json
{
    "$my_page_title": "Привет, мир!"
}
```

That's it.

This works because view.tree is a strict DSL. The React default is i18next: you write `t('greeting.title')`, you maintain the keys and dictionary yourself. To automate extraction, you add `i18next-parser`, which greps the source with regexes and breaks on anything dynamic.

### No config files

A $mol project has no vite.config.ts, no per-app tsconfig. The mam bundler knows everything from conventions: filename — type, path from root — class name. No config wrangling.

A new module = a folder with a pair of `.ts`/`.view.tree` files. mam generates `package.json` itself if it doesn't exist.

### Strict architecture

In $mol, the class name is firmly tied to its filesystem path. The class `$my_app_button` lives in `/my/app/button/button.ts` — no other option. Want to name a class `Button` and put it in `src/components/ui/button/index.ts`? Not happening.

It sounds like a constraint, but $mol just doesn't let you write spaghetti. The name is short and tells you where to look. From a class name in code, in git log, in a GitHub comment — you immediately know the file.

On top of that is MVF (ModelView Fractal), the decomposition pattern behind `$mol_view`. Each component is both a view for its parent and a model/controller for its children. Domain model lives separately: `$hyoo_talks_domain` lives in `talks/domain/domain.ts`, the view works with its objects, not raw data:

```ts
// talks/talk.view.ts
domain() {
	return this.$.$hyoo_talks_domain
}
chat( id ) {
	return this.domain().Chat( id )
}
```

Also, MAM itself isn't tied to the web. A module is a directory with sources in whatever — view.tree, GLSL shaders, CSS, JSON, files for other languages. You can teach the bundler any language; MAM only knows about the directory structure and inter-module dependencies.

### The renderer isolates failures

Every $mol component is its own error boundary. An exception in a getter, a timeout while loading, anything at all — a placeholder is shown for that one component, the rest of the UI stays alive.

In React you'd wrap things in `<ErrorBoundary>` and remember to do it. In $mol it's the default.

Plus reactivity: when the value becomes valid again, the component re-renders on its own with no page reload. We already saw that in the Svelte example above.

### One codebase, every platform

The same $mol project builds for:

- Web
- Tauri (desktop on macOS/Windows/Linux, also iOS/Android)
- Chrome/Firefox extension (MV3)
- Telegram Mini App

The Tauri wrapper and extension manifest are already in the scaffold; you don't configure anything separately. My own VK Music ([bog/vk](https://b-on-g.github.io/vk/)) ships both as an MV3 extension and as a gh-pages mirror — literally the same module.

By the way, if you need a backend — there's Giper Baza: CRDT sync, tuned for $mol. That's a separate story, I'll write a dedicated post comparing it to other local-first solutions.

### Why give it a try

Not because of age — $mol is younger than React and Vue, same age as Angular. The point is elsewhere: in 10 years $mol has had one major release. React has had 19, Angular has had 21.

|                                  | $mol | React | Angular | Vue |
|----------------------------------|------|-------|---------|-----|
| First release                    | 2016 | 2013  | 2016    | 2014 |
| Major versions by 2026           | 1    | 19    | 21      | 3    |
| Tree-shaking without setup       | ✅ from day one | ⭕ removes unused | ⭕ inhibited, standalone since 2022 | ⭕ removes unused |
| Atoms / signals out of the box   | ✅ from day one | ❌ only via MobX and friends | ⭕ added 2023 | ✅ from day one |
| One failure doesn't kill the app | ✅ automatic | ⭕ ErrorBoundary since 2017 | ❌ none | ⭕ errorCaptured manually since 2017 |
| Async suspension                 | ✅ automatic, any level | ⭕ Suspense, render-time only | ❌ via third-party RxLet, manual | ❌ mount-time only |
| Static typing                    | ✅ behavior + composition + styles (since 2020) | ❌ third-party typings | ✅ behavior only | ⭕ behavior only since 2020 |
| Inversion of control             | ✅ typed contexts | ⭕ manual / renderProps | ✅ injections / contexts | ⭕ untyped contexts since 2017 |
| Behavior / composition / styling split | ✅ from day one | ❌ doesn't exist by design | ❌ partial | ❌ partial |
| Behavior customization           | ✅ inheritance or in-place | ⭕ manual extension points | ⭕ inheritance | ⭕ extension points since 2020 |
| Composition customization        | ✅ inheritance or in-place | ⭕ manual extension points | ⭕ manual slots | ⭕ manual slots |
| Styling customization            | ✅ cascade via auto-generated attributes | ❌ manual extension points or classes | ❌ manual extension points or classes | ❌ manual extension points or classes |
| Visible-area-only rendering      | ✅ lazy by default, fully virtual since 2020 | ⭕ via third-party component | ⭕ via third-party component | ⭕ via third-party component |
| Same code on client and server   | ✅ from day one | ❌ different API, data prep required | ❓ | ❓ |

There are no versions because there's no reason to keep copies around. Break an API — rename the module, and you can reuse up to 99% of the old code. Sounds wild but it works: no lockfile zoo, no "works on my machine", no weekly dependabot PR.

If you recognized some of your own pain in there, drop by [@giper_dev](https://t.me/giper_dev) (Russian-speaking) and we'll sort it out. Or just poke around the [playground](https://mol.hyoo.ru/) — view.tree online, no install.
