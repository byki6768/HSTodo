import './CalendarToggle.css'

type CalendarToggleProps = {
  open: boolean
  onToggle: () => void
}

export function CalendarToggle({ open, onToggle }: CalendarToggleProps) {
  return (
    <button
      type="button"
      className={`calendarToggle ${open ? 'calendarToggle--open' : ''}`}
      aria-pressed={open}
      aria-label={open ? '할 일 목록으로 돌아가기' : '월간 일정표 열기'}
      onClick={onToggle}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect
          x="3.5"
          y="5"
          width="17"
          height="15"
          rx="3"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <path
          d="M8 3.5v3M16 3.5v3M3.5 9.5h17"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <rect x="7" y="12" width="3" height="3" rx="0.6" fill="currentColor" />
        <rect x="11" y="12" width="3" height="3" rx="0.6" fill="currentColor" />
        <rect x="15" y="12" width="3" height="3" rx="0.6" fill="currentColor" />
      </svg>
      <span className="calendarToggle__label">{open ? '목록 보기' : '월간 일정표'}</span>
      <span className="calendarToggle__hint">{open ? '할 일로 돌아가기' : '한 달 한눈에 보기'}</span>
    </button>
  )
}
