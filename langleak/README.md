# $bog_langleak

Минимальный репро **phantom `Not translated to X` warn'а после `$mol_test`-теста**.

## TL;DR

`$mol_test` изолирует каждый тест в свежий `$` и destroy'ит его после. Но браузерный `setTimeout` живёт вне жизненного цикла wire и `$` — если view-метод запустил `setTimeout`-цепочку, она докрутится уже с destroy'нутым контекстом, вызовет `.text()` → `$mol_locale.texts()` в мёртвом mem'е → wire ретраит fetch → `$mol_fail_catch` ловит уже-catched promise → `texts()` возвращает `{}` → warn.

## Как воспроизвести

```bash
npx mam bog/langleak
```

Открой `http://localhost:9080/bog/langleak/-/test.html`, посмотри console — увидишь:

```
Not translated to "en": $bog_langleak_title
```

Или в node:

```bash
node bog/langleak/-/node.test.js
```

Тот же warn в stderr.

## Что происходит внутри

1. `$mol_test` создаёт свежий `$` контекст
2. Тест синхронно вызывает `v.start()` — который делает `setTimeout(() => tick(1), 100)`
3. Тест возвращается, `$mol_test_run` уничтожает контекст
4. Через 300мс (100 × 3) последний tick срабатывает — уже в destroy'нутом `$`
5. Внутри читает `this.title()` — auto-gen от `@`-декларации, зовёт `$mol_locale.text('$bog_langleak_title')`
6. `texts(lang)` mem invalidated в мёртвом контексте → wire пере-фетчит JSON
7. В `$mol_locale.texts` catch блоке `$mol_fail_catch(alreadyCatched Promise)` возвращает `false` → `return {}`
8. `text()` получает пустой dict, warn'ит

## Как исправить (правильный паттерн)

Заменить голый `setTimeout` на `$mol_after_timeout` — wire-aware таймер, который отменяется при destroy контекста:

```ts
// langleak.view.ts

// Голый setTimeout, живёт вне $
setTimeout( () => this.tick( n + 1 ), 100 )

// Wire-aware, destroy'ится вместе с $
new this.$.$mol_after_timeout( 100, () => this.tick( n + 1 ) )
```

После правки — repro не воспроизводится, warn не появляется.

## Файлы

- `langleak.view.tree` — единственный компонент с `@`-локализованным `title` и кнопкой `Start`
- `langleak.view.ts` — `start()` шедулит цепочку `setTimeout × 3`, последний tick читает `title()`
- `langleak.test.ts` — один тест на 2 строки: `make + start`
- `langleak.locale=ru.json` — перевод для ключа
- `index.html` — для запуска через `test.html`
- `demo/` — обёртка для включения в `$bog_demo`

## Что дальше

Стоило бы `$mol_locale.texts` fallback на `{}` для non-default lang вернуть корректным поведением (либо не warn'ить когда dict в fallback-состоянии, либо ретраить cleaner). Но это уже внутренности `$mol_locale`.

Практически — использовать `$mol_after_timeout` / `$mol_after_frame` вместо голых таймеров это норма для $mol в любом случае (memory-safe destroy на unmount).
