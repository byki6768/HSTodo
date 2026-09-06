import { TodoItem, type Todo } from '@/entities/Todo'
import { DeleteTodoButton } from '@/features/DeleteTodo'
import { ToggleTodo } from '@/features/ToggleTodo'
import './TodoList.css'

type TodoListProps = {
  todos: Todo[]
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

export function TodoList({ todos, onToggle, onDelete }: TodoListProps) {
  if (todos.length === 0) {
    return (
      <div className="todoList__empty">
        <p className="todoList__emptyTitle">아직 할 일이 없어요</p>
        <p className="todoList__emptyDesc">위에서 새로운 할 일을 추가해 보세요.</p>
      </div>
    )
  }

  const remaining = todos.filter((todo) => !todo.completed).length

  return (
    <section>
      <p className="todoList__summary">
        남은 할 일 <strong>{remaining}</strong>개
      </p>
      <ul className="todoList">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            leading={<ToggleTodo todo={todo} onToggle={onToggle} />}
            trailing={<DeleteTodoButton todoId={todo.id} onDelete={onDelete} />}
          />
        ))}
      </ul>
    </section>
  )
}
