import type { Todo } from '@/entities/Todo'
import './ToggleTodo.css'

type ToggleTodoProps = {
  todo: Todo
  onToggle: (id: string) => void
}

export function ToggleTodo({ todo, onToggle }: ToggleTodoProps) {
  const className = ['toggleTodo', todo.completed ? 'toggleTodo--checked' : '']
    .filter(Boolean)
    .join(' ')

  return (
    <button
      type="button"
      className={className}
      aria-pressed={todo.completed}
      aria-label={todo.completed ? '완료 취소' : '완료로 표시'}
      onClick={() => onToggle(todo.id)}
    >
      <svg viewBox="0 0 16 16" aria-hidden="true">
        <path
          d="M3.5 8.2 6.4 11l6.1-6.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  )
}
