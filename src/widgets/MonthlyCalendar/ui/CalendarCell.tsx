import type { DragEvent } from 'react'
import { CalendarEvent } from './CalendarEvent'
import type { Todo } from '@/entities/Todo'
import { allowTodoDrop } from '@/features/ReorderTodo'
import './CalendarCell.css'

type CalendarCellProps = {
  dateKey: string
  day: number
  inMonth: boolean
  isToday: boolean
  isSunday: boolean
  alignEnd: boolean
  todos: Todo[]
  expanded: boolean
  draggingId: string | null
  overEventId: string | null
  overPlace: 'before' | 'after'
  cellOver: boolean
  onHover: (dateKey: string | null) => void
  onPin: (dateKey: string) => void
  onOpenTodo: (todo: Todo) => void
  onDragStart: (event: DragEvent<HTMLDivElement>, id: string) => void
  onEventDragOver: (event: DragEvent<HTMLDivElement>, id: string) => void
  onEventDragLeave: () => void
  onEventDrop: (event: DragEvent<HTMLDivElement>, id: string) => void
  onCellDragOver: (event: DragEvent<HTMLDivElement>) => void
  onCellDragLeave: () => void
  onCellDrop: (event: DragEvent<HTMLDivElement>) => void
  onDragEnd: () => void
}

const MAX_VISIBLE = 3

export function CalendarCell({
  dateKey,
  day,
  inMonth,
  isToday,
  isSunday,
  alignEnd,
  todos,
  expanded,
  draggingId,
  overEventId,
  overPlace,
  cellOver,
  onHover,
  onPin,
  onOpenTodo,
  onDragStart,
  onEventDragOver,
  onEventDragLeave,
  onEventDrop,
  onCellDragOver,
  onCellDragLeave,
  onCellDrop,
  onDragEnd,
}: CalendarCellProps) {
  const preview = todos.slice(0, MAX_VISIBLE)
  const extra = todos.length - preview.length
  const className = [
    'calendarCell',
    inMonth ? '' : 'calendarCell--muted',
    isToday ? 'calendarCell--today' : '',
    cellOver ? 'calendarCell--drop' : '',
    expanded ? 'calendarCell--expanded' : '',
    alignEnd ? 'calendarCell--alignEnd' : '',
  ]
    .filter(Boolean)
    .join(' ')

  const eventProps = {
    draggingId,
    overEventId,
    overPlace,
    onDragStart,
    onEventDragOver,
    onEventDragLeave,
    onEventDrop,
    onDragEnd,
    onOpenTodo,
  }

  return (
    <div
      className={className}
      data-date-key={dateKey}
      onMouseEnter={() => onHover(dateKey)}
      onMouseLeave={() => onHover(null)}
      onDragOver={(event) => {
        allowTodoDrop(event)
        onCellDragOver(event)
      }}
      onDragLeave={onCellDragLeave}
      onDrop={onCellDrop}
    >
      <span
        className={`calendarCell__day ${isSunday ? 'calendarCell__day--sunday' : ''} ${
          isToday ? 'calendarCell__day--today' : ''
        }`}
      >
        {day}
      </span>
      <div className="calendarCell__events">
        {preview.map((todo) => (
          <CalendarEvent
            key={todo.id}
            todo={todo}
            dragging={eventProps.draggingId === todo.id}
            dragOver={eventProps.overEventId === todo.id ? eventProps.overPlace : null}
            onDragStart={eventProps.onDragStart}
            onDragOver={eventProps.onEventDragOver}
            onDragLeave={eventProps.onEventDragLeave}
            onDrop={eventProps.onEventDrop}
            onDragEnd={eventProps.onDragEnd}
            onOpen={eventProps.onOpenTodo}
          />
        ))}
        {extra > 0 ? (
          <button
            type="button"
            className="calendarCell__more"
            onClick={(event) => {
              event.stopPropagation()
              onPin(dateKey)
            }}
          >
            +{extra}개 더보기
          </button>
        ) : null}
      </div>
      {expanded && todos.length > 0 ? (
        <div className="calendarCell__popover">
          <p className="calendarCell__popoverTitle">{day}일 할 일 {todos.length}개</p>
          {todos.map((todo) => (
            <CalendarEvent
              key={`full-${todo.id}`}
              todo={todo}
              expanded
              dragging={eventProps.draggingId === todo.id}
              dragOver={eventProps.overEventId === todo.id ? eventProps.overPlace : null}
              onDragStart={eventProps.onDragStart}
              onDragOver={eventProps.onEventDragOver}
              onDragLeave={eventProps.onEventDragLeave}
              onDrop={eventProps.onEventDrop}
              onDragEnd={eventProps.onDragEnd}
              onOpen={eventProps.onOpenTodo}
            />
          ))}
        </div>
      ) : null}
    </div>
  )
}
