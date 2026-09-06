import { CategoryBadge, isOverdue, type Todo } from '@/entities/Todo'
import { useEffect } from 'react'
import './TodoDetailModal.css'

type TodoDetailModalProps = {
  todo: Todo
  onClose: () => void
}

function formatDueDate(dueDate: string | null) {
  if (!dueDate) return '마감일 없음'
  const [year, month, day] = dueDate.split('-')
  return `${year}년 ${Number(month)}월 ${Number(day)}일`
}

function statusLabel(todo: Todo) {
  if (todo.completed) return '완료됨'
  if (isOverdue(todo.dueDate, todo.completed)) return '마감 지남'
  return '진행 중'
}

export function TodoDetailModal({ todo, onClose }: TodoDetailModalProps) {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [onClose])

  const overdue = isOverdue(todo.dueDate, todo.completed)

  return (
    <div className="todoDetailModal" role="presentation" onClick={onClose}>
      <div
        className="todoDetailModal__card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="todo-detail-title"
        onClick={(event) => event.stopPropagation()}
      >
        <p className="todoDetailModal__eyebrow">할 일 상세</p>
        <h2
          id="todo-detail-title"
          className={`todoDetailModal__title ${todo.completed ? 'todoDetailModal__title--completed' : ''} ${
            overdue ? 'todoDetailModal__title--overdue' : ''
          }`}
        >
          {todo.title}
        </h2>
        <CategoryBadge category={todo.category} />
        <dl className="todoDetailModal__facts">
          <div>
            <dt>마감일</dt>
            <dd>{formatDueDate(todo.dueDate)}</dd>
          </div>
          <div>
            <dt>상태</dt>
            <dd>{statusLabel(todo)}</dd>
          </div>
        </dl>
        <button type="button" className="todoDetailModal__close" onClick={onClose}>
          닫기
        </button>
      </div>
    </div>
  )
}
