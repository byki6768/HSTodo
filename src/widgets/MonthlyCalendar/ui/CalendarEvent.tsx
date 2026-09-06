import type { DragEvent, KeyboardEvent, MouseEvent } from 'react'
import { isOverdue, type Todo } from '@/entities/Todo'
import './CalendarEvent.css'

type CalendarEventProps = {
  todo: Todo
  dragging: boolean
  dragOver: 'before' | 'after' | null
  expanded?: boolean
  onDragStart: (event: DragEvent<HTMLDivElement>, id: string) => void
  onDragOver: (event: DragEvent<HTMLDivElement>, id: string) => void
  onDragLeave: () => void
  onDrop: (event: DragEvent<HTMLDivElement>, id: string) => void
  onDragEnd: () => void
  onOpen: (todo: Todo) => void
}

export function CalendarEvent({
  todo,
  dragging,
  dragOver,
  expanded = false,
  onDragStart,
  onDragOver,
  onDragLeave,
  onDrop,
  onDragEnd,
  onOpen,
}: CalendarEventProps) {
  const overdue = isOverdue(todo.dueDate, todo.completed)
  const className = [
    'calendarEvent',
    `calendarEvent--${todo.category}`,
    todo.completed ? 'calendarEvent--completed' : '',
    overdue ? 'calendarEvent--overdue' : '',
    dragging ? 'calendarEvent--dragging' : '',
    expanded ? 'calendarEvent--expanded' : '',
    dragOver === 'before' ? 'calendarEvent--dropBefore' : '',
    dragOver === 'after' ? 'calendarEvent--dropAfter' : '',
  ]
    .filter(Boolean)
    .join(' ')

  const open = () => {
    if (dragging) return
    onOpen(todo)
  }

  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation()
    open()
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'Enter' && event.key !== ' ') return
    event.preventDefault()
    event.stopPropagation()
    open()
  }

  return (
    <div
      role="button"
      tabIndex={0}
      className={className}
      title={`${todo.title} · 클릭하면 전체 내용을 볼 수 있어요`}
      draggable
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onDragStart={(event) => onDragStart(event, todo.id)}
      onDragOver={(event) => onDragOver(event, todo.id)}
      onDragLeave={onDragLeave}
      onDrop={(event) => onDrop(event, todo.id)}
      onDragEnd={onDragEnd}
    >
      {todo.title}
    </div>
  )
}
