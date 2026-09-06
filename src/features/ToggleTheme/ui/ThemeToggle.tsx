import { useTheme } from '../model/useTheme'
import './ThemeToggle.css'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      className="themeToggle"
      aria-pressed={isDark}
      aria-label={isDark ? '라이트 모드로 전환' : '다크 모드로 전환'}
      onClick={toggleTheme}
    >
      {isDark ? (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="4.2" fill="currentColor" />
          <path
            d="M12 3.2v1.8M12 19v1.8M4.9 4.9l1.3 1.3M17.8 17.8l1.3 1.3M3.2 12h1.8M19 12h1.8M4.9 19.1l1.3-1.3M17.8 6.2l1.3-1.3"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M15.2 4.3a7.6 7.6 0 1 0 4.5 13.4 6.2 6.2 0 0 1-8.7-8.6 7.5 7.5 0 0 0 4.2-4.8Z"
            fill="currentColor"
          />
        </svg>
      )}
      <span>{isDark ? '라이트' : '다크'}</span>
    </button>
  )
}
