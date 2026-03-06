@tasks.json @progress.md

ты работаешь в папке bog/docs

## ПЕРВЫЙ ШАГ — ВЫЗОВИ НАВЫК $mol

ПЕРЕД НАПИСАНИЕМ ЛЮБОГО КОДА ты ОБЯЗАН вызвать навык mol:
Skill(mol)
Это даст тебе правильный контекст для view.tree, view.ts, view.css.ts, meta.tree.
БЕЗ вызова навыка ты БУДЕШЬ писать неправильный код. Вызови навык ПЕРВЫМ ДЕЛОМ.

## Правила стилей

- ОБЯЗАТЕЛЬНО прочитай /Users/cmyser/code/mam/bog/mol/references/MOL_QUICK_START.md секция Стилизация
- `as any` в стилях ЗАПРЕЩЁН
- `rgba()` ЗАПРЕЩЁН, используй hex `#rrggbbaa`
- Padding shorthand-строки ЗАПРЕЩЕНЫ (`'0.5rem 1rem'` ❌), используй объект `{top, bottom, left, right}` ✅

РАБОТАЙ ТОЛЬКО НАД ЗАДАЧЕЙ **TASK_ID**. Не выбирай другую задачу!

## КРИТИЧЕСКОЕ ПРАВИЛО БИЛДА

MAM — монорепозиторий. Билд ВСЕГДА запускается из КОРНЯ `/Users/cmyser/code/mam`.

**ЗАПРЕЩЕНО** запускать npm/npx/mam из `/Users/cmyser/code/mam/bog/docs/` или любой поддиректории!
Если запустить mam из поддиректории — MAM склонирует ВЕСЬ репозиторий (mol/, node/, bog/, .git/, package.json, tsconfig.json и десятки других файлов) внутрь этой папки. Это КРИТИЧЕСКАЯ ОШИБКА, которая засирает проект мусором.

```
ЗАПРЕЩЕНО: cd bog/docs && npx mam app                                    ← СЛОМАЕТ ВСЁ
ЗАПРЕЩЕНО: cd /Users/cmyser/code/mam/bog/docs && npm exec mam app        ← СЛОМАЕТ ВСЁ
ЗАПРЕЩЕНО: npm exec --prefix /Users/cmyser/code/mam/bog/docs mam app     ← СЛОМАЕТ ВСЁ
ПРАВИЛЬНО: cd /Users/cmyser/code/mam && npm exec mam bog/docs/app        ← ТОЛЬКО ТАК
```

Если ты видишь что в `bog/docs/` появились папки `mol/`, `node/`, `bog/`, файлы `package.json`, `tsconfig.json`, `.git/` — ты СЛОМАЛ БИЛД. Удали ВЕСЬ мусор:

```
rm -rf /Users/cmyser/code/mam/bog/docs/{mol,node,bog,.git,.editorconfig,.gitattributes,.gitpod.yml,.meta.tree,.npmrc,.prettierrc.json,.vscode,LICENSE,README.md,_logo.png,_logo.svg,lang.lang.tree,mam.jam.js,mam.ts,meta.lang.tree,package.json,sandbox.config.json,tsconfig.json,tsfmt.json}
```

## Порядок работы — СТРОГО по шагам

1. **НАВЫК**: Вызови `Skill(mol)` — получи контекст $mol.

2. **РЕАЛИЗАЦИЯ**: Реализуй задачу **TASK_ID**.

3. **БИЛД** — запусти СТРОГО эту команду:

    ```
    cd /Users/cmyser/code/mam && npm exec mam bog/docs/app 2>&1
    ```

    Проверь вывод: если есть `error TS` — ИСПРАВЬ и запусти снова. Повторяй пока чисто.

4. **АУДИТ** — прочитай файл:

    ```
    cat /Users/cmyser/code/mam/bog/docs/app/-/web.audit.js
    ```

    Файл ДОЛЖЕН содержать `Audit passed`. Если `Audit fail` — ИСПРАВЬ и повтори шаг 3.

5. **КОММИТ** — ТОЛЬКО ПОСЛЕ Audit passed:

    ```
    cd /Users/cmyser/code/mam && git add bog/docs/ && git commit -m "..."
    ```

    Push БЕЗ Audit passed = КРИТИЧЕСКАЯ ОШИБКА.

6. **ОБНОВИ** tasks.json (status → done) и progress.md.

## Результат — КРИТИЧЕСКИ ВАЖНО

После выполнения всех шагов ОБЯЗАТЕЛЬНО выведи одну из этих строк — БЕЗ этого задача будет считаться ПРОВАЛЕННОЙ:

- Задача выполнена полностью → выведи `RALPH_COMPLETE`
- Задача слишком большая → выведи `RALPH_PARTIAL`, опиши в progress.md что осталось

⚠️ ПОСЛЕДНЕЕ СООБЩЕНИЕ в твоём ответе ОБЯЗАНО содержать `RALPH_COMPLETE` или `RALPH_PARTIAL`. Если ты этого не сделаешь — вся работа будет потеряна и задача будет считаться неудачной!
