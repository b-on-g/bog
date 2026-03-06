# PRD: $mol Documentation Website

## Overview

Красивый документационный сайт для фреймворка $mol, построенный на самом $mol (showcase фреймворка). Вдохновление — vuejs.org. Сайт включает лендинг, интерактивный Getting Started с пошаговыми заданиями, встроенную Tree-песочницу, и справочник компонентов.

**Деплой**: GitHub Pages + GitHub Actions (mol_prerender_action)
**Языки**: EN (primary, код/view.tree) + RU (через $mol_locale)
**Рабочая директория**: `/Users/cmyser/code/mam/bog/docs/`

## Target Audience

1. **Новички** — не знакомы с $mol, приходят с нуля
2. **Опытные разработчики** — переходят с React/Vue/Angular, нужен контекст "зачем $mol" и mapping знакомых концепций

## Site Structure

### 1. Landing Page (`/bog/docs/app/`)

Главная страница сайта. Секции сверху вниз:

| Секция | Содержание |
|--------|-----------|
| **Hero** | Заголовок "The $mol Framework", подзаголовок о реактивности/компонентности, CTA: "Get Started" + "Playground" |
| **Value Propositions** | 3 карточки: Reactive (автотрекинг зависимостей), Composable (view.tree DSL), Lightweight (нет виртуального DOM) |
| **Live Demo** | Маленький интерактивный пример — view.tree код → результат в реальном времени |
| **Ecosystem** | Ссылки: MAM, Giper Baza, $mol_ui components, Tauri integration |
| **Footer** | Links: GitHub, Docs, Community |

### 2. Getting Started (`/bog/docs/guide/`)

Пошаговый интерактивный курс. Основа контента — MOL_QUICK_START.md (36KB), переработанный в пошаговые уроки.

#### Структура уроков:

**Module 1: Basics**
1. Setup & First App — установка, `npm start`, структура модуля
2. view.tree Syntax — компоненты, вложенность, свойства
3. Bindings — `<=`, `<=>`, `=>`, привязки данных
4. Reactivity — `@$mol_mem`, автотрекинг, ленивые вычисления

**Module 2: Components**
5. Built-in Components — $mol_page, $mol_list, $mol_button, $mol_form
6. Styling — view.css.ts, $mol_style_define, темы
7. Lists & Collections — `*` свойства, динамические списки
8. Navigation — $mol_book2, $mol_link, arg routing

**Module 3: Advanced**
9. State Management — $mol_mem, $mol_store, реактивные деревья
10. Testing — test.ts, $mol_assert
11. Project Architecture — namespace → folder mapping, meta.tree

#### Формат каждого урока:

```
┌─────────────────────────────────────────────┐
│  [Lesson Title]                    [1/11]   │
├─────────────────────────────────────────────┤
│                                             │
│  📖 Explanation text (markdown)             │
│                                             │
├─────────────────────────────────────────────┤
│  ┌─── Editor ────┐  ┌─── Preview ─────┐    │
│  │ view.tree code │  │ rendered result │    │
│  │               │  │                 │    │
│  │               │  │                 │    │
│  └───────────────┘  └─────────────────┘    │
├─────────────────────────────────────────────┤
│  ✅ Task: "Add a title property to..."      │
│  [Check] [Hint] [Solution]     [Next →]     │
└─────────────────────────────────────────────┘
```

- Левая панель: редактор кода (view.tree / TypeScript)
- Правая панель: живой preview результата
- Задание внизу: конкретная задача + проверка + подсказки
- Навигация между уроками

### 3. Playground (`/bog/docs/play/`)

Полноценная песочница для экспериментов:
- Редактор view.tree (на основе `$mol_tree2_edit` или textarea)
- Транспиляция view.tree → JS в реальном времени (через `$mol_view_tree2_to_js`)
- Панель preview с рендерингом результата
- Возможность шаринга кода через URL (query params)
- Preset-примеры (Hello World, Counter, Todo List)

### 4. API Reference (`/bog/docs/ref/`)

*Второй этап* — справочник компонентов с автогенерацией из кода.

## Technical Architecture

### Module Structure (MAM)

```
bog/docs/
├── app/                    # Main app shell
│   ├── index.html
│   ├── app.view.tree
│   ├── app.view.ts
│   ├── app.view.css.ts
│   └── app.meta.tree
├── landing/                # Landing page
│   ├── landing.view.tree
│   ├── landing.view.ts
│   └── landing.view.css.ts
├── guide/                  # Getting Started shell
│   ├── guide.view.tree
│   ├── guide.view.ts
│   └── guide.view.css.ts
├── guide/lesson/           # Single lesson component
│   ├── lesson.view.tree
│   ├── lesson.view.ts
│   └── lesson.view.css.ts
├── guide/editor/           # Code editor for lessons
│   ├── editor.view.tree
│   ├── editor.view.ts
│   └── editor.view.css.ts
├── guide/preview/          # Live preview panel
│   ├── preview.view.tree
│   ├── preview.view.ts
│   └── preview.view.css.ts
├── guide/data/             # Lesson content data
│   └── data.ts
├── play/                   # Playground page
│   ├── play.view.tree
│   ├── play.view.ts
│   └── play.view.css.ts
├── locale/                 # Translations
│   ├── en.locale.json
│   └── ru.locale.json
└── docs.meta.tree          # Meta: dependencies
```

### Key Dependencies

- `$mol_book2` — page navigation (landing ↔ guide ↔ playground)
- `$mol_page` — page layout с header/body/footer
- `$mol_text` — markdown rendering для lesson text
- `$mol_textarea` / `$mol_string` — code editor
- `$mol_tree2_edit` — structured tree editor (playground)
- `$mol_view_tree2_to_js` — tree → JS transpilation
- `$mol_locale` — i18n (en/ru)
- `$mol_link` — navigation links
- `$mol_row`, `$mol_list` — layout

### Routing

Через `$mol_state_arg`:
- `/` → Landing
- `/guide` → Guide overview
- `/guide?lesson=1` → Specific lesson
- `/play` → Playground
- `/play?code=...` → Playground with preset code

### Interactive Lesson Engine

Каждый урок — объект с полями:
```typescript
interface Lesson {
    id: number
    title_en: string
    title_ru: string
    explanation_en: string   // markdown
    explanation_ru: string
    initial_code: string     // стартовый view.tree
    solution_code: string    // правильный ответ
    task_en: string          // описание задания
    task_ru: string
    hints_en: string[]       // подсказки
    hints_ru: string[]
    check: (code: string) => boolean  // валидация
}
```

Проверка заданий — через парсинг tree и проверку структуры (не строковое сравнение).

### Локализация

- view.tree пишется на EN
- UI strings через `$mol_locale`:
  - `en.locale.json` — английские тексты
  - `ru.locale.json` — русские переводы
- Контент уроков — двуязычные поля в data

## Development Phases

### Phase 1: Foundation (MVP)
- [ ] Структура модулей, meta.tree, index.html
- [ ] App shell с $mol_book2 навигацией
- [ ] Landing page (hero + value props + footer)
- [ ] Базовый Playground (editor + preview)
- [ ] GitHub Actions деплой

### Phase 2: Interactive Guide
- [ ] Lesson component (editor + preview + task)
- [ ] 4 урока Module 1 (Basics)
- [ ] Проверка заданий
- [ ] Навигация между уроками
- [ ] Локализация en/ru

### Phase 3: Content & Polish
- [ ] Module 2 уроки (Components)
- [ ] Module 3 уроки (Advanced)
- [ ] Live Demo на лендинге
- [ ] Sharing кода через URL
- [ ] Preset-примеры в Playground

### Phase 4: Reference & Design System
- [ ] API Reference (автогенерация)
- [ ] Кастомная дизайн-система (эволюция EVE)
- [ ] SEO, OpenGraph, prerendering

## Risks & Mitigations

| Risk | Mitigation |
|------|-----------|
| view.tree → JS транспиляция в браузере сложна | Использовать существующий `$mol_view_tree2_to_js`, проверить что работает client-side |
| Рендеринг preview в iframe может быть хрупким | Начать с простого: показывать дерево компонентов, не полный рендер |
| Большой объём контента для уроков | Переработать MOL_QUICK_START.md, не писать с нуля |
| Дефолтные $mol-стили "не красивые" | Phase 1 на дефолте, Phase 4 — кастомная тема |

## Success Criteria

1. Новичок может пройти Getting Started за 1 час и создать свой первый $mol-компонент
2. Playground работает без backend — всё client-side
3. Сайт сам является примером качественного $mol-приложения
4. Деплой автоматический через GitHub Actions на push в master
