import { MonthlyCalendar } from '@/widgets/MonthlyCalendar'
import type { Todo } from '@/entities/Todo'

type CalendarPageProps = {
  todos: Todo[]
  onMoveToDate: (id: string, dueDate: string, beforeId: string | null) => void
}

export function CalendarPage({ todos, onMoveToDate }: CalendarPageProps) {
  return <MonthlyCalendar todos={todos} onMoveToDate={onMoveToDate} />
}
