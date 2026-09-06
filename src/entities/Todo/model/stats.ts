import type { Todo } from './types'

export type TodoStats = {
  total: number
  completed: number
  todayCompleted: number
  rate: number
}

function startOfToday() {
  const now = new Date()
  return new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime()
}

/** 오늘 완료 개수와 전체 완료율을 계산한다. */
export function getTodoStats(todos: Todo[]): TodoStats {
  const today = startOfToday()
  const completed = todos.filter((todo) => todo.completed).length
  const todayCompleted = todos.filter(
    (todo) =>
      todo.completed &&
      todo.completedAt !== null &&
      todo.completedAt >= today,
  ).length
  const total = todos.length
  const rate = total === 0 ? 0 : Math.round((completed / total) * 100)

  return { total, completed, todayCompleted, rate }
}
