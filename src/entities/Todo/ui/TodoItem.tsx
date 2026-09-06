import type { ReactNode } from 'react'
import type { Todo } from '../model/types'
import './TodoItem.css'

type TodoItemProps = {
  todo: Todo
  leading: ReactNode
  trailing: ReactNode
}

export function TodoItem({ todo, leading, trailing }: TodoItemProps) {
  const className = ['todoItem', todo.completed ? 'todoItem--completed' : '']
    .filter(Boolean)
    .join(' ')

  return (
    <li className={className}>
      {leading}
      <p className="todoItem__title">{todo.title}</p>
      {trailing}
    </li>
  )
}
