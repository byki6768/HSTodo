import type { DragEvent, ReactNode } from 'react'
import { isOverdue } from '../model/date'
import type { Todo } from '../model/types'
import { CategoryBadge } from './CategoryBadge'
import './TodoItem.css'

type TodoItemProps = {
  todo: Todo
  handle: ReactNode
  leading: ReactNode
  dueDate: ReactNode
  trailing: ReactNode
  dragging: boolean
  dragOver: 'before' | 'after' | null
  onDragStart: (event: DragEvent<HTMLLIElement>) => void
  onDragOver: (event: DragEvent<HTMLLIElement>) => void
  onDragLeave: () => void
  onDrop: (event: DragEvent<HTMLLIElement>) => void
  onDragEnd: () => void
}

export function TodoItem({
  todo,
  handle,
  leading,
  dueDate,
  trailing,
  dragging,
  dragOver,
  onDragStart,
  onDragOver,
  onDragLeave,
  onDrop,
  onDragEnd,
}: TodoItemProps) {
  const overdue = isOverdue(todo.dueDate, todo.completed)
  const className = [
    'todoItem',
    todo.completed ? 'todoItem--completed' : '',
    overdue ? 'todoItem--overdue' : '',
    dragging ? 'todoItem--dragging' : '',
    dragOver === 'before' ? 'todoItem--dropBefore' : '',
    dragOver === 'after' ? 'todoItem--dropAfter' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <li
      className={className}
      draggable
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      onDragEnd={onDragEnd}
    >
      {handle}
      {leading}
      <div className="todoItem__main">
        <CategoryBadge category={todo.category} />
        <p className="todoItem__title">{todo.title}</p>
      </div>
      {dueDate}
      {trailing}
    </li>
  )
}
