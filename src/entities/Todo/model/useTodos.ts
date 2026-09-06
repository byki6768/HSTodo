import { useState } from 'react'
import { loadTodos, saveTodos } from './storage'
import type { Todo } from './types'

/** 할 일 목록 상태와 추가/완료/삭제 동작을 관리한다. */
export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>(() => loadTodos())

  /** 상태를 바꾼 뒤 바로 로컬스토리지에 반영한다. */
  const updateTodos = (updater: (prev: Todo[]) => Todo[]) => {
    setTodos((prev) => {
      const next = updater(prev)
      saveTodos(next)
      return next
    })
  }

  const addTodo = (title: string) => {
    const trimmed = title.trim()
    if (!trimmed) return

    const next: Todo = {
      id: crypto.randomUUID(),
      title: trimmed,
      completed: false,
      createdAt: Date.now(),
    }

    updateTodos((prev) => [next, ...prev])
  }

  const toggleTodo = (id: string) => {
    updateTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    )
  }

  const deleteTodo = (id: string) => {
    updateTodos((prev) => prev.filter((todo) => todo.id !== id))
  }

  return { todos, addTodo, toggleTodo, deleteTodo }
}
