import { useState } from 'react'
import type { CategoryFilter, Todo, TodoCategory } from '@/entities/Todo'
import { AddTodoForm } from '@/features/AddTodo'
import { CategoryFilter as CategoryFilterTabs } from '@/features/FilterTodo'
import { TodoList } from './TodoList'
import './TodoPanel.css'

type TodoPanelProps = {
  todos: Todo[]
  addTodo: (title: string, category: TodoCategory, dueDate: string | null) => void
  toggleTodo: (id: string) => void
  setDueDate: (id: string, dueDate: string | null) => void
  deleteTodo: (id: string) => void
  reorderTodo: (fromId: string, toId: string, place: 'before' | 'after') => void
}

export function TodoPanel({
  todos,
  addTodo,
  toggleTodo,
  setDueDate,
  deleteTodo,
  reorderTodo,
}: TodoPanelProps) {
  const [filter, setFilter] = useState<CategoryFilter>('all')

  const visibleTodos =
    filter === 'all' ? todos : todos.filter((todo) => todo.category === filter)

  return (
    <div className="todoPanel">
      <AddTodoForm onAdd={addTodo} />
      <CategoryFilterTabs todos={todos} value={filter} onChange={setFilter} />
      <TodoList
        todos={visibleTodos}
        isFiltered={filter !== 'all'}
        onToggle={toggleTodo}
        onSetDueDate={setDueDate}
        onDelete={deleteTodo}
        onReorder={reorderTodo}
      />
    </div>
  )
}
