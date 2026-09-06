import { getTodoStats, type Todo } from '@/entities/Todo'
import type { CSSProperties } from 'react'
import './TodoProgress.css'

type TodoProgressProps = {
  todos: Todo[]
}

export function TodoProgress({ todos }: TodoProgressProps) {
  const { total, completed, todayCompleted, rate } = getTodoStats(todos)

  return (
    <section
      className="todoProgress"
      aria-label="오늘 진행 현황"
      style={{ '--progress': `${rate}%` } as CSSProperties}
    >
      <div className="todoProgress__meta">
        <p className="todoProgress__stat">
          오늘 완료 <strong>{todayCompleted}</strong>개
        </p>
        <p className="todoProgress__stat">
          완료율 <strong>{rate}%</strong>
        </p>
      </div>
      <div
        className="todoProgress__track"
        role="progressbar"
        aria-label="전체 대비 완료율"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={rate}
      >
        <div className="todoProgress__fill" />
      </div>
      <p className="todoProgress__hint">
        전체 {total}개 중 {completed}개 완료
      </p>
    </section>
  )
}
