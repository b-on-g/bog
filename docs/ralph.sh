#!/bin/bash
set -e

CHILD_PID=""

cleanup() {
    echo -e "\n  -> Прервано (Ctrl+C)"
    if [[ -n "$CHILD_PID" ]] && kill -0 "$CHILD_PID" 2>/dev/null; then
        kill -TERM "$CHILD_PID" 2>/dev/null
        wait "$CHILD_PID" 2>/dev/null
    fi
    [[ -n "${RESULT_FILE:-}" ]] && rm -f "$RESULT_FILE"
    exit 130
}

trap cleanup INT TERM

TASKS_FILE="tasks.json"
PROMPT_FILE="prompt.md"
COOLDOWN=14400

resolve_agent() {
    if [[ -n "${RALPH_AGENT:-}" ]]; then
        echo "$RALPH_AGENT"
        return 0
    fi
    if command -v claude >/dev/null 2>&1; then
        echo "claude"
        return 0
    fi
    if command -v codex >/dev/null 2>&1; then
        echo "codex"
        return 0
    fi
    return 1
}

run_agent() {
    local agent="$1"
    local prompt="$2"
    local out_file="$3"

    case "$agent" in
        claude)
            claude --permission-mode acceptEdits -p "$prompt" > "$out_file" 2>&1 &
            CHILD_PID=$!
            wait "$CHILD_PID"
            local exit_code=$?
            CHILD_PID=""
            return $exit_code
            ;;
        codex)
            local codex_msg
            codex_msg="$(mktemp -t ralph_codex.XXXXXX)"
            codex exec --full-auto --color never -C "$PWD" --output-last-message "$codex_msg" "$prompt" > "$out_file" 2>&1 &
            CHILD_PID=$!
            wait "$CHILD_PID"
            local exit_code=$?
            CHILD_PID=""
            cat "$codex_msg" >> "$out_file"
            rm -f "$codex_msg"
            return $exit_code
            ;;
        *)
            echo "Unsupported agent: $agent" >&2
            return 1
            ;;
    esac
}

has_pending_tasks() {
    pending_count=$(grep -c '"status": "pending"' "$TASKS_FILE" 2>/dev/null) || pending_count=0
    [ "$pending_count" -gt 0 ]
}

get_next_task_id() {
    python3 -c "
import json
with open('$TASKS_FILE') as f:
    data = json.load(f)
priority_order = {'critical': 0, 'high': 1, 'medium': 2, 'low': 3}
pending = [t for t in data['tasks'] if t['status'] == 'pending']
pending.sort(key=lambda t: priority_order.get(t.get('priority','low'), 4))
if pending:
    print(pending[0]['id'])
" 2>/dev/null || echo ""
}

get_task_info() {
    local task_id="$1"
    python3 -c "
import json
with open('$TASKS_FILE') as f:
    data = json.load(f)
for t in data['tasks']:
    if t['id'] == '${task_id}':
        print(f\"{t['id']}: {t['description']}\")
        break
" 2>/dev/null || echo "$task_id"
}

build_prompt() {
    local task_id="$1"
    sed "s/__TASK_ID__/${task_id}/g" "$PROMPT_FILE"
}

iteration=1
completed_tasks=""
completed_count=0
skipped_tasks=""
skipped_count=0

while has_pending_tasks; do
    next_id=$(get_next_task_id)

    if [[ -z "$next_id" ]]; then
        break
    fi

    next_info=$(get_task_info "$next_id")
    remaining=$(grep -c '"status": "pending"' "$TASKS_FILE" 2>/dev/null) || remaining=0

    echo "[$iteration] $next_info (осталось $remaining)"

    agent=$(resolve_agent) || {
        echo "Не найден поддерживаемый агент. Установите 'claude' или 'codex', либо задайте RALPH_AGENT." >&2
        exit 1
    }

    prompt=$(build_prompt "$next_id")

    RESULT_FILE="$(mktemp -t ralph_result.XXXXXX)"
    if ! run_agent "$agent" "$prompt" "$RESULT_FILE"; then
        result=$(cat "$RESULT_FILE")
        rm -f "$RESULT_FILE"
        RESULT_FILE=""
        if echo "$result" | grep -qi "rate\|limit\|usage\|capacity\|throttl\|429\|too many"; then
            echo "  -> Rate limit! Жду ${COOLDOWN}с (4 часа)..."
            echo "  -> Пауза до: $(date -v+${COOLDOWN}S '+%H:%M:%S' 2>/dev/null || date -d "+${COOLDOWN} seconds" '+%H:%M:%S' 2>/dev/null || echo '~4ч')"
            sleep "$COOLDOWN"
            echo "  -> Пауза окончена, продолжаю"
            ((iteration++))
            continue
        else
            echo "  -> Агент упал с ошибкой"
            echo "  -> $result" | head -5
            skipped_tasks="${skipped_tasks}  - ${next_info}\n"
            ((skipped_count++))
        fi
    else
        result=$(cat "$RESULT_FILE")
        rm -f "$RESULT_FILE"
        RESULT_FILE=""
    fi

    if [[ "$result" == *"RALPH_COMPLETE"* ]]; then
        # Подстраховка: пометить done если агент забыл
        python3 -c "
import json
with open('$TASKS_FILE') as f:
    data = json.load(f)
for t in data['tasks']:
    if t['id'] == '${next_id}':
        t['status'] = 'done'
        break
with open('$TASKS_FILE', 'w') as f:
    json.dump(data, f, ensure_ascii=False, indent='\t')
    f.write('\n')
" 2>/dev/null
        completed_tasks="${completed_tasks}  + ${next_info}\n"
        ((completed_count++))
        echo "  -> done"
    elif [[ "$result" == *"RALPH_PARTIAL"* ]]; then
        echo "  -> partial (прогресс записан)"
        skipped_tasks="${skipped_tasks}  ~ ${next_info} (partial)\n"
        ((skipped_count++))
    else
        echo "  -> нет RALPH_COMPLETE, пропускаю"
        skipped_tasks="${skipped_tasks}  - ${next_info}\n"
        ((skipped_count++))
    fi

    ((iteration++))
done

# === Финальный отчёт ===
echo ""
echo "==========================================="
echo "  Ralph завершил работу. Итераций: $((iteration-1))"
echo "==========================================="

if [ "$completed_count" -gt 0 ]; then
    echo ""
    echo "Выполнено ($completed_count):"
    printf "$completed_tasks"
fi

if [ "$skipped_count" -gt 0 ]; then
    echo ""
    echo "Пропущено ($skipped_count):"
    printf "$skipped_tasks"
fi

remaining=$(grep -c '"status": "pending"' "$TASKS_FILE" 2>/dev/null) || remaining=0
done_total=$(grep -c '"status": "done"' "$TASKS_FILE" 2>/dev/null) || done_total=0
echo ""
echo "Итого: done=$done_total, pending=$remaining"
echo "==========================================="

if [ "$remaining" -eq 0 ]; then
    say -v Milena "Хозяин, я всё сделалъ!"
else
    say -v Milena "Хозяин, я закончилъ. Выполнено $completed_count, пропущено $skipped_count, осталось $remaining."
fi
