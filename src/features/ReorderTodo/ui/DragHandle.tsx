import './DragHandle.css'

export function DragHandle() {
  return (
    <span className="dragHandle" aria-hidden="true" title="끌어서 순서 변경">
      <svg viewBox="0 0 16 16">
        <circle cx="5" cy="4" r="1.2" fill="currentColor" />
        <circle cx="11" cy="4" r="1.2" fill="currentColor" />
        <circle cx="5" cy="8" r="1.2" fill="currentColor" />
        <circle cx="11" cy="8" r="1.2" fill="currentColor" />
        <circle cx="5" cy="12" r="1.2" fill="currentColor" />
        <circle cx="11" cy="12" r="1.2" fill="currentColor" />
      </svg>
    </span>
  )
}
