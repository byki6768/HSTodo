import { loadJson, saveJson } from '@/shared'
import type { Todo } from './types'

const STORAGE_KEY = 'hstodo.todos'

function isTodo(value: unknown): value is Todo {
  if (typeof value !== 'object' || value === null) return false

  const todo = value as Todo
  return (
    typeof todo.id === 'string' &&
    typeof todo.title === 'string' &&
    typeof todo.completed === 'boolean' &&
    typeof todo.createdAt === 'number'
  )
}

/** 저장된 할 일 목록을 불러온다. 형식이 깨진 값은 버린다. */
export function loadTodos(): Todo[] {
  const data = loadJson<unknown>(STORAGE_KEY, [])
  if (!Array.isArray(data)) return []
  return data.filter(isTodo)
}

/** 할 일 목록을 로컬스토리지에 저장한다. */
export function saveTodos(todos: Todo[]): void {
  saveJson(STORAGE_KEY, todos)
}
