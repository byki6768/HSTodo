export const TODO_CATEGORIES = ['work', 'study', 'personal', 'family', 'etc'] as const

export type TodoCategory = (typeof TODO_CATEGORIES)[number]

export type CategoryFilter = 'all' | TodoCategory

export const TODO_CATEGORY_LABELS: Record<TodoCategory, string> = {
  work: '업무',
  study: '공부',
  personal: '개인',
  family: '가족',
  etc: '기타',
}

export function isTodoCategory(value: unknown): value is TodoCategory {
  return TODO_CATEGORIES.some((category) => category === value)
}
