import type { TodoCategory } from './category'

export type Todo = {
  id: string
  title: string
  completed: boolean
  createdAt: number
  completedAt: number | null
  dueDate: string | null
  category: TodoCategory
}
