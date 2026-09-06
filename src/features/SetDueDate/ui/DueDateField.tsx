import { Input } from '@/shared'
import './DueDateField.css'

type DueDateFieldProps = {
  id?: string
  value: string
  onChange: (value: string | null) => void
  compact?: boolean
}

export function DueDateField({
  id,
  value,
  onChange,
  compact = false,
}: DueDateFieldProps) {
  return (
    <label className={`dueDateField ${compact ? 'dueDateField--compact' : ''}`}>
      <span className="dueDateField__label">마감일</span>
      <Input
        id={id}
        type="date"
        value={value}
        className="dueDateField__input"
        aria-label="마감일"
        onChange={(event) => onChange(event.target.value || null)}
      />
    </label>
  )
}
