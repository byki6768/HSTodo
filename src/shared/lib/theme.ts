import { loadJson, saveJson } from './storage'

export type Theme = 'light' | 'dark'

const STORAGE_KEY = 'hstodo.theme'

const THEME_COLORS: Record<Theme, string> = {
  light: '#e3f2fd',
  dark: '#0b1220',
}

export function isTheme(value: unknown): value is Theme {
  return value === 'light' || value === 'dark'
}

/** 저장된 테마를 불러온다. 값이 없으면 라이트 모드를 쓴다. */
export function loadTheme(): Theme {
  const value = loadJson<unknown>(STORAGE_KEY, 'light')
  return isTheme(value) ? value : 'light'
}

/** 선택한 테마를 로컬스토리지에 저장한다. */
export function saveTheme(theme: Theme): void {
  saveJson(STORAGE_KEY, theme)
}

/** html에 테마를 적용하고 상태 표시줄 색을 맞춘다. */
export function applyTheme(theme: Theme): void {
  document.documentElement.dataset.theme = theme
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute('content', THEME_COLORS[theme])
}
