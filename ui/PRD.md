# PRD: $mol Design System — bog/ui

## Обзор и цели

Библиотека переиспользуемых UI-компонентов на $mol/MAM, реализующая современные дизайн-паттерны поверх встроенных $mol-компонентов. Вдохновлена shadcn/ui, Radix Themes и IBM Carbon.

**Цель**: Создать каталог готовых композитных компонентов с интерактивным демо-приложением, которое служит витриной и документацией.

**Платформа**: Web (SPA на $mol/MAM).

**Расположение**: `/Users/cmyser/code/mam/bog/ui/`

## Целевая аудитория

- $mol-разработчики, которым нужны готовые UI-паттерны
- Команды, использующие MAM для внутренних приложений
- Демо для презентации возможностей $mol

## Технический стек

- **Фреймворк**: $mol (view.tree + view.ts + view.css.ts)
- **Сборка**: MAM (`npx mam bog/ui/app`)
- **Стили**: `$mol_style_define` (типизированные CSS-in-TS)
- **Токены**: `$mol_theme.*` для цветов, `$mol_gap.*` для spacing
- **Иконки**: `$mol_icon_*` (Material Design Icons, 1400+ штук)

### Технические ограничения ($mol)
- `as any` в стилях ЗАПРЕЩЁН
- `rgba()` ЗАПРЕЩЁН — использовать hex `#rrggbbaa`
- Padding shorthand-строки ЗАПРЕЩЕНЫ — использовать объект `{top, bottom, left, right}`
- Каждое `_` в имени класса = уровень вложенности папок: `$bog_ui_badge` → `bog/ui/badge/`
- Папки модулей НЕ содержат `_`
- `$mol_view` делает `display: flex` по умолчанию (горизонтально)
- Стили через `.view.css.ts`, raw `.view.css` только для keyframes/pseudo-elements/hover

## Компоненты

### 1. Badge (`$bog_ui_badge`)
Компактная метка/чип с цветовыми вариантами.

**API (view.tree)**:
- `label \Badge` — текст
- `type \default` — вариант: default | success | warning | error | info

**Acceptance Criteria**:
- Рендерится как inline-flex элемент с pill-формой (borderRadius: 9999px)
- 5 цветовых вариантов через атрибут `bog_ui_badge_type`
- Использует `$mol_theme.*` токены для default варианта
- Hardcoded hex-цвета для цветных вариантов (success=green, warning=yellow, error=red, info=blue)

---

### 2. Empty State (`$bog_ui_empty`)
Placeholder для пустых страниц/списков.

**API (view.tree)**:
- `Icon $mol_icon_magnify` — иконка (заменяемая)
- `title \No data` — заголовок
- `message \Nothing to show here yet` — описание
- `Action null` — опциональная кнопка действия

**Acceptance Criteria**:
- Flex column layout, center-aligned
- Иконка крупная (3rem), приглушённая ($mol_theme.shade)
- Заголовок bold, описание shade
- Action slot для кнопки (null по умолчанию = не показывается)

---

### 3. Skeleton (`$bog_ui_skeleton`)
Анимированный loading placeholder (shimmer).

**API (view.tree)**:
- Без параметров, чистый CSS

**Acceptance Criteria**:
- Shimmer-анимация (gradient slide) через raw `.view.css` (@keyframes)
- Скруглённые углы ($mol_gap.round)
- Высота по умолчанию 1rem, ширина 100%
- Цвет фона через $mol_theme.card

---

### 4. Breadcrumb (`$bog_ui_breadcrumb`)
Навигационные хлебные крошки.

**API (view.tree)**:
- `items /` — список элементов (передаётся из TS)
- `Item* $mol_link` — шаблон элемента с мультисвойством
- `Separator $mol_view` — разделитель (по умолчанию `/`)

**Acceptance Criteria**:
- Horizontal flex с gap
- Каждый Item — `$mol_link` с `arg` для навигации
- Разделитель `›` между элементами, цвет $mol_theme.shade
- Последний элемент не ссылка, выделен цветом $mol_theme.text

---

### 5. Sidebar (`$bog_ui_sidebar`)
Боковая панель с 3 режимами: rail / dock / hidden.

**API (view.tree)**:
- `mode? \dock` — текущий режим: rail | dock | hidden
- `items /` — список элементов навигации
- `Item* $bog_ui_sidebar_item` — элемент навигации
- `Toggle $mol_button_minor` — кнопка переключения режима
- `Header $mol_view` — заголовок панели
- `Footer $mol_view` — подвал панели

**`$bog_ui_sidebar_item` API**:
- `icon $mol_icon` — иконка
- `label \` — текст (скрывается в rail mode)
- `active false` — активный элемент

**Acceptance Criteria**:
- **dock** (240px): иконка + текст, полная навигация
- **rail** (56px): только иконки с tooltip
- **hidden** (0px): полностью скрыт
- Плавная CSS transition при смене режимов (width + opacity текста)
- Toggle кнопка для переключения dock↔rail, в hidden — кнопка для открытия
- Активный элемент выделен $mol_theme.current
- Разделитель между Header, items, Footer

---

### 6. Sheet / Drawer (`$bog_ui_sheet`)
Overlay-панель, выезжающая от любого края экрана.

**API (view.tree)**:
- `showed? false` — показать/скрыть
- `side \right` — сторона: top | right | bottom | left
- `content /` — содержимое панели
- `Backdrop $mol_view` — затемнённый фон (click = закрыть)

**Acceptance Criteria**:
- Overlay поверх всего контента (position: fixed, z-index высокий)
- Backdrop — полупрозрачный тёмный фон, click закрывает sheet
- CSS transition для выезжания (transform: translateX/translateY)
- Для right/left: ширина 400px max, 80vw
- Для top/bottom: высота 50vh max
- Контент скроллится если не помещается

---

### 7. Toast Notifications (`$bog_ui_toast`)
Стакаемые уведомления.

**`$bog_ui_toast` (один тост)**:
- `message \` — текст
- `type \info` — тип: info | success | warning | error
- `closeable true` — кнопка закрытия

**`$bog_ui_toast_manager` (менеджер)**:
- `toasts /` — список активных тостов
- `add(message, type)` — добавить тост
- `remove(id)` — убрать тост

**Acceptance Criteria**:
- Тосты стакаются снизу-справа (position: fixed)
- Тосты закрываются ТОЛЬКО по кнопке × (БЕЗ auto-dismiss, БЕЗ setTimeout!)
- 4 цветовых варианта (info=blue, success=green, warning=yellow, error=red)
- Иконка слева по типу, текст, кнопка закрытия
- Анимация появления (slide-in from right) через CSS
- Максимум 5 видимых тостов

---

### 8. Command Palette (`$bog_ui_command`)
Универсальный поиск/действия (⌘K).

**API (view.tree)**:
- `showed? false` — показать/скрыть
- `query? \` — текст поиска
- `commands /` — полный список команд
- `filtered /` — отфильтрованный список (computed в TS)
- `Command* $mol_row` — шаблон команды
- `Search $mol_string` — поле поиска
- `Groups /` — группы команд

**Команда (объект)**:
- `id: string`
- `label: string`
- `group: string` (Navigation, Actions, Settings...)
- `icon: $mol_icon`
- `action: () => void`
- `shortcut?: string` (отображаемая комбинация, например ⌘N)

**Acceptance Criteria**:
- Открывается по Cmd+K (Mac) / Ctrl+K (остальные)
- Esc закрывает
- Поле поиска автофокус при открытии
- Fuzzy-фильтрация по label
- Группировка команд с заголовками секций
- Стрелки вверх/вниз перемещают фокус, Enter выполняет
- Текущий выделенный элемент подсвечен $mol_theme.current
- Shortcut отображается справа от label (приглушённый текст)
- Overlay с backdrop (как Sheet)

---

### 9. Data Table (`$bog_ui_table`)
Таблица данных с сортировкой и выбором строк.

**API (view.tree)**:
- `columns /` — определения колонок
- `data /` — массив строк данных
- `sort_column? \` — текущая колонка сортировки
- `sort_dir? \asc` — направление: asc | desc
- `selected /` — выбранные строки
- `selectable false` — включить чекбоксы

**Колонка (объект)**:
- `id: string`
- `label: string`
- `sortable: boolean`
- `width?: string`

**Acceptance Criteria**:
- Extends `$mol_grid` для виртуализации
- Заголовки кликабельны для сортировки (если sortable)
- Индикатор направления сортировки (▲/▼)
- Опциональные чекбоксы для выбора строк
- Заголовок "Select all" чекбокс
- Стили полосатых строк (zebra striping) через $mol_theme.card
- Hover-эффект на строках

---

### 10. Demo App (`$bog_ui_app`)
Интерактивный каталог-витрина всех компонентов.

**Структура**:
- Левая панель: `$bog_ui_sidebar` с навигацией по компонентам
- Правая панель: демо выбранного компонента
- Используется `$mol_book` для responsive multi-pane layout

**Страницы демо**:
- Overview (все компоненты кратко)
- По одной странице на каждый компонент с live-примерами и вариациями
- Переключатель темы (light/dark) в toolbar

**Acceptance Criteria**:
- index.html точка входа: `$bog_ui_app`
- Sidebar навигация между компонентами через URL `?component=badge`
- Каждый компонент демонстрируется во всех вариациях
- Работает dark/light тема
- Responsive: на мобильных sidebar скрывается

## Принципы UI-дизайна

- **Токены**: Все цвета через `$mol_theme.*`, все отступы через `$mol_gap.*`
- **Dark/Light**: Автоматическая поддержка через тему $mol
- **Accessibility**: Keyboard navigation, focus states, semantic attributes
- **Responsive**: Компоненты адаптируются к размеру контейнера
- **Minimal**: Простые API, максимально используем встроенные $mol компоненты

## Этапы разработки

### Phase 1 — Простые компоненты
Badge, Empty State, Skeleton, Breadcrumb

### Phase 2 — Layout компоненты
Sidebar, Sheet/Drawer

### Phase 3 — Interactive компоненты
Toast, Command Palette, Data Table

### Phase 4 — Demo App
Интеграция всех компонентов в демо-приложение

## Потенциальные проблемы

1. **$mol_view flex по умолчанию** — нужно явно `flex: {direction: 'column'}` для вертикальных layout
2. **Overlay z-index** — Sheet и Command palette нужен высокий z-index, проверить что не конфликтует
3. **Keyboard events** — Command palette перехватывает Cmd+K глобально, убедиться что не мешает другим обработчикам
4. **CSS transitions** — в $mol нет встроенных transition, делать через raw `.view.css`
5. **ЗАПРЕЩЕНО использовать setTimeout/setInterval** — тосты закрываются только по кнопке

## Будущее расширение

- Combobox (поиск + выбор, как в Linear/Notion)
- Structured List (key-value, как в Carbon)
- Inline Notifications (в контексте, не overlay)
- Progress indicators (skeleton vs spinner vs progress bar)
- Optimistic UI паттерны с $mol_wire
