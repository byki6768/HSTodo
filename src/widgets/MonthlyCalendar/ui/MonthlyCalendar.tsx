import { useMemo, useRef, useState, type DragEvent } from 'react'
import { getMonthCells, todayKey, type Todo } from '@/entities/Todo'
import { TodoDetailModal } from '@/features/ViewTodo'
import {
  allowTodoDrop,
  dropPlaceFromPoint,
  getDraggedTodoId,
  setDraggedTodoId,
} from '@/features/ReorderTodo'
import { CalendarCell } from './CalendarCell'
import './MonthlyCalendar.css'

type MonthlyCalendarProps = {
  todos: Todo[]
  onMoveToDate: (id: string, dueDate: string, beforeId: string | null) => void
}

const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토']

export function MonthlyCalendar({ todos, onMoveToDate }: MonthlyCalendarProps) {
  const now = new Date()
  const [year, setYear] = useState(now.getFullYear())
  const [month, setMonth] = useState(now.getMonth())
  const [draggingId, setDraggingId] = useState<string | null>(null)
  const [overEventId, setOverEventId] = useState<string | null>(null)
  const [overPlace, setOverPlace] = useState<'before' | 'after'>('before')
  const [overDate, setOverDate] = useState<string | null>(null)
  const [hoveredDate, setHoveredDate] = useState<string | null>(null)
  const [pinnedDate, setPinnedDate] = useState<string | null>(null)
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null)
  const skipClickRef = useRef(false)
  const today = todayKey()

  const cells = useMemo(() => getMonthCells(year, month), [year, month])

  const todosByDate = useMemo(() => {
    const map = new Map<string, Todo[]>()
    for (const todo of todos) {
      if (!todo.dueDate) continue
      const list = map.get(todo.dueDate) ?? []
      list.push(todo)
      map.set(todo.dueDate, list)
    }
    return map
  }, [todos])

  const moveMonth = (delta: number) => {
    const next = new Date(year, month + delta, 1)
    setYear(next.getFullYear())
    setMonth(next.getMonth())
  }

  const goToday = () => {
    const current = new Date()
    setYear(current.getFullYear())
    setMonth(current.getMonth())
  }

  const clearDrag = () => {
    setDraggingId(null)
    setOverEventId(null)
    setOverDate(null)
  }

  const handleEventDragStart = (
    event: DragEvent<HTMLDivElement>,
    id: string,
  ) => {
    skipClickRef.current = true
    setDraggedTodoId(event, id)
    setDraggingId(id)
  }

  const handleEventDragOver = (
    event: DragEvent<HTMLDivElement>,
    id: string,
  ) => {
    if (!draggingId || draggingId === id) return
    event.stopPropagation()
    allowTodoDrop(event)
    setOverEventId(id)
    setOverPlace(dropPlaceFromPoint(event))
    setOverDate(null)
  }

  const handleEventDrop = (
    event: DragEvent<HTMLDivElement>,
    targetId: string,
  ) => {
    event.preventDefault()
    event.stopPropagation()
    const fromId = getDraggedTodoId(event) || draggingId
    const target = todos.find((todo) => todo.id === targetId)
    if (!fromId || !target?.dueDate || fromId === targetId) {
      clearDrag()
      return
    }
    const place = dropPlaceFromPoint(event)
    const dayTodos = todosByDate.get(target.dueDate) ?? []
    const targetIndex = dayTodos.findIndex((todo) => todo.id === targetId)
    const nextTodo =
      place === 'after' ? (dayTodos[targetIndex + 1] ?? null) : dayTodos[targetIndex]
    const beforeId =
      nextTodo && nextTodo.id !== fromId ? nextTodo.id : null
    onMoveToDate(fromId, target.dueDate, beforeId)
    clearDrag()
  }

  const handleCellDrop = (event: DragEvent<HTMLDivElement>, dateKey: string) => {
    event.preventDefault()
    const fromId = getDraggedTodoId(event) || draggingId
    if (!fromId) return
    onMoveToDate(fromId, dateKey, null)
    clearDrag()
  }

  const handleOpenTodo = (todo: Todo) => {
    if (skipClickRef.current) return
    setSelectedTodo(todo)
  }

  const handleHover = (dateKey: string | null) => {
    setHoveredDate(dateKey)
    if (dateKey && pinnedDate && dateKey !== pinnedDate) {
      setPinnedDate(null)
    }
  }

  const handlePin = (dateKey: string) => {
    setPinnedDate((current) => (current === dateKey ? null : dateKey))
  }

  const handleDragEnd = () => {
    clearDrag()
    window.setTimeout(() => {
      skipClickRef.current = false
    }, 0)
  }

  return (
    <section className="monthlyCalendar" aria-label="월간 일정표">
      <header className="monthlyCalendar__header">
        <div className="monthlyCalendar__nav">
          <button
            type="button"
            className="monthlyCalendar__iconBtn"
            aria-label="이전 달"
            onClick={() => moveMonth(-1)}
          >
            ‹
          </button>
          <h2 className="monthlyCalendar__title">
            {year}년 {month + 1}월
          </h2>
          <button
            type="button"
            className="monthlyCalendar__iconBtn"
            aria-label="다음 달"
            onClick={() => moveMonth(1)}
          >
            ›
          </button>
        </div>
        <button type="button" className="monthlyCalendar__today" onClick={goToday}>
          오늘
        </button>
      </header>
      <div className="monthlyCalendar__weekdays">
        {WEEKDAYS.map((label, index) => (
          <span
            key={label}
            className={`monthlyCalendar__weekday ${index === 0 ? 'monthlyCalendar__weekday--sunday' : ''}`}
          >
            {label}
          </span>
        ))}
      </div>
      <div className="monthlyCalendar__grid">
        {cells.map((cell, index) => (
          <CalendarCell
            key={cell.key}
            dateKey={cell.key}
            day={cell.date.getDate()}
            inMonth={cell.inMonth}
            isToday={cell.key === today}
            isSunday={cell.date.getDay() === 0}
            alignEnd={index % 7 >= 5}
            todos={todosByDate.get(cell.key) ?? []}
            expanded={
              !draggingId && (hoveredDate === cell.key || pinnedDate === cell.key)
            }
            draggingId={draggingId}
            overEventId={overEventId}
            overPlace={overPlace}
            cellOver={overDate === cell.key && !overEventId}
            onHover={handleHover}
            onPin={handlePin}
            onOpenTodo={handleOpenTodo}
            onDragStart={handleEventDragStart}
            onEventDragOver={handleEventDragOver}
            onEventDragLeave={() => setOverEventId(null)}
            onEventDrop={handleEventDrop}
            onCellDragOver={() => {
              if (draggingId) setOverDate(cell.key)
            }}
            onCellDragLeave={() => {
              if (overDate === cell.key) setOverDate(null)
            }}
            onCellDrop={(event) => handleCellDrop(event, cell.key)}
            onDragEnd={handleDragEnd}
          />
        ))}
      </div>
      {selectedTodo ? (
        <TodoDetailModal todo={selectedTodo} onClose={() => setSelectedTodo(null)} />
      ) : null}
    </section>
  )
}
