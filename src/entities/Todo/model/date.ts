/** 로컬 날짜를 YYYY-MM-DD로 바꾼다. */
export function toDateKey(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export function todayKey(): string {
  return toDateKey(new Date())
}

export function isDateKey(value: unknown): value is string {
  return typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value)
}

export function isOverdue(dueDate: string | null, completed: boolean): boolean {
  if (completed || !dueDate) return false
  return dueDate < todayKey()
}

export type MonthCell = {
  date: Date
  key: string
  inMonth: boolean
}

/** 구글 캘린더처럼 일요일 시작 6주(42칸) 월간 그리드를 만든다. */
export function getMonthCells(year: number, month: number): MonthCell[] {
  const first = new Date(year, month, 1)
  const start = new Date(year, month, 1 - first.getDay())

  return Array.from({ length: 42 }, (_, index) => {
    const date = new Date(start)
    date.setDate(start.getDate() + index)
    return {
      date,
      key: toDateKey(date),
      inMonth: date.getMonth() === month,
    }
  })
}
