import { useState, type DragEvent } from 'react'
import { TodoItem, type Todo } from '@/entities/Todo'
import { DeleteTodoButton } from '@/features/DeleteTodo'
import {
  DragHandle,
  allowTodoDrop,
  dropPlaceFromPoint,
  getDraggedTodoId,
  setDraggedTodoId,
} from '@/features/ReorderTodo'
import { DueDateField } from '@/features/SetDueDate'
import { ToggleTodo } from '@/features/ToggleTodo'
import './TodoList.css'

type TodoListProps = {
  todos: Todo[]
  isFiltered: boolean
  onToggle: (id: string) => void
  onSetDueDate: (id: string, dueDate: string | null) => void
  onDelete: (id: string) => void
  onReorder: (fromId: string, toId: string, place: 'before' | 'after') => void
}

export function TodoList({
  todos,
  isFiltered,
  onToggle,
  onSetDueDate,
  onDelete,
  onReorder,
}: TodoListProps) {
  const [draggingId, setDraggingId] = useState<string | null>(null)
  const [overId, setOverId] = useState<string | null>(null)
  const [overPlace, setOverPlace] = useState<'before' | 'after'>('before')

  if (todos.length === 0) {
    return (
      <div className="todoList__empty">
        <p className="todoList__emptyTitle">
          {isFiltered ? '이 카테고리에 할 일이 없어요' : '아직 할 일이 없어요'}
        </p>
        <p className="todoList__emptyDesc">
          {isFiltered
            ? '다른 카테고리를 선택하거나 할 일을 추가해 보세요.'
            : '위에서 새로운 할 일을 추가해 보세요.'}
        </p>
      </div>
    )
  }

  const remaining = todos.filter((todo) => !todo.completed).length

  const handleDragStart = (event: DragEvent<HTMLLIElement>, id: string) => {
    const target = event.target as HTMLElement
    if (target.closest('input, button, label')) {
      event.preventDefault()
      return
    }
    setDraggedTodoId(event, id)
    setDraggingId(id)
  }

  const handleDragOver = (event: DragEvent<HTMLLIElement>, id: string) => {
    if (!draggingId || draggingId === id) return
    allowTodoDrop(event)
    setOverId(id)
    setOverPlace(dropPlaceFromPoint(event))
  }

  const handleDrop = (event: DragEvent<HTMLLIElement>, id: string) => {
    event.preventDefault()
    const fromId = getDraggedTodoId(event) || draggingId
    if (!fromId || fromId === id) return
    onReorder(fromId, id, dropPlaceFromPoint(event))
    setDraggingId(null)
    setOverId(null)
  }

  const clearDrag = () => {
    setDraggingId(null)
    setOverId(null)
  }

  return (
    <section>
      <p className="todoList__summary">
        남은 할 일 <strong>{remaining}</strong>개 · 끌어서 순서를 바꿀 수 있어요
      </p>
      <ul className="todoList">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            handle={<DragHandle />}
            leading={<ToggleTodo todo={todo} onToggle={onToggle} />}
            dueDate={
              <DueDateField
                compact
                value={todo.dueDate ?? ''}
                onChange={(value) => onSetDueDate(todo.id, value)}
              />
            }
            trailing={<DeleteTodoButton todoId={todo.id} onDelete={onDelete} />}
            dragging={draggingId === todo.id}
            dragOver={overId === todo.id ? overPlace : null}
            onDragStart={(event) => handleDragStart(event, todo.id)}
            onDragOver={(event) => handleDragOver(event, todo.id)}
            onDragLeave={() => {
              if (overId === todo.id) setOverId(null)
            }}
            onDrop={(event) => handleDrop(event, todo.id)}
            onDragEnd={clearDrag}
          />
        ))}
      </ul>
    </section>
  )
}
