import { loadJson, saveJson } from '@/shared'
import { isTodoCategory } from './category'
import { isDateKey } from './date'
import type { Todo } from './types'

const STORAGE_KEY = 'hstodo.todos'

function isTodoRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

/** 예전 데이터에 카테고리가 없으면 개인으로 맞춘다. */
function normalizeTodo(value: unknown): Todo | null {
  if (!isTodoRecord(value)) return null
  if (
    typeof value.id !== 'string' ||
    typeof value.title !== 'string' ||
    typeof value.completed !== 'boolean' ||
    typeof value.createdAt !== 'number'
  ) {
    return null
  }

  return {
    id: value.id,
    title: value.title,
    completed: value.completed,
    createdAt: value.createdAt,
    category: isTodoCategory(value.category) ? value.category : 'personal',
    completedAt:
      typeof value.completedAt === 'number' ? value.completedAt : null,
    dueDate: isDateKey(value.dueDate) ? value.dueDate : null,
  }
}

/** 저장된 할 일 목록을 불러온다. 형식이 깨진 값은 버린다. */
export function loadTodos(): Todo[] {
  const data = loadJson<unknown>(STORAGE_KEY, [])
  if (!Array.isArray(data)) return []
  return data.flatMap((item) => {
    const todo = normalizeTodo(item)
    return todo ? [todo] : []
  })
}

/** 할 일 목록을 로컬스토리지에 저장한다. */
export function saveTodos(todos: Todo[]): void {
  saveJson(STORAGE_KEY, todos)
}
