import { useState, type FormEvent } from 'react'
import {
  TODO_CATEGORIES,
  TODO_CATEGORY_LABELS,
  todayKey,
  type TodoCategory,
} from '@/entities/Todo'
import { DueDateField } from '@/features/SetDueDate'
import { Button, Input } from '@/shared'
import './AddTodoForm.css'

type AddTodoFormProps = {
  onAdd: (title: string, category: TodoCategory, dueDate: string | null) => void
}

export function AddTodoForm({ onAdd }: AddTodoFormProps) {
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState<TodoCategory>('work')
  const [dueDate, setDueDate] = useState(todayKey)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onAdd(title, category, dueDate || null)
    setTitle('')
    setDueDate(todayKey())
  }

  return (
    <form className="addTodoForm" onSubmit={handleSubmit}>
      <fieldset className="addTodoForm__categories">
        <legend className="addTodoForm__legend">카테고리</legend>
        <div className="addTodoForm__chips" role="radiogroup" aria-label="카테고리">
          {TODO_CATEGORIES.map((value) => (
            <button
              key={value}
              type="button"
              role="radio"
              aria-checked={category === value}
              className={`addTodoForm__chip addTodoForm__chip--${value} ${
                category === value ? 'addTodoForm__chip--selected' : ''
              }`}
              onClick={() => setCategory(value)}
            >
              {TODO_CATEGORY_LABELS[value]}
            </button>
          ))}
          <p className="addTodoForm__hint">
            <span className="addTodoForm__pointer" aria-hidden="true">
              👆
            </span>
            먼저 카테고리를 클릭하세요
          </p>
        </div>
      </fieldset>
      <label className="addTodoForm__label" htmlFor="todo-title">
        할 일
      </label>
      <div className="addTodoForm__row">
        <Input
          id="todo-title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="할 일을 입력하세요"
          autoComplete="off"
          maxLength={120}
        />
        <DueDateField value={dueDate} onChange={(value) => setDueDate(value ?? '')} />
        <Button type="submit" disabled={!title.trim()}>
          추가
        </Button>
      </div>
    </form>
  )
}
