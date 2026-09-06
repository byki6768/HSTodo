import { useState } from 'react'
import { useTodos } from '@/entities/Todo'
import { CalendarToggle } from '@/features/ToggleCalendar'
import { ThemeToggle } from '@/features/ToggleTheme'
import { CalendarPage } from '@/pages/CalendarPage'
import { TodoPanel } from '@/widgets/TodoPanel'
import { TodoProgress } from '@/widgets/TodoProgress'
import './TodoPage.css'

export function TodoPage() {
  const { todos, addTodo, toggleTodo, setDueDate, deleteTodo, reorderTodo, moveTodoToDate } =
    useTodos()
  const [calendarOpen, setCalendarOpen] = useState(false)

  return (
    <main className={`todoPage ${calendarOpen ? 'todoPage--calendar' : ''}`}>
      <header className="todoPage__header">
        <div className="todoPage__headerTop">
          <p className="todoPage__eyebrow">HS Todo</p>
          <ThemeToggle />
        </div>
        <h1 className="todoPage__title">{calendarOpen ? '월간 일정표' : '오늘 할 일'}</h1>
        <p className="todoPage__subtitle">
          {calendarOpen
            ? '마감일에 맞춰 한 달 할 일을 한눈에 살펴보세요.'
            : '할 일을 추가하고, 완료하고, 정리하세요.'}
        </p>
      </header>
      <div className="todoPage__statsRow">
        <TodoProgress todos={todos} />
        <CalendarToggle
          open={calendarOpen}
          onToggle={() => setCalendarOpen((open) => !open)}
        />
      </div>
      {calendarOpen ? (
        <CalendarPage todos={todos} onMoveToDate={moveTodoToDate} />
      ) : (
        <TodoPanel
          todos={todos}
          addTodo={addTodo}
          toggleTodo={toggleTodo}
          setDueDate={setDueDate}
          deleteTodo={deleteTodo}
          reorderTodo={reorderTodo}
        />
      )}
      <p className="todoPage__note">할 일은 이 브라우저에만 저장됩니다.</p>
    </main>
  )
}
