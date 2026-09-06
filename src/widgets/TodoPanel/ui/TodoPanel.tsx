import { useTodos } from '@/entities/Todo'
import { AddTodoForm } from '@/features/AddTodo'
import { TodoList } from './TodoList'
import './TodoPanel.css'

export function TodoPanel() {
  const { todos, addTodo, toggleTodo, deleteTodo } = useTodos()

  return (
    <div className="todoPanel">
      <AddTodoForm onAdd={addTodo} />
      <TodoList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} />
    </div>
  )
}
