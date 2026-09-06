import { useState } from 'react'
import { applyTheme, loadTheme, saveTheme, type Theme } from '@/shared'

/** 테마 상태를 관리하고 전환 시 즉시 저장한다. */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    const initial = loadTheme()
    applyTheme(initial)
    return initial
  })

  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark'
      applyTheme(next)
      saveTheme(next)
      return next
    })
  }

  return { theme, toggleTheme }
}
