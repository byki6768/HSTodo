/** 로컬스토리지에서 JSON 값을 안전하게 읽어온다. */
export function loadJson<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return fallback
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

/** 로컬스토리지에 JSON 값을 저장한다. */
export function saveJson<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // 저장 공간이 부족하거나 접근이 막힌 경우는 무시한다.
  }
}
