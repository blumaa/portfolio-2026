import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

type ThemeMode = 'light' | 'dark'

interface ThemeContextValue {
  mode: ThemeMode
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>('light')

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as ThemeMode | null
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
      setMode('dark')
      document.documentElement.setAttribute('data-theme', 'dark')
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = mode === 'light' ? 'dark' : 'light'
    setMode(newTheme)
    document.documentElement.setAttribute('data-theme', newTheme)
    localStorage.setItem('theme', newTheme)
  }

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

function useThemeContext() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useThemeContext must be used within a ThemeProvider')
  }
  return context
}

export { ThemeProvider, useThemeContext }
