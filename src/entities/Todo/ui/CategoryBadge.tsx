import { TODO_CATEGORY_LABELS, type TodoCategory } from '../model/category'
import './CategoryBadge.css'

type CategoryBadgeProps = {
  category: TodoCategory
}

export function CategoryBadge({ category }: CategoryBadgeProps) {
  return (
    <span className={`categoryBadge categoryBadge--${category}`}>
      {TODO_CATEGORY_LABELS[category]}
    </span>
  )
}
