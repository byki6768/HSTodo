import { useState } from 'react'
import type { TodoCategory } from './category'
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

  const addTodo = (title: string, category: TodoCategory, dueDate: string | null) => {
    const trimmed = title.trim()
    if (!trimmed) return

    const next: Todo = {
      id: crypto.randomUUID(),
      title: trimmed,
      completed: false,
      createdAt: Date.now(),
      completedAt: null,
      dueDate,
      category,
    }

    updateTodos((prev) => [next, ...prev])
  }

  const toggleTodo = (id: string) => {
    updateTodos((prev) =>
      prev.map((todo) => {
        if (todo.id !== id) return todo
        const completed = !todo.completed
        return {
          ...todo,
          completed,
          completedAt: completed ? Date.now() : null,
        }
      }),
    )
  }

  const setDueDate = (id: string, dueDate: string | null) => {
    updateTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, dueDate } : todo)),
    )
  }

  const deleteTodo = (id: string) => {
    updateTodos((prev) => prev.filter((todo) => todo.id !== id))
  }

  /** 목록에서 할 일을 다른 항목 앞/뒤로 옮긴다. */
  const reorderTodo = (
    fromId: string,
    toId: string,
    place: 'before' | 'after',
  ) => {
    updateTodos((prev) => {
      if (fromId === toId) return prev
      const fromIndex = prev.findIndex((todo) => todo.id === fromId)
      if (fromIndex < 0) return prev
      const next = [...prev]
      const [item] = next.splice(fromIndex, 1)
      let insertAt = next.findIndex((todo) => todo.id === toId)
      if (insertAt < 0) return prev
      if (place === 'after') insertAt += 1
      next.splice(insertAt, 0, item)
      return next
    })
  }

  /** 일정표에서 할 일을 다른 날짜로 옮기고 그 날 순서에 끼워 넣는다. */
  const moveTodoToDate = (
    id: string,
    dueDate: string,
    beforeId: string | null,
  ) => {
    updateTodos((prev) => {
      const fromIndex = prev.findIndex((todo) => todo.id === id)
      if (fromIndex < 0) return prev
      const next = [...prev]
      const [item] = next.splice(fromIndex, 1)
      const updated = { ...item, dueDate }

      if (beforeId) {
        let insertAt = next.findIndex((todo) => todo.id === beforeId)
        if (insertAt < 0) insertAt = next.length
        next.splice(insertAt, 0, updated)
        return next
      }

      let insertAt = next.length
      for (let index = next.length - 1; index >= 0; index -= 1) {
        if (next[index].dueDate === dueDate) {
          insertAt = index + 1
          break
        }
      }
      next.splice(insertAt, 0, updated)
      return next
    })
  }

  return {
    todos,
    addTodo,
    toggleTodo,
    setDueDate,
    deleteTodo,
    reorderTodo,
    moveTodoToDate,
  }
}
