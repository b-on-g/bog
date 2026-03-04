"Game Changer Here" — план видео

### [0:00] Hook (30 сек)

"Every framework solves the same problems. But they all solve them wrong."

Показать типичный React проект: package.json с 50+ зависимостями, webpack config на 200 строк, Redux boilerplate. "What if I told you all of this is unnecessary?"

---

### [0:30] The Problems (2 мин)

Перечислить 6 ключевых проблем веб-разработки:

1. **State management hell** — данные рассинхронизированы между компонентами
2. **Config madness** — webpack, vite, babel, tsconfig, eslint, prettier...
3. **Bundle bloat** — React + Redux + Router + UI kit = 500KB+ до написания кода
4. **Styling chaos** — CSS modules, styled-components, tailwind — каждый проект по-разному
5. **No offline, no sync** — 99% приложений мертвы без сервера
6. **Platform lock-in** — web это web, desktop отдельно, mobile отдельно

---

### [2:30] How frameworks "solve" them (5 мин)

Разговорная часть — сравнение подходов:

#### State management

| Проблема         | React                         | Vue                     | Svelte             | Angular         | $mol                                |
| ---------------- | ----------------------------- | ----------------------- | ------------------ | --------------- | ----------------------------------- |
| Реактивность     | useState + useEffect (ручная) | ref/reactive (полуавто) | Компилятор (магия) | RxJS (сложно)   | @$mol_mem (автоматическая, ленивая) |
| Глобальный стейт | Redux/Zustand/Jotai (выбирай) | Pinia                   | Stores             | Services + RxJS | Просто свойства — всё реактивно     |

**Проблема:** React заставляет тебя думать КОГДА обновлять. Vue/Svelte проще, но всё равно нужны stores. Angular — overengineered.

**$mol:** Написал свойство с `@$mol_mem` — оно само знает когда пересчитаться. Нет useEffect. Нет подписок. Нет stores. Зависимости трекаются автоматически.

#### Config / Build

|           | React                             | Vue           | Svelte        | Angular             | $mol                   |
| --------- | --------------------------------- | ------------- | ------------- | ------------------- | ---------------------- |
| Сборщик   | Webpack/Vite + config             | Vite + config | Vite + config | Angular CLI (скрыт) | MAM — zero config      |
| Настройка | package.json, tsconfig, eslint... | То же         | То же         | angular.json        | Ничего. Папка = модуль |

**Проблема:** Новый проект на React — 10 минут на настройку до первого компонента. Create React App deprecated. Next.js — свой мир правил.

**$mol:** `git clone && npm start`. Всё. Нет package.json на модуль. Нет конфигов. Имя папки = имя модуля.

#### Bundle size

|                       | React     | Vue       | Svelte         | Angular               | $mol                  |
| --------------------- | --------- | --------- | -------------- | --------------------- | --------------------- |
| Core                  | ~45KB     | ~35KB     | ~2KB (runtime) | ~130KB                | ~20KB                 |
| + Router + State + UI | 300-500KB | 200-400KB | 100-300KB      | 200KB+ (всё включено) | ~100KB (всё включено) |

**$mol:** Роутинг, компоненты, темы, i18n, формы — всё из коробки в ~100KB.

#### Styling

|        | React                          | Vue                  | Svelte     | Angular          | $mol                       |
| ------ | ------------------------------ | -------------------- | ---------- | ---------------- | -------------------------- |
| Подход | CSS-in-JS / modules / tailwind | Scoped CSS / modules | Scoped CSS | Component CSS    | CSS-in-TS (типизированный) |
| Темы   | Руками                         | Руками               | Руками     | Angular Material | Встроенные light/dark      |

**Проблема:** В React каждый проект — свой подход к стилям. Tailwind — utility классы без type safety. styled-components — рантайм оверхед.

**$mol:** `$mol_style_define` — TypeScript проверяет CSS. Ошибка в имени свойства = ошибка компиляции. Темы встроены.

#### Offline & Sync

|                | React                          | Vue    | Svelte | Angular | $mol                           |
| -------------- | ------------------------------ | ------ | ------ | ------- | ------------------------------ |
| Offline        | Руками + Service Worker        | Руками | Руками | Руками  | PWA из коробки                 |
| Real-time sync | Firebase/Supabase/свой backend | То же  | То же  | То же   | Giper Baza — CRDT, zero server |
| Auth           | JWT + backend                  | То же  | То же  | То же   | Crypto keys, instant           |

**Проблема:** Хочешь offline + sync = месяцы работы. Firebase — vendor lock-in. Свой backend — ещё больше работы.

**$mol + Giper Baza:** Данные на клиенте, синк через CRDT, конфликтов нет, сервер не нужен, auth по криптоключу при первом заходе.

#### Cross-platform

|               | React                        | Vue       | Svelte         | Angular  | $mol         |
| ------------- | ---------------------------- | --------- | -------------- | -------- | ------------ |
| Desktop       | Electron (300MB+)            | Electron  | Electron/Tauri | Electron | Tauri (~5MB) |
| Mobile        | React Native (отдельный код) | Capacitor | Capacitor      | Ionic    | PWA + Tauri  |
| Web Extension | Отдельно                     | Отдельно  | Отдельно       | Отдельно | Тот же код   |

---

### [7:30] The actual game changer (3 мин)

Главный тезис: **$mol не решает проблемы — он их устраняет.**

- React решает стейт менеджмент добавляя библиотеки → $mol устраняет проблему автоматической реактивностью
- Vite решает медленную сборку → $mol устраняет конфиги вообще
- Tailwind решает хаос в стилях → $mol даёт type-safe CSS
- Firebase решает sync → Giper Baza устраняет сервер целиком

Аналогия: Все фреймворки строят лучший костыль. $mol убирает причину хромоты.

---

### [10:30] "But nobody uses it" (2 мин)

Разговорная часть — честный разбор:

- Маленькое коммьюнити — да
- Документация — сложная для входа
- Непривычный синтаксис view.tree — нужно привыкнуть
- Нет вакансий с "$mol" — правда

Но: React тоже когда-то "никто не использовал". Вопрос не в популярности, а в том, решает ли он проблемы лучше.

---

### [12:30] Outro (30 сек)

"Я не говорю бросайте React. Я говорю — попробуйте. Ссылки в описании."

Ссылка на первое видео (туториал), ссылки на $mol, Giper Baza, richtemplate.
