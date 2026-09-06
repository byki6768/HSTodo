import { Input } from '@/shared'
import './DueDateField.css'

type DueDateFieldProps = {
  id?: string
  value: string
  onChange: (value: string | null) => void
  compact?: boolean
}

function formatCompactDate(value: string) {
  if (!value) return '날짜'
  const [year, month, day] = value.split('-')
  return `${year.slice(2)}.${month}.${day}`
}

export function DueDateField({
  id,
  value,
  onChange,
  compact = false,
}: DueDateFieldProps) {
  return (
    <label
      className={`dueDateField ${compact ? 'dueDateField--compact' : ''}`}
      title={value ? value : '마감일'}
    >
      <span className="dueDateField__label">마감일</span>
      {compact ? (
        <span
          className={`dueDateField__display ${value ? '' : 'dueDateField__display--empty'}`}
          aria-hidden="true"
        >
          {formatCompactDate(value)}
        </span>
      ) : null}
      <Input
        id={id}
        type="date"
        value={value}
        className={`dueDateField__input ${compact ? 'dueDateField__input--overlay' : ''}`}
        aria-label="마감일"
        onChange={(event) => onChange(event.target.value || null)}
      />
    </label>
  )
}
