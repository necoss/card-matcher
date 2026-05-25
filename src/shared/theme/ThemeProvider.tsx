import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

import {
  applyThemeToDocument,
  getStoredTheme,
  resolveTheme,
  THEME_STORAGE_KEY,
} from './theme'
import type { ResolvedTheme, ThemePreference } from './theme'

type ThemeContextValue = {
  preference: ThemePreference
  resolved: ResolvedTheme
  setPreference: (preference: ThemePreference) => void
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [preference, setPreferenceState] = useState<ThemePreference>(getStoredTheme)
  const [resolved, setResolved] = useState<ResolvedTheme>(() => resolveTheme(getStoredTheme()))

  const setPreference = useCallback((next: ThemePreference) => {
    if (next === 'system') {
      localStorage.removeItem(THEME_STORAGE_KEY)
    } else {
      localStorage.setItem(THEME_STORAGE_KEY, next)
    }
    setPreferenceState(next)
    const nextResolved = resolveTheme(next)
    setResolved(nextResolved)
    applyThemeToDocument(nextResolved)
  }, [])

  const toggleTheme = useCallback(() => {
    const nextResolved: ResolvedTheme = resolved === 'dark' ? 'light' : 'dark'
    setPreference(nextResolved)
  }, [resolved, setPreference])

  useEffect(() => {
    const nextResolved = resolveTheme(preference)
    setResolved(nextResolved)
    applyThemeToDocument(nextResolved)

    if (preference !== 'system') return

    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = () => {
      const systemResolved = resolveTheme('system')
      setResolved(systemResolved)
      applyThemeToDocument(systemResolved)
    }

    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [preference])

  const value = useMemo(
    () => ({ preference, resolved, setPreference, toggleTheme }),
    [preference, resolved, setPreference, toggleTheme],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}
