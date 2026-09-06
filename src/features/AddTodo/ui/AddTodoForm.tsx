import { useState, type FormEvent } from 'react'
import { Button, Input } from '@/shared'
import './AddTodoForm.css'

type AddTodoFormProps = {
  onAdd: (title: string) => void
}

export function AddTodoForm({ onAdd }: AddTodoFormProps) {
  const [title, setTitle] = useState('')

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onAdd(title)
    setTitle('')
  }

  return (
    <form className="addTodoForm" onSubmit={handleSubmit}>
      <label className="addTodoForm__label" htmlFor="todo-title">
        할 일
      </label>
      <Input
        id="todo-title"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="할 일을 입력하세요"
        autoComplete="off"
        maxLength={120}
      />
      <Button type="submit" disabled={!title.trim()}>
        추가
      </Button>
    </form>
  )
}
