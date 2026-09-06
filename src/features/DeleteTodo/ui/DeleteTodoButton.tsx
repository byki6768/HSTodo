import { Button } from '@/shared'
import './DeleteTodoButton.css'

type DeleteTodoButtonProps = {
  todoId: string
  onDelete: (id: string) => void
}

export function DeleteTodoButton({ todoId, onDelete }: DeleteTodoButtonProps) {
  return (
    <Button
      variant="danger"
      className="deleteTodoButton"
      aria-label="할 일 삭제"
      onClick={() => onDelete(todoId)}
    >
      삭제
    </Button>
  )
}
