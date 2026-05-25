export const THEME_STORAGE_KEY = 'cardmatcher-theme'

export type ThemePreference = 'light' | 'dark' | 'system'

export type ResolvedTheme = 'light' | 'dark'

export const getStoredTheme = (): ThemePreference => {
  if (typeof window === 'undefined') return 'system'
  const stored = localStorage.getItem(THEME_STORAGE_KEY)
  if (stored === 'light' || stored === 'dark' || stored === 'system') return stored
  return 'system'
}

export const resolveTheme = (preference: ThemePreference): ResolvedTheme => {
  if (preference === 'dark') return 'dark'
  if (preference === 'light') return 'light'
  if (typeof window === 'undefined') return 'light'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export const applyThemeToDocument = (resolved: ResolvedTheme) => {
  const root = document.documentElement
  root.classList.toggle('dark', resolved === 'dark')
  root.style.colorScheme = resolved
}
