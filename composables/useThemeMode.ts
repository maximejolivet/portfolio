export type ThemeMode = 'day' | 'night'

const STORAGE_KEY = 'mj_theme'

export const useThemeMode = () => {
  // Always starts at 'day' so SSR markup and the initial client hydration
  // pass match exactly. The real persisted value (if any) is applied
  // right after mount, same as the original prototype's own behavior.
  const theme = useState<ThemeMode>('theme-mode', () => 'day')

  onMounted(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored === 'day' || stored === 'night') {
        theme.value = stored
      } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        theme.value = 'night'
      }
    } catch {
      // ignore storage errors (private browsing)
    }

    watchEffect(() => {
      document.documentElement.dataset.theme = theme.value
      try {
        localStorage.setItem(STORAGE_KEY, theme.value)
      } catch {
        // ignore storage errors (private browsing)
      }
    })
  })

  const toggleTheme = () => {
    theme.value = theme.value === 'night' ? 'day' : 'night'
  }

  return { theme, toggleTheme }
}
