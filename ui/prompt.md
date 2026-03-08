@tasks/tasks.json @progress.md
При написании view.tree, view.ts и view.css.ts .meta.tree кода ОБЯЗАТЕЛЬНО используй /mol — вызови навык mol через Skill tool.
При написании стилей .view.css.ts ОБЯЗАТЕЛЬНО сначала прочитай правила в /Users/cmyser/code/mam/bog/mol/references/MOL_QUICK_START.md секция Стилизация.
as any в стилях ЗАПРЕЩЁН. rgba ЗАПРЕЩЁН, используй hex #rrggbbaa. Padding shorthand-строки ЗАПРЕЩЕНЫ, используй объект top/bottom/left/right.
setTimeout и setInterval ЗАПРЕЩЕНЫ. Никаких таймеров!

РАБОТАЙ ТОЛЬКО НАД ЗАДАЧЕЙ __TASK_ID__. Не выбирай другую задачу!

Порядок работы, СТРОГО по шагам, НЕ пропускай ни один:

1. Реализуй задачу __TASK_ID__.

2. БИЛД — запусти и ВНИМАТЕЛЬНО прочитай вывод:
   cd /Users/cmyser/code/mam && npm exec mam bog/ui/app 2>&1
   Проверь вывод команды: если есть error TS — билд СЛОМАН. ИСПРАВЬ ошибки и запусти снова.
   Повторяй пока вывод билда не будет без error TS.

3. АУДИТ — ОБЯЗАТЕЛЬНО прочитай файл и проверь содержимое:
   cat /Users/cmyser/code/mam/bog/ui/app/-/web.audit.js
   Файл ДОЛЖЕН содержать Audit passed. Если содержит Audit fail или error TS — ИСПРАВЬ все ошибки и повтори билд шаг 2.
   НЕ ПЕРЕХОДИ к шагу 4 пока в файле не будет Audit passed!
   ОБЯЗАТЕЛЬНО выполни ОБА шага: проверь вывод билда И содержимое web.audit.js!

4. ТОЛЬКО ПОСЛЕ Audit passed — делай git add, git commit, git push.
   Если ты делаешь push БЕЗ Audit passed — это баг, ты сломал прод.

5. Обнови TASK в tasks.json. Поставь статус done если задача выполнена.
6. Добавь прогресс в файл progress.md, заметка для следующей итерации.

ЗАПРЕТ: commit/push БЕЗ Audit passed в web.audit.js = КРИТИЧЕСКАЯ ОШИБКА

Если задача полностью выполнена, выведи RALPH_COMPLETE.
Если задача слишком большая и ты не можешь завершить её за одну итерацию, выведи RALPH_PARTIAL и опиши в progress.md что осталось.
