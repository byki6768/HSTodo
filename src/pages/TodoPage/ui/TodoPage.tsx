import { TodoPanel } from '@/widgets/TodoPanel'
import './TodoPage.css'

export function TodoPage() {
  return (
    <main className="todoPage">
      <header className="todoPage__header">
        <p className="todoPage__eyebrow">HS Todo</p>
        <h1 className="todoPage__title">오늘 할 일</h1>
        <p className="todoPage__subtitle">할 일을 추가하고, 완료하고, 정리하세요.</p>
      </header>
      <TodoPanel />
      <p className="todoPage__note">할 일은 이 브라우저에만 저장됩니다.</p>
    </main>
  )
}
