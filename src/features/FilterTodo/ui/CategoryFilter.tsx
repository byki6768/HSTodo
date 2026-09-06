import {
  TODO_CATEGORIES,
  TODO_CATEGORY_LABELS,
  type CategoryFilter,
  type Todo,
} from '@/entities/Todo'
import './CategoryFilter.css'

type CategoryFilterProps = {
  todos: Todo[]
  value: CategoryFilter
  onChange: (value: CategoryFilter) => void
}

const FILTERS: CategoryFilter[] = ['all', ...TODO_CATEGORIES]

function countByFilter(todos: Todo[], filter: CategoryFilter) {
  if (filter === 'all') return todos.length
  return todos.filter((todo) => todo.category === filter).length
}

export function CategoryFilter({ todos, value, onChange }: CategoryFilterProps) {
  return (
    <div className="categoryFilter" role="tablist" aria-label="카테고리 필터">
      {FILTERS.map((filter) => {
        const selected = value === filter
        const label = filter === 'all' ? '전체' : TODO_CATEGORY_LABELS[filter]
        const count = countByFilter(todos, filter)

        return (
          <button
            key={filter}
            type="button"
            role="tab"
            aria-selected={selected}
            className={`categoryFilter__tab categoryFilter__tab--${filter} ${
              selected ? 'categoryFilter__tab--selected' : ''
            }`}
            onClick={() => onChange(filter)}
          >
            {label}
            <span className="categoryFilter__count">{count}</span>
          </button>
        )
      })}
    </div>
  )
}
