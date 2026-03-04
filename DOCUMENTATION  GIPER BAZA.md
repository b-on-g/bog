# Giper Baza - Полная документация

> Децентрализованная высокодоступная база данных с бесконфликтной синхронизацией в реальном времени.

**Лицензия:** MIT
**Домен:** [baza.giper.dev](https://baza.giper.dev)
**Репозиторий:** [github.com/giper-dev/baza](https://github.com/giper-dev/baza)

---

## Оглавление

1. [Обзор и философия](#1-обзор-и-философия)
2. [Ключевые характеристики](#2-ключевые-характеристики)
3. [Архитектура](#3-архитектура)
4. [Словарь терминов](#4-словарь-терминов)
5. [Граф-модель данных](#5-граф-модель-данных)
6. [Типы данных (Pawn)](#6-типы-данных-pawn)
7. [Система юнитов (Unit)](#7-система-юнитов-unit)
8. [Система прав (Rank)](#8-система-прав-rank)
9. [Аутентификация (Auth)](#9-аутентификация-auth)
10. [Хранение (Mine)](#10-хранение-mine)
11. [Синхронизация (Yard)](#11-синхронизация-yard)
12. [Бинарный протокол (Pack)](#12-бинарный-протокол-pack)
13. [Ссылки (Link)](#13-ссылки-link)
14. [Примитивные типы (Vary)](#14-примитивные-типы-vary)
15. [Flex — динамические схемы](#15-flex--динамические-схемы)
16. [Файлы (File)](#16-файлы-file)
17. [Мониторинг (Stat)](#17-мониторинг-stat)
18. [Бенчмарк (Bench)](#18-бенчмарк-bench)
19. [TypeScript API](#19-typescript-api)
20. [Серверная часть (Node)](#20-серверная-часть-node)
21. [Деплой и инфраструктура](#21-деплой-и-инфраструктура)
22. [Сценарии использования](#22-сценарии-использования)
23. [Структура файлов проекта](#23-структура-файлов-проекта)

---

## 1. Обзор и философия

Giper Baza — это Local-First база данных, построенная на принципах CRDT (Conflict-free Replicated Data Types). Данные хранятся локально на каждом устройстве и синхронизируются через серверы (или в будущем — peer-to-peer) без конфликтов. Каждый клиент может полноценно работать оффлайн, а при появлении сети все изменения автоматически мержатся.

Основная идея — **данные принадлежат пользователю**, а не серверу. Приватный ключ хранится только на клиенте. Сервер не может прочитать зашифрованные данные и не может модифицировать данные без корректной подписи.

---

## 2. Ключевые характеристики

| Свойство | Описание |
|---|---|
| **Convergent** | CvRDT, Total-Ordered, Interleaving-Free, Weak-Typed |
| **Realtime** | Delta-репликация, WebSocket (WebRTC в планах), мгновенный старт |
| **Unbreakable** | Высокая доступность, устойчивость к разделению сети, авто-восстановление |
| **Secure** | Цифровые подписи, End-to-End шифрование, шифрованный мерж, Zero-Trust |
| **Decentralized** | Local-First, простые смарт-контракты, P2P в планах |
| **Brilliant** | Реактивная архитектура, кластерная граф-модель, поддержка ISO8601/JSON/DOM/Tree |

### Гарантии (Strict Availability)

Самая строгая partition-tolerant гарантия. Запрещённые феномены:

- **Chaotic Read/Write** — нарушение последовательности операций
- **Invisible/Causless Write** — нарушение каузальности операций
- **Dirty Read/Write** — нарушение атомарности транзакций
- **Phantom/Fuzzy Read** — нарушение идемпотентности операций

---

## 3. Архитектура

```
┌──────────────────────────────────────────┐
│                  Glob                     │  Глобальный граф всей базы
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  │
│  │  Land A  │  │  Land B  │  │  Land C  │  │  Ленды — автономные части
│  │ ┌──────┐ │  │ ┌──────┐ │  │ ┌──────┐ │  │
│  │ │ Unit │ │  │ │ Unit │ │  │ │ Unit │ │  │  Юниты — минимальные кирпичики
│  │ │ Unit │ │  │ │ Unit │ │  │ │ Unit │ │  │
│  │ └──────┘ │  │ └──────┘ │  │ └──────┘ │  │
│  └─────────┘  └─────────┘  └─────────┘  │
└──────────────────────────────────────────┘
         │              │              │
    ┌────┴────┐    ┌────┴────┐    ┌────┴────┐
    │  Mine   │    │  Mine   │    │  Mine   │   Хранилища (IDB / FS)
    └─────────┘    └─────────┘    └─────────┘
         │              │              │
    ┌────┴──────────────┴──────────────┴────┐
    │                Yard                    │   Синхронизатор
    │  ┌──────┐  ┌──────┐  ┌──────┐        │
    │  │ Port │  │ Port │  │ Port │        │   Каналы связи (WebSocket)
    │  └──────┘  └──────┘  └──────┘        │
    └──────────────────────────────────────┘
```

### Уровни абстракции

1. **Glob** — глобальная база, содержит все ленды
2. **Land** — автономная часть базы со своими правами, синхронизируется отдельно
3. **Pawn** — высокоуровневое представление данных (Atom, List, Dict, Text, DOM)
4. **Unit** — минимальный неделимый кирпичик информации (ребро в граф-модели)
5. **Vary** — примитивные типы данных

---

## 4. Словарь терминов

### Структура данных

| Термин | Описание |
|---|---|
| **Glob** | Вся глобальная граф-база данных, содержащая ленды |
| **Land** | Автономная часть Glob, синхронизируется отдельно, имеет свои права, содержит юниты |
| **Home** | Ленд, где Lord является King. Содержит основную информацию пользователя |
| **Hall** | Профиль Lord с полной информацией |
| **Area** | Под-ленд (дочерний ленд в рамках Lord) |
| **Data** | Корневой Pawn ленда (root pawn) |
| **Tine** | Список входящих (наследуемых) лендов |

### Акторы

| Термин | Описание |
|---|---|
| **Lord** | Независимый актор с глобально уникальным ID, сгенерированным из Auth-ключа |
| **King** | Lord, который имеет полные права на Land (с тем же ID) |
| **Peer** | Локальный уникальный идентификатор актора в ленде (первая половина Lord ID) |

### Безопасность

| Термин | Описание |
|---|---|
| **Auth** | Приватный ключ, сгенерированный с Proof of Work |
| **Pass** | Публичный ключ, производный от Auth |
| **Sign** | Криптографическая подпись данных юнита, XOR-ed с ID ленда |

### Высокоуровневые данные (Pawn)

| Термин | Описание |
|---|---|
| **Pawn** | Высокоуровневое представление хранимых данных |
| **Atom** | Атомарный LWW-регистр |
| **List** | Мержабельный упорядоченный список |
| **Dict** | Мержабельный упорядоченный словарь |
| **Text** | Мержабельный плоский текст |
| **DOM** | Мержабельная Document Object Model |
| **Tree** | Мержабельное Abstract Syntax Tree |

### Юниты

| Термин | Описание |
|---|---|
| **Unit** | Минимальный неделимый кирпичик информации. Ребро в граф-модели |
| **Pass** | Публичный ключ пира |
| **Gift** | Права и секретный ключ, выданные пиру |
| **Sand** | Юнит данных (мета-данные) |
| **Seal** | Подпись для группы юнитов |

### Позиционирование

| Термин | Описание |
|---|---|
| **Self** | Собственный ID юнита/пешки |
| **Head** | ID родительского Pawn (вертикальная связь) |
| **Lead** | ID предыдущего Pawn в списке (горизонтальная связь) |
| **Seat** | Позиция в списке |

### Теги юнитов Sand

| Тег | Описание |
|---|---|
| **term** | Значение-терминал. Вложенные юниты не предполагаются |
| **solo** | Регистр. Работает только с первым вложенным юнитом |
| **vals** | Список значений. Каждый вложенный юнит — элемент списка |
| **keys** | Список ключей. Каждый вложенный юнит — элемент словаря |

### Сетевой уровень

| Термин | Описание |
|---|---|
| **Mine** | Хранилище юнитов (IDB в браузере, файловая система на сервере) |
| **Yard** | Синхронизатор Glob |
| **Port** | Канал связи с другим пиром |
| **Diff** | Разница двух состояний ленда (список юнитов) |
| **Face** | Статистика юнитов в ленде: общее количество + словарь Peer → Time |
| **Pack** | Универсальный бинарный пакет с Faces/Units |

### Текст и выделение

| Термин | Описание |
|---|---|
| **Token** | Минимальная значимая часть текста (пробел + слово / пробелы / пунктуация) |
| **Point** | Место внутри юнита (позиция каретки) |
| **Range** | Диапазон между двумя Point (выделение) |
| **Offset** | Количество символов от начала |

### Прочее

| Термин | Описание |
|---|---|
| **Time** | Монотонное время (секунды от UNIX epoch) |
| **Tick** | Монотонный счётчик юнитов в одной транзакции |
| **Shot** | Первые 12 байт SHA-1 хеша |
| **Channel** | Метод getter/setter: `foo()` — чтение, `foo(123)` — запись |

---

## 5. Граф-модель данных

Данные организованы как **кластерный граф**, где каждый юнит является ребром между пешками (Pawn). Юнит позиционируется двумя связями:

- **Head** (вертикальная) — указывает на родительский Pawn
- **Lead** (горизонтальная) — указывает на предыдущий Pawn в списке братьев

Это позволяет строить произвольные деревья и списки с бесконфликтным мержем.

```
Head (parent)
  ├── Lead → Unit1 ──→ Unit2 ──→ Unit3
  │         (first)   (second)   (third)
  │
  └── Sub-Head
       ├── Lead → Unit4 ──→ Unit5
       ...
```

### Land Root

Каждый ленд имеет два корневых узла:

- `data` (пустой link `""`) — корень данных
- `tine` (link `AQAAAAAA`) — список входящих лендов для наследования прав

Файл: `land/land.ts:26-29`

---

## 6. Типы данных (Pawn)

### Базовый класс: `$giper_baza_pawn`

Файл: `pawn/pawn.ts`

Виртуальный Pawn, представляющий содержимые юниты как высокоуровневые типы данных.

**Ключевые методы:**
- `land()` — ленд, содержащий этот Pawn
- `head()` — локальный ID пешки
- `link()` — глобальная ссылка на Pawn/Land/Lord
- `units()` — все упорядоченные живые юниты
- `cast(Pawn)` — получить другое представление того же Pawn
- `can_change()` — возможность вносить изменения текущим пиром
- `last_change()` — время последнего изменения в поддереве
- `authors()` — все авторы (Pass) в поддереве Pawn
- `meta()` — мета-ссылка Pawn (для Flex-системы)
- `filled()` — есть ли внутри хотя бы один юнит

### Atom — атомарный LWW-регистр

Файл: `atom/atom.ts`

Хранит **одно последнее установленное значение**. Если в базе актуально несколько юнитов от разных пиров, работает с первым (по Total Order).

**Тег:** `solo`

**Базовый класс:** `$giper_baza_atom_vary`

**Фабрика:** `$giper_baza_atom(parse)` — создаёт типизированный атомарный регистр с валидацией

**Готовые типы:**

| Класс | Тип данных |
|---|---|
| `$giper_baza_atom_blob` | Binary (Uint8Array) |
| `$giper_baza_atom_bool` | Boolean |
| `$giper_baza_atom_bint` | BigInt (int64) |
| `$giper_baza_atom_real` | Number (float64) |
| `$giper_baza_atom_link` | Ссылка ($giper_baza_link) |
| `$giper_baza_atom_text` | String |
| `$giper_baza_atom_time` | $mol_time_moment |
| `$giper_baza_atom_dura` | $mol_time_duration |
| `$giper_baza_atom_span` | $mol_time_interval |
| `$giper_baza_atom_dict` | Plain JS Object |
| `$giper_baza_atom_list` | Plain JS Array |
| `$giper_baza_atom_elem` | DOM Element |
| `$giper_baza_atom_tree` | $mol_tree2 (AST) |

**API:**
```ts
atom.val()           // Прочитать значение
atom.val( value )    // Записать значение (возвращает записанное)
atom.val_of( peer )  // Прочитать значение конкретного пира
atom.vary()          // Динамическое значение без типизации
```

**Перечисления:**
```ts
// Создание enum-типа
class $my_sex extends $giper_baza_atom_enum([ 'male', 'female' ]) {}
sex.val( 'male' )   // Записать (с валидацией)
sex.val()            // Прочитать: 'male' | 'female' | null
```

**Ссылки на другие Pawn:**

`$giper_baza_atom_link_to( ()=> PawnClass )` — атомарная ссылка на конкретный тип Pawn

```ts
class $my_field extends $giper_baza_atom_link_to( ()=> $my_person ) {}
field.remote()                    // Получить целевой Pawn
field.remote( person )            // Записать ссылку
field.ensure( preset )            // Получить или создать новый Land
field.ensure( null )              // Получить или создать в текущем Land
field.ensure( land )              // Получить или создать как Area
```

### List — мержабельный упорядоченный список

Файл: `list/list.ts`

**Тег:** `vals`

**Базовый класс:** `$giper_baza_list_vary`

**Готовые типы:** `$giper_baza_list_bin`, `$giper_baza_list_bool`, `$giper_baza_list_int`, `$giper_baza_list_real`, `$giper_baza_list_link`, `$giper_baza_list_str`, `$giper_baza_list_time`, `$giper_baza_list_dur`, `$giper_baza_list_range`, `$giper_baza_list_json`, `$giper_baza_list_jsan`, `$giper_baza_list_dom`, `$giper_baza_list_tree`

**API:**
```ts
list.items()              // Все элементы
list.items([ a, b, c ])   // Заменить весь список (с reconciliation)
list.items_vary()         // Нетипизированные элементы
list.splice(next, from, to) // Заменить подсписок (с reconciliation)
list.has( vary )          // Проверка наличия
list.has( vary, true )    // Добавить если нет
list.has( vary, false )   // Удалить
list.add( vary )          // Добавить в начало (если нет)
list.cut( vary )          // Удалить все вхождения
list.move( from, to )     // Переместить элемент
list.wipe( seat )         // Удалить по позиции
list.find( vary )         // Найти юнит по значению
```

**Список ссылок:** `$giper_baza_list_link_to( ()=> PawnClass )`
```ts
links.remote_list()              // Список связанных Pawn
links.remote_add( pawn )         // Добавить ссылку
links.make( preset )             // Создать новый Pawn в новом Land
links.make( null )               // Создать новый Pawn в текущем Land
links.make( land )               // Создать новый Pawn как Area
```

### Dict — мержабельный упорядоченный словарь

Файл: `dict/dict.ts`

Словарь является упорядоченным множеством ключей, внутри каждого из которых хранится произвольный тип данных.

**Тег:** `keys`

**API:**
```ts
dict.keys()                   // Все ключи
dict.dive( key, PawnClass )   // Получить вложенный Pawn по ключу
```

**Типизированный словарь:** `$giper_baza_dict_to( PawnClass )`
```ts
class $my_dict extends $giper_baza_dict_to( $giper_baza_atom_text ) {}
d.key( 'name' )?.val()     // Получить значение по ключу
d.key( 'name', null )      // Автоматически создать при первом доступе
```

**Словарь с фиксированными полями:** `$giper_baza_dict.with({ ... })`
```ts
class $my_entity extends $giper_baza_dict.with({
    Title: $giper_baza_atom_text,
    Count: $giper_baza_atom_bint,
}) {}

entity.Title()?.val()         // Получить Title
entity.Title( null )?.val()   // Получить Title (с автосозданием)
entity.Count( null )?.val( 5n )  // Записать Count
```

### Entity — словарь с Title

Файл: `entity/entity.ts`

```ts
class $giper_baza_entity extends $giper_baza_dict.with({
    Title: $giper_baza_atom_text,
}) {
    title( next?: string ): string  // Удобный getter/setter для Title
}
```

### Text — мержабельный текст

Файл: `text/text.ts`

Плоский текст — список параграфов, каждый из которых хранит список токенов. Является частным случаем DOM.

**Тег:** `vals`

**API:**
```ts
text.text()              // Получить полный текст
text.text( 'Hello!' )    // Записать текст (с reconciliation по параграфам)
text.str()               // Текст текущего уровня (без рекурсии в подпараграфы)
text.str( 'Hello!' )     // Записать текст текущего уровня
text.write( 'X', 5, 10 ) // Заменить символы с позиции 5 по 10 на 'X'
text.selection( lord )   // Позиция каретки пользователя
text.point_by_offset( n ) // Перевод offset в [self, pos]
text.offset_by_point([ self, pos ]) // Перевод [self, pos] в offset
```

**Токенизация:** Текст разбивается на токены по правилам (`text/tokens/tokens.ts`):
- line-break
- indents (табуляция)
- emoji (с модификаторами)
- link (URL)
- Word (с заглавной буквы)
- word (со строчной буквы)
- spaces / space
- others (пунктуация и пр.)

### DOM — мержабельный Document Object Model

Файл: `dom/dom.tsx`

Позволяет хранить и мержить произвольную DOM-структуру (XML, XHTML и т.д.).

**API:**
```ts
dom.dom()                 // Получить массив DOM-узлов
dom.dom([ elements ])     // Записать DOM-структуру (с reconciliation)
dom.html()                // Получить HTML-строку
dom.html( '<p>Hello</p>' ) // Записать из HTML
dom.selection( lord )      // Позиция каретки
```

### Empire — рекурсивный словарь

Файл: `empire/empire.ts`

Фабрика `$giper_baza_empire( PawnClass )` создаёт рекурсивный словарь, где каждый ключ может содержать либо значение типа `PawnClass`, либо вложенный словарь.

```ts
class $my_empire extends $giper_baza_empire( $giper_baza_atom_text ) {}
empire.path([ 'a', 'b', 'c' ], preset) // Спуститься по пути, создавая ленды
empire.keys([ 'a', 'b' ])              // Получить ключи на уровне
```

---

## 7. Система юнитов (Unit)

### Общее

Файл: `unit/unit.ts`

Юнит — **минимальный неделимый кирпичик состояния**. Актуально это ребро в граф-модели. Юниты бывают 4 видов:

| Kind | Код | Класс | Описание |
|---|---|---|---|
| `pass` | 255 | `$giper_baza_auth_pass` | Публичный ключ |
| `seal` | 254 | `$giper_baza_unit_seal` | Подпись группы юнитов |
| `gift` | 253 | `$giper_baza_unit_gift` | Права и секретный ключ |
| `sand` | 252 | `$giper_baza_unit_sand` | Данные |

Определено в `slot/slot.ts`

### Базовый класс: `$giper_baza_unit_base`

Общие поля (бинарный layout):

| Offset | Size | Поле | Описание |
|---|---|---|---|
| 0 | 1 | `kind` | Тип юнита (slot_kind) |
| 1 | 1 | meta | Зависит от типа (tag для sand, rank для gift и т.д.) |
| 2 | 2 | `tick` | Шаг в транзакции (uint16) |
| 4 | 4 | `time` | Секунды от UNIX epoch (uint32) |
| 8 | 12 | `lord` | ID актора-автора (12 bytes) |

**Сортировка:** Юниты сортируются по `(time, lord, tick)` — total order.

**Методы:**
- `time_tick()` — комбинированное монотонное время (time * 2^16 + tick)
- `hash()` — SHA-1 хеш юнита (первые 12 байт)
- `salt()` — уникальный номер для шифрования (tick + time + lord)

### Sand — юнит данных

Файл: `unit/sand/sand.ts`

**Бинарный layout:**

| Offset | Size | Поле |
|---|---|---|
| 0 | 1 | kind = 252 |
| 1 | 1 | size (6 бит) + tag (2 бита) |
| 2 | 2 | tick |
| 4 | 4 | time |
| 8 | 12 | lord |
| 20 | 6 | self (собственный ID) |
| 26 | 6 | head (родительский ID) |
| 32 | 6 | lead (предыдущий ID) |
| 38 | N | data (инлайн, до 63 байт) или [38-39]: big size, [40-51]: shot hash |

- Если данные <= 63 байт — они хранятся инлайн в юните
- Если данные > 63 байт — размер хранится в отдельном поле, а данные (ball) хранятся отдельно

**Теги:**
- `term` (0b00) — терминальное значение
- `solo` (0b01) — регистр (только первый вложенный юнит важен)
- `vals` (0b10) — список значений
- `keys` (0b11) — список ключей (словарь)

**Специальные значения:**
- `dead()` — юнит «мёртв» (значение = null), означает удаление
- `signed()` — юнит подписан (есть _ball)

### Gift — юнит прав

Файл: `unit/gift/gift.ts`

Фиксированный размер: **48 байт**

| Offset | Size | Поле |
|---|---|---|
| 0 | 1 | kind = 253 |
| 1 | 1 | rank (уровень прав) |
| 2 | 2 | tick |
| 4 | 4 | time |
| 8 | 12 | lord (кто выдаёт) |
| 20 | 12 | mate (кому выдаёт, пустой = всем) |
| 32 | 16 | code (зашифрованный секретный ключ) |

- `mate()` — ID получателя прав (пустой = для всех)
- `rank()` — уровень прав
- `code()` — зашифрованный ключ для доступа к данным ленда
- `code_exists()` — есть ли зашифрованный ключ (ленд зашифрован)
- Минимальный tier для создания Gift: `rule`

### Seal — юнит подписи

Файл: `unit/seal/seal.ts`

Содержит **цифровую подпись группы юнитов** (до 10 штук — `$giper_baza_unit_seal_limit`).

| Offset | Size | Поле |
|---|---|---|
| 0 | 1 | kind = 254 |
| 1 | 1 | size (4 бита) + wide flag (1 бит) |
| 2 | 2 | tick |
| 4 | 4 | time |
| 8 | 12 | lord |
| 20 | N*12 | hash_list (хеши подписанных юнитов) |
| last 64 | 64 | sign (цифровая подпись) |

- `hash_list()` — список хешей подписанных юнитов
- `shot()` — хеш для подписи (первые N байт юнита без подписи)
- `sign()` — 64-байтная цифровая подпись
- `work()` — количество ведущих единичных бит в подписи (Proof of Work)
- `rate_min()` — минимальный rate для этого Seal (зависит от work)
- `wide` — флаг, определяющий scope подписи (area vs lord)

### Pass — публичный ключ

Файл: `auth/auth.ts`

Фиксированный размер: **64 байта** (это просто `$mol_crypto_key_public`)

- `lord()` — ID Lord (хеш публичного ключа)
- `peer()` — ID Peer (первая половина lord)
- Первый байт всегда `0xFF` (Proof of Work)

---

## 8. Система прав (Rank)

Файл: `rank/rank.ts`

Права состоят из двух компонент:

### Tier — уровень доступа (старшие 4 бита)

| Tier | Значение | Описание |
|---|---|---|
| `deny` | `0b0000_0000` | Нет доступа |
| `read` | `0b0001_0000` | Только чтение |
| `post` | `0b0011_0000` | Чтение + запись данных (Sand) |
| `pull` | `0b0111_0000` | + запись метаданных (наследование) |
| `rule` | `0b1111_0000` | Полный контроль (включая раздачу прав) |

### Rate — скорость/лёгкость внесения изменений (младшие 4 бита)

| Rate | Значение | Описание |
|---|---|---|
| `late` | `0x0` | Задержка в днях |
| `long` | `0xC` | Задержка в секундах |
| `slow` | `0xD` | Задержка пол-секунды |
| `fast` | `0xE` | Задержка в миллисекундах |
| `just` | `0xF` | Задержка в микросекундах |

Rate зависит от Proof of Work в подписи (Seal). Чем больше "работы" в подписи, тем выше допустимый rate.

### Удобные конструкторы:
```ts
$giper_baza_rank_deny              // deny + late
$giper_baza_rank_read              // read + late
$giper_baza_rank_rule              // rule + just
$giper_baza_rank_post( 'fast' )    // post + fast
$giper_baza_rank_pull( 'slow' )    // pull + slow
$giper_baza_rank_make( 'post', 'fast' ) // Произвольная комбинация
```

### Preset — пресет прав при создании ленда

```ts
type $giper_baza_rank_preset = [ $giper_baza_auth_pass | null, rank ][]
// null = права для всех
// Pass = права для конкретного лорда
```

### Правила прав

- **King** (лорд с тем же ID что и ленд) **всегда имеет `rule`**
- Если всем не дать `read`, ленд автоматически **шифруется**
- При выдаче прав зашифрованного ленда, получателю передаётся ключ шифрования, зашифрованный взаимным ключом
- При понижении прав, **все изменения пира, выходящие за рамки новых прав, удаляются**
- Отзыв права на чтение не гарантирует конфиденциальность — пир мог сохранить данные/ключ ранее

---

## 9. Аутентификация (Auth)

Файл: `auth/auth.ts`

### `$giper_baza_auth` — приватный ключ

Наследуется от `$mol_crypto_key_private`.

**Ключевые методы:**
- `$giper_baza_auth.current()` — текущий приватный ключ (хранится в localStorage)
- `$giper_baza_auth.current( auth )` — установить текущий ключ
- `$giper_baza_auth.grab()` — сгенерировать новый ключ с Proof of Work
- `auth.pass()` — получить публичный ключ
- `auth.secret_mutual( pub )` — вычислить общий секрет с другим ключом

**Генерация ключа:**
Ключ генерируется с требованием `auth.uint8(0) === 0xFF` (Proof of Work). До 4096 попыток. Также отсеиваются ключи с символами `æ`/`Æ` в Lord ID.

### `$giper_baza_auth_pass` — публичный ключ

Наследуется от `$mol_crypto_key_public`. Размер: 64 байта.

**Методы:**
- `pass.lord()` — глобальный ID актора
- `pass.peer()` — локальный ID (первая половина lord)

### Сценарии аутентификации

#### Автоматическая регистрация

1. При первом открытии приложения автоматически генерируется приватный ключ
2. Ключ сохраняется в localStorage
3. Пользователь сразу «зарегистрирован»
4. Для передачи на другое устройство: ключ шифруется паролем и передаётся в виде ссылки

#### Логин-пароль

1. Приватный ключ шифруется паролем и хранится в базе
2. При авторизации: ключ находится по логину, расшифровывается паролем
3. Для «выхода» — ключ удаляется из localStorage

**Важно:** Приватный ключ никогда не передаётся по сети в незашифрованном виде.

---

## 10. Хранение (Mine)

### Базовый интерфейс: `$giper_baza_mine_temp`

Файл: `mine/mine.ts`

```ts
class $giper_baza_mine_temp {
    land(): $giper_baza_link                          // ID ленда
    units_persisted: WeakSet<$giper_baza_unit>        // Уже сохранённые юниты
    units_save( diff: { ins, del } ): void            // Сохранить изменения
    units_load(): readonly $giper_baza_unit[]         // Загрузить все юниты
    ball_load( sand ): Uint8Array                     // Загрузить большие данные
}
```

### Браузер: `$giper_baza_mine_idb` (IndexedDB)

Файл: `mine/idb/idb.web.ts`

Использует IndexedDB с двумя хранилищами:
- **Unit** — юниты (ключ: `[land, path]`)
- **Ball** — большие данные (ключ: `[land, path]`)

Название БД: `$giper_baza_mine`

Подключается в `mine/mine.web.ts`:
```ts
$.$giper_baza_mine = $giper_baza_mine_idb
```

### Сервер: `$giper_baza_mine_fs` (File System)

Файл: `mine/fs/fs.node.ts`

Использует файловую систему с **Yin-Yang Mirrors** (`$giper_baza_mine_fs_yym`) для обеспечения целостности данных.

**Структура файлов:**
```
.baza/
  {первые 2 символа land ID}/
    {land ID}.yin.baza     # Зеркало 1
    {land ID}.yan.baza     # Зеркало 2
```

Для Area (под-лендов) добавляется дополнительная поддиректория по последним 2 символам area.

**Yin-Yang Mirrors:** Механизм безопасной записи:
1. Данные записываются в зеркало 1 → flush
2. Данные записываются в зеркало 2
3. При загрузке берётся более свежее зеркало
4. Если одно зеркало повреждено — данные восстанавливаются из другого

**Memory Pool:** `$mol_memory_pool` — аллокатор для управления свободным пространством в файле. Юниты занимают слоты, выровненные по 8 байт. Удалённые юниты помечаются как `free` (kind=0).

Подключается в `mine/mine.node.ts`:
```ts
$.$giper_baza_mine = $giper_baza_mine_fs
```

---

## 11. Синхронизация (Yard)

Файл: `yard/yard.ts`

`$giper_baza_yard` — синхронизатор глобальной базы.

### Архитектура

- **Master** — сервер, к которому подключается клиент (WebSocket)
- **Slave** — входящее подключение (от другого клиента/сервера)
- **Port** — канал связи (WebSocket-соединение)

### Протокол синхронизации

1. **Обмен Faces** — пиры обмениваются «векторными часами» (Face Maps)
2. **Определение дельты** — на основе Face определяются недостающие юниты
3. **Передача юнитов** — недостающие юниты отправляются партнёру
4. **Подтверждение не требуется** — полагаемся на транспортный уровень

Для каждой пары (port, land) хранится `face_port_land` — последний известный Face этого порта для данного ленда.

### Reconnect

- При разрыве соединения — реконнект через 1 секунду
- При ошибке — переключение на следующий master (`master_next()`)
- Heartbeat: пустое сообщение каждые 30 секунд

### Web (браузер)

Файл: `yard/yard.web.ts`

В браузере master по умолчанию — `document.location.origin`:
```ts
$giper_baza_yard.masters_default.push( location.origin + '/' )
```

### Bus (межвкладочная синхронизация)

Land использует `$mol_bus` для синхронизации между вкладками одного браузера через BroadcastChannel (`land/land.ts:1010-1028`).

### Потоки данных Land

```
Land.sync()
  ├── loading()         # Загрузить из Mine
  ├── sync_rights()     # Наследовать права
  ├── bus()             # Подписаться на межвкладочную шину
  ├── sync_mine()       # Сохранять в Mine
  └── sync_yard()       # Синхронизировать через Yard
```

### Land Lifecycle

```
loading → diff_apply → sand_encoding → units_signing → units_saving
                                            ↓
                                    (подпись юнитов)
                                            ↓
                                   broadcast → yard → ports
```

---

## 12. Бинарный протокол (Pack)

Файл: `pack/pack.ts`

`$giper_baza_pack` — универсальный бинарный пакет. Используется для:
- Передачи данных между пирами (WebSocket)
- Сохранения в файл (Mine FS)
- Хранения в базе (Mine IDB)

### Структура Pack

```
┌──────────────────────────────────────┐
│ LAND Header (24 bytes)               │  ← Маркер 'LAND' + Land Link + Face count
│ ┌──────────────────────────────────┐ │
│ │ Face 1 (16 bytes)                │ │  ← Peer + Tick + Time + Summ
│ │ Face 2 (16 bytes)                │ │
│ │ ...                              │ │
│ └──────────────────────────────────┘ │
│ ┌──────────────────────────────────┐ │
│ │ Pass Unit (64 bytes)             │ │  ← Публичный ключ
│ │ Seal Unit (variable)             │ │  ← Подпись
│ │ Gift Unit (48 bytes)             │ │  ← Права
│ │ Sand Unit (variable)             │ │  ← Данные
│ │ [Ball] (variable, для big sand)  │ │  ← Большие данные (отдельно)
│ │ ...                              │ │
│ └──────────────────────────────────┘ │
│                                      │
│ LAND Header (для следующего ленда)   │
│ ...                                  │
└──────────────────────────────────────┘
```

### LAND Header (24 bytes)

| Offset | Size | Описание |
|---|---|---|
| 0 | 4 | `LAND` (magic bytes: 76 65 78 68) |
| 4 | 18 | Land Link (Lord 12B + Area 6B) |
| 22 | 2 | Количество Face записей |

### Face Entry (16 bytes)

| Offset | Size | Описание |
|---|---|---|
| 0 | 6 | Peer ID |
| 6 | 2 | Tick |
| 8 | 4 | Time |
| 12 | 4 | Summ (количество юнитов) |

### Pack Part

Семантика содержимого зависит от контекста:
- **Sync (начало):** +Faces -Units — отправляем свой Face
- **Diff (обновление):** -Faces +Units — отправляем недостающие юниты
- **Stop (отписка):** -Faces -Units — отсоединяемся от ленда

MIME type: `application/vnd.giper_baza_pack.v1`

---

## 13. Ссылки (Link)

Файл: `link/link.ts`

`$giper_baza_link` — универсальный идентификатор для Pawn, Land, Lord.

### Формат

Строковое представление: segments separated by `_`, каждый сегмент — 8 символов base64ae (6 байт).

```
{Peer}_{Peer2}              → Lord (12 bytes)
{Peer}_{Peer2}_{Area}       → Land (18 bytes)
{Peer}_{Peer2}_{Area}_{Head} → Pawn (24 bytes)
___Head                      → Относительная ссылка на Pawn
```

**Пустые сегменты** (`AAAAAAAA`) автоматически удаляются. Trailing `_` тоже.

### Методы

```ts
link.peer()        // Первая часть (6 bytes)
link.lord()        // Первые два сегмента (Lord)
link.area()        // Третий сегмент (Area)
link.land()        // Первые три сегмента (Land)
link.head()        // Четвёртый сегмент (Head)
link.relate( base ) // Относительная ссылка: ___Head
link.resolve( base ) // Абсолютная ссылка из относительной
link.toBin()       // Бинарное представление
link.mix( mixin )  // XOR с другим link/bin

$giper_baza_link.from_int( n )     // Из числа (6 bytes)
$giper_baza_link.from_bin( bin )   // Из бинарного
$giper_baza_link.hash_bin( bin )   // SHA-1 хеш (12 bytes)
$giper_baza_link.hash_str( str )   // SHA-1 хеш строки
$giper_baza_link.hole              // Пустой link ('')
```

### Ref

Файл: `ref/ref.ts`

`$giper_baza_ref` = `$giper_baza_link` (алиас для обратной совместимости)

---

## 14. Примитивные типы (Vary)

Файл: `vary/vary.ts`

`$giper_baza_vary_type` — объединение всех поддерживаемых примитивных типов.

### Поддерживаемые типы

| Тип | TypeScript тип | Описание |
|---|---|---|
| none | `null` | Нет данных |
| blob | `Uint8Array` и другие TypedArray | Бинарные данные |
| bool | `boolean` | Логический тип |
| bint | `bigint` | int64 |
| real | `number` | float64 |
| link | `$giper_baza_link` | Ссылка на Pawn/Land/Lord |
| text | `string` | Строка |
| time | `$mol_time_moment` | ISO 8601 момент времени |
| dura | `$mol_time_duration` | ISO 8601 длительность |
| span | `$mol_time_interval` | ISO 8601 интервал |
| dict | `{}` | Plain JS Object |
| list | `any[]` | Plain JS Array |
| elem | `Element` | DOM Element |
| tree | `$mol_tree2` | Abstract Syntax Tree |

### Кастинг (vary/cast/cast.tsx)

Каждый тип имеет функцию каста, которая пытается конвертировать произвольный Vary в нужный тип:

```ts
$giper_baza_vary_cast_text( vary )    // → string | null
$giper_baza_vary_cast_bool( vary )    // → boolean | null
$giper_baza_vary_cast_bint( vary )    // → bigint | null
$giper_baza_vary_cast_real( vary )    // → number | null
$giper_baza_vary_cast_link( vary )    // → $giper_baza_link | null
$giper_baza_vary_cast_time( vary )    // → $mol_time_moment | null
$giper_baza_vary_cast_dura( vary )    // → $mol_time_duration | null
$giper_baza_vary_cast_span( vary )    // → $mol_time_interval | null
$giper_baza_vary_cast_dict( vary )    // → {} | null
$giper_baza_vary_cast_list( vary )    // → any[] | null
$giper_baza_vary_cast_elem( vary )    // → Element | null
$giper_baza_vary_cast_tree( vary )    // → $mol_tree2 | null
$giper_baza_vary_cast_blob( vary )    // → ArrayLike | null
```

### Switch

```ts
$giper_baza_vary_switch( vary, {
    none: v => ...,
    bool: v => ...,
    text: v => ...,
    // ... обработчик для каждого типа
})
```

---

## 15. Flex — динамические схемы

Файл: `flex/flex.ts`

Система для описания сущностей, их схем и свойств в рантайме. Используется для построения универсальных UI-форм.

### Иерархия

```
Seed (глобальный конфиг)
  └── Deck (набор схем)
       ├── Meta 1 (схема сущности)
       │    ├── Props (свойства)
       │    │    ├── Prop: Name (str)
       │    │    ├── Prop: Count (int)
       │    │    └── ...
       │    └── Pulls (наследование от других Meta)
       ├── Meta 2
       └── ...
```

### Классы

#### `$giper_baza_flex_subj` — базовая именованная сущность
```ts
class $giper_baza_flex_subj extends $giper_baza_dict.with({
    Name: $giper_baza_atom_text,
    Icon: $giper_baza_atom_text,
    Hint: $giper_baza_atom_text,
})
// Методы: name(), icon(), hint()
```

#### `$giper_baza_flex_meta` — схема сущности
```ts
// Наследует Subj + добавляет:
//   Pulls: список Meta для наследования
//   Props: список свойств
// Методы: prop_new(), prop_add(), prop_all(), pull_add(), pull_all()
```

#### `$giper_baza_flex_prop` — свойство сущности
```ts
// Наследует Subj + добавляет:
//   Path: ключ хранения
//   Type: тип значения (str, int, bool, link, list, enum, ...)
//   Kind: целевая Meta (для link/list)
//   Enum: варианты значений
//   Base: значение по умолчанию
```

#### `$giper_baza_flex_deck` — набор схем
```ts
// Наследует Subj + добавляет:
//   Metas: список Meta
//   Types: список поддерживаемых типов
// Методы: meta_new(), meta_for()
```

#### `$giper_baza_flex_seed` — глобальный конфиг сети
```ts
// Наследует Subj + добавляет:
//   Deck: ссылка на Deck
//   Peers: список серверов (Peer)
// Методы: deck(), peers()
```

#### `$giper_baza_flex_peer` — пир (сервер)
```ts
// Наследует Subj + добавляет:
//   Urls: список URL адресов
//   Stat: ссылка на статистику
// Методы: urls(), stat()
```

#### `$giper_baza_flex_user` — профиль пользователя
```ts
// Наследует Subj + добавляет:
//   Caret: позиция каретки (для collaborative editing)
```

### Инициализация (`$giper_baza_flex_init`)

Функция создаёт начальную конфигурацию: Seed → Deck → набор базовых Meta (Subj, Meta, Prop, Deck, Seed, Peer, User) с их свойствами.

---

## 16. Файлы (File)

Файл: `file/file.ts`

`$giper_baza_file` — CRDT-файл, хранимый в базе.

```ts
class $giper_baza_file extends $giper_baza_dict.with({
    Name: $giper_baza_atom_text,     // Имя файла
    Type: $giper_baza_atom_text,     // Content-Type
    Chunks: $giper_baza_list_bin,    // Содержимое (список бинарных чанков по 32KB)
})
```

**API:**
```ts
file.name()                // Имя файла
file.name( 'photo.jpg' )   // Установить имя
file.type()                // MIME type
file.type( 'image/jpeg' )  // Установить тип
file.blob()                // Получить как Blob
file.blob( blob )          // Записать из Blob/File
file.buffer()              // Получить как Uint8Array
file.buffer( bytes )       // Записать из Uint8Array (разбивается на чанки по 32KB)
file.str()                 // Прочитать как строку (UTF-8)
file.str( 'hello', 'text/plain' ) // Записать строку
file.json()                // Прочитать как JSON
file.json( data )          // Записать как JSON
file.uri()                 // Персистентный URI файла
file.chunks()              // Все чанки
```

---

## 17. Мониторинг (Stat)

Файл: `app/stat/stat.ts`

### `$giper_baza_app_stat` — статистика сервера

Словарь с полями:

| Поле | Тип | Описание |
|---|---|---|
| `Uptime` | atom_dura | Время работы |
| `Cpu_user` | stat_ranges | CPU (user time, %) |
| `Cpu_system` | stat_ranges | CPU (system time, %) |
| `Mem_used` | stat_ranges | Используемая память (% RSS) |
| `Mem_free` | stat_ranges | Свободная память (% total) |
| `Fs_free` | stat_ranges | Свободное место на ФС (%) |
| `Fs_reads` | stat_ranges | Количество чтений ФС |
| `Fs_writes` | stat_ranges | Количество записей ФС |
| `Port_slaves` | stat_ranges | Количество slave-соединений |
| `Port_masters` | stat_ranges | Количество master-соединений |
| `Land_active` | stat_ranges | Количество активных лендов |
| `Errors` | stat_ranges | Необработанные ошибки |

### `$giper_baza_stat_ranges` — многомасштабная метрика

Файл: `stat/ranges/ranges.ts`

Хранит данные на 5 масштабах: Seconds(60), Minutes(60), Hours(24), Days(31), Months(12).

**Методы:**
- `tick_instant( val )` — моментальное значение (заменяет)
- `tick_integral( val )` — интегральное значение (суммирует)
- `series()` — плоский массив для визуализации

### `$giper_baza_stat_series` — одна шкала метрики

Файл: `stat/series/series.ts`

Circular buffer (атомарный список чисел) с дельта-сжатием.

---

## 18. Бенчмарк (Bench)

Файл: `bench/bench.ts`

Автономный бенчмарк для измерения производительности.

**Параметры:**
- `count` — количество операций (по умолчанию 100)
- `master` — URL мастер-сервера (опционально)

**Измеряемые стадии:**
1. **Making** — создание юнитов + упаковка в пакеты
2. **Applying** — применение пакетов (локально)
3. **Sending** — отправка на сервер (если указан master)
4. **Roundtrip** — полный цикл через сервер

Запуск: через аргументы URL (`?count=1000&master=https://...`)

---

## 19. TypeScript API

### Определение моделей

```ts
// Модель Organ
class $my_organ extends $giper_baza_entity.with({
    // Title: $giper_baza_atom_text  — наследуется от entity
    Critical: $giper_baza_atom_bool,
    Count: $giper_baza_atom_bint,
    Weight: $giper_baza_atom_real,
    Photo: $giper_baza_atom_blob,
    Description: $giper_baza_text,
    Contains: $giper_baza_list_link_to( ()=> $my_organ ),
}) {}

// Enum-модель
class $my_sex extends $giper_baza_atom_enum([ 'male', 'female' ]) {}

// Модель Person с вложенностями и ссылками
class $my_person extends $giper_baza_entity.with({
    Birthday: $giper_baza_atom_time,
    Sex: $my_sex,
    Heart: $my_organ,                                    // Встроенная модель
    Parent: $giper_baza_atom_link_to( ()=> $my_person ), // Ссылка
    Kids: $giper_baza_list_link_to( ()=> $my_person ),   // Список ссылок
}) {
    // Алиас с логикой
    sex( next?: typeof $my_sex.options[number] ) {
        return this.Sex( next )?.val( next ) ?? 'male'
    }
}
```

### Работа с Glob

```ts
class $my_app extends $mol_object {

    // Вся база
    @ $mol_mem
    glob() {
        return new $giper_baza_glob
    }

    // Профиль текущего пользователя
    @ $mol_mem
    hall() {
        return this.glob().home().hall_by( $my_person, $giper_baza_rank_public )
    }

    // Получить сущность по ссылке
    @ $mol_mem_key
    person( ref: $giper_baza_link ) {
        return this.glob().Pawn( ref, $my_person )
    }

    // Добавить связанную сущность
    @ $mol_action
    kid_add( name: string ) {
        const me = this.hall()

        // Создать в новом ленде
        const kid = me.Kids(null)!.remote_make( $giper_baza_rank_public )
        kid.Parent(null)!.remote( me )

        // Заполнить поля
        kid.Title(null)!.val( name )
        kid.Birthday(null)!.val( new $mol_time_moment( '1984-08-04' ) )
        kid.Sex(null)!.val( 'male' )

        // Заполнить встроенную модель
        const heart = kid.Heart(null)!
        heart.Critical(null)!.val( true )
        heart.Count(null)!.val( 1n )
        heart.Weight(null)!.val( 1.4 )
        heart.Description(null)!.text( 'Pumps blood!' )

        return kid
    }
}
```

### DSL-схемы (baza.tree)

Файл: `_example.baza.tree`

```tree
Meetup *
    \Митап
    .Title text
    .Speeches / -> Speech

Speech *
    \Доклад
    .Meetup -> Meetup
    .Title text
    .Descr Text
    .Speaker_snap Speaker_snap

Speaker *
    \Докладчик
    .Name text
    .Photo Blob

Speaker_snap Speaker
    \Снепшот докладчика
    .Live -> Speaker
```

Описание языка (`baza.lang.tree`):

| Синтаксис | Значение |
|---|---|
| `*` | Словарь (Dict) |
| `/` | Список (List) |
| `->` | Ссылка (Link) |
| `text` | Атомарный текст |
| `Text` | Конвергентный текст |
| `Blob` | Конвергентный Blob |
| `blob` | Атомарный blob |
| `bint` | Атомарный BigInt |
| `real` | Атомарный float |
| `time` | Атомарное время |
| `vary` | Атомарный vary |
| `bool` | Атомарный boolean |
| `\` | Комментарий/класс |
| `.` | Свойство |

---

## 20. Серверная часть (Node)

### `$giper_baza_app_node` — серверное приложение

Файл: `app/app.node.ts`

Наследуется от `$mol_rest_resource_fs` — HTTP/WebSocket сервер.

**Обработчики:**
- `OPEN( msg )` — новое WebSocket-соединение: регистрация slave
- `POST( msg )` — входящие бинарные данные: передача в Yard
- `CLOSE( msg )` — закрытие соединения: удаление slave

**Дополнительно:**
- REST endpoint `/link` — возвращает Lord ID сервера
- Автоматическое обновление статистики каждую секунду

### `$giper_baza_app_home` — профиль сервера

Файл: `app/home/home.ts`, `app/home/home.node.ts`

На сервере (`home.node.ts`):
- Устанавливает имя из `GIPER_BAZA_DOMAIN` или hostname
- Устанавливает URL из `GIPER_BAZA_DOMAIN`
- Если задан `GIPER_BAZA_ADMIN`, даёт `rule` права указанному ключу

### Запуск

```ts
// app/run/run.node.ts
$giper_baza_app_node.serve()
process.on( 'SIGTERM', ()=> process.exit(0) )
```

---

## 21. Деплой и инфраструктура

### Docker

Файл: `app/run/Dockerfile`

```dockerfile
FROM node:24-alpine
COPY - /giper/baza
WORKDIR /giper/baza
RUN npm install
ENTRYPOINT [ "node", "node.js", "port=9090", "giper_baza_logs" ]
```

### Docker Compose

Файл: `app/run/docker-compose.yml`

Три сервиса:

1. **baza** — сервер Giper Baza (порт 9090)
   - Образ: `ghcr.io/giper-dev/baza:master`
   - Volumes: `.baza` (данные) + `mol_state_local` (ключи)
   - Переменная `GIPER_BAZA_DOMAIN`

2. **caddy** — reverse proxy с автоматическим TLS
   - caddy-docker-proxy для автоматической конфигурации
   - Сжатие: zstd + gzip

3. **watchtower** — автоматическое обновление контейнеров
   - Интервал: 60 секунд

### CI/CD

Файл: `.github/workflows/giper_baza_app_run.yml`

GitHub Actions:
1. Сборка через `hyoo-ru/mam_build`
2. Деплой статики через `gh-deploy`
3. Сборка и push Docker-образа

**Триггеры:** push, pull_request, schedule (ежедневно в 07:00 UTC)

### Домен

`baza.giper.dev` (файл `app/run/CNAME`)

---

## 22. Сценарии использования

### Exactly-Once обработка задач

#### High Availability (вежливый оптимизм)

1. Клиент создаёт задачу в локальной базе
2. База синхронизируется с обработчиками
3. Обработчик видит задачу и начинает обработку, чекинясь в задаче
4. Обработчики синхронизируются между собой
5. Если другой обработчик зачекинился раньше — задача отменяется
6. Небольшая задержка перед обработкой для синхронизации
7. Падение обработчика → перезапуск → продолжение
8. Таймаут → перехват другим обработчиком

#### Prevent Doubling (шардирование)

Каждый диапазон ID задач закреплён за своим обработчиком. Падение одного обработчика не блокирует остальных.

### Глобальный индекс

Три подхода:
1. **Локальный индекс** — только по локально синхронизированным данным
2. **Shared Index** — дерево лендов с правами на добавление для всех (подвержен спаму)
3. **Index Service** — отдельный микросервис с полной репликацией

### Шардирование (в планах)

Синхронизация лендов через разные кластеры серверов на основе ID ленда. Каждому клиенту — соединение с одним сервером из каждого кластера.

---

## 23. Структура файлов проекта

```
giper/baza/
├── readme.md                    # Краткое описание и API
├── LICENSE                      # MIT License
├── .gitignore
├── .gitattributes
├── _example.baza.tree           # Пример DSL-схемы
├── baza.lang.tree               # Описание языка DSL
│
├── atom/
│   ├── atom.ts                  # Атомарные регистры (LWW)
│   └── atom.test.ts
│
├── list/
│   ├── list.ts                  # Мержабельные списки
│   └── list.test.ts
│
├── dict/
│   ├── dict.ts                  # Мержабельные словари
│   └── dict.test.ts
│
├── text/
│   ├── text.ts                  # Мержабельный текст
│   ├── text.test.ts
│   └── tokens/
│       ├── tokens.ts            # Токенизация текста
│       └── tokens.test.ts
│
├── dom/
│   ├── dom.tsx                  # Мержабельный DOM
│   ├── dom.test.ts
│   └── edit/                    # Редактор DOM
│
├── entity/
│   └── entity.ts                # Entity (Dict + Title)
│
├── empire/
│   ├── empire.ts                # Рекурсивный словарь
│   └── empire.test.ts
│
├── pawn/
│   ├── pawn.ts                  # Базовый Pawn
│   ├── page/                    # UI: страница Pawn
│   └── dump/                    # UI: дамп Pawn
│
├── unit/
│   ├── unit.ts                  # Базовый Unit + сортировка
│   ├── unit.test.ts
│   ├── sand/
│   │   ├── sand.ts              # Unit данных
│   │   └── dump/                # UI: дамп Sand
│   ├── gift/
│   │   └── gift.ts              # Unit прав
│   └── seal/
│       └── seal.ts              # Unit подписи
│
├── glob/
│   ├── glob.ts                  # Глобальная база
│   ├── glob.test.ts
│   ├── glob.meta.tree           # Деплой конфиг
│   └── book/                    # UI: книга Glob
│
├── land/
│   ├── land.ts                  # Автономная часть базы
│   ├── land.test.ts
│   ├── page/                    # UI: страница Land
│   ├── grab/                    # UI: захват Land
│   └── rights/                  # UI: права Land
│
├── auth/
│   ├── auth.ts                  # Приватный/публичный ключи
│   ├── auth.test.ts
│   └── slot/                    # UI: слот аутентификации
│
├── rank/
│   └── rank.ts                  # Система прав
│
├── face/
│   └── face.ts                  # Face Map (векторные часы)
│
├── link/
│   ├── link.ts                  # Ссылки/идентификаторы
│   ├── link.test.ts
│   └── chip/                    # UI: чип ссылки
│
├── ref/
│   └── ref.ts                   # Алиас для Link
│
├── vary/
│   ├── vary.ts                  # Примитивные типы
│   ├── vary.test.tsx
│   └── cast/
│       ├── cast.tsx             # Кастинг типов
│       └── cast.test.ts
│
├── pack/
│   ├── pack.ts                  # Бинарный протокол
│   └── pack.test.ts
│
├── mine/
│   ├── mine.ts                  # Базовый интерфейс хранилища
│   ├── mine.test.ts
│   ├── mine.web.ts              # Подключение IDB
│   ├── mine.node.ts             # Подключение FS
│   ├── idb/
│   │   └── idb.web.ts           # IndexedDB хранилище
│   └── fs/
│       └── fs.node.ts           # FS хранилище (Yin-Yang)
│
├── yard/
│   ├── yard.ts                  # Синхронизатор
│   ├── yard.test.ts
│   └── yard.web.ts              # Браузерный конфиг
│
├── port/
│   └── port.ts                  # Канал связи
│
├── slot/
│   └── slot.ts                  # Виды слотов (enum)
│
├── time/
│   └── time.ts                  # Утилиты времени
│
├── fund/
│   └── fund.ts                  # Реестр Pawn
│
├── flex/
│   ├── flex.ts                  # Динамические схемы
│   ├── form/                    # UI: форма
│   └── field/                   # UI: поле
│
├── file/
│   ├── file.ts                  # CRDT-файл
│   ├── file.test.ts
│   ├── file.meta.tree           # Зависимости
│   └── file.web.ts              # Веб-реализация
│
├── stat/
│   ├── series/
│   │   └── series.ts            # Серия метрик
│   └── ranges/
│       └── ranges.ts            # Многомасштабные метрики
│
├── status/
│   ├── status.view.ts           # UI: статус подключения
│   ├── status.view.tree
│   └── status.view.css
│
├── log/
│   └── log.ts                   # Включение/отключение логов
│
├── bench/
│   └── bench.ts                 # Бенчмарк
│
├── cast/
│   └── cast.test.ts             # Тесты кастинга
│
├── lib/
│   └── lib.meta.tree            # Зависимости библиотеки
│
├── logo/
│   ├── logo.svg
│   └── bg.webp
│
├── diagram/                     # Диаграммы для документации
│
├── app/
│   ├── app.meta.tree            # Деплой конфиг
│   ├── app.web.view.tree        # UI-дерево приложения
│   ├── app.web.view.ts          # Логика приложения
│   ├── app.web.view.css.ts      # Стили приложения
│   ├── app.node.ts              # Серверное приложение
│   ├── home/
│   │   ├── home.ts              # Профиль сервера
│   │   └── home.node.ts         # Серверный профиль
│   ├── stat/
│   │   ├── stat.ts              # Статистика сервера
│   │   └── page/                # UI: страница статистики
│   └── run/
│       ├── run.node.ts          # Точка входа сервера
│       ├── index.html           # Веб-приложение
│       ├── CNAME                # Домен
│       ├── README.md            # Инструкция запуска
│       ├── Dockerfile           # Docker-образ
│       └── docker-compose.yml   # Compose-конфигурация
│
└── .github/
    └── workflows/
        └── giper_baza_app_run.yml  # CI/CD
```

---

## Дополнительные ресурсы

- **Диаграммы** (в папке `diagram/`):
  - `crus-reg.png` — Atomic LWW-Register
  - `crus-list.png` — Ordered List
  - `crus-dict.png` — Ordered Dictionary
  - `crus-tree.png` — Tree
  - `crus-text.png` — Plain Text
  - `crus-dom.png` — DOM
  - `crus-json.png` — JSON
  - `crus-sync.png` — Synchronization Protocol
  - `crus-pack.png` — Pack Format
  - `crus-units.png` — Units Overview
  - `crus-units-pass.png` — Pass Unit
  - `crus-units-gift.png` — Gift Unit
  - `crus-units-sand.png` — Sand Unit
  - `crus-network.png` — Network Architecture
  - `crus-jepsen.png` — Jepsen Guarantees
