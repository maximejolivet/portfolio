import {
  DEFAULT_PREFERENCES,
  normalizePreferences,
  PREFERENCES_STORAGE_KEY,
  type Preferences,
} from '~/utils/preferences'

// Display preferences live on <html> as data attributes, which the CSS in assets/css/main.css
// reads. Stored per visitor in localStorage: a convenience, never sent anywhere.
export const usePreferences = () => {
  const preferences = useState<Preferences>('preferences', () => ({ ...DEFAULT_PREFERENCES }))
  const preferencesOpen = useState<boolean>('preferences-open', () => false)

  function apply(current: Preferences) {
    const root = document.documentElement
    root.dataset.textScale = current.textScale
    root.dataset.motion = current.motion
    root.dataset.contrast = current.contrast
  }

  // Called once on the client, before the components mount (see plugins/preferences.client.ts).
  function load() {
    let raw: unknown = null
    try {
      const stored = localStorage.getItem(PREFERENCES_STORAGE_KEY)
      raw = stored ? JSON.parse(stored) : null
    }
    catch {
      // unreadable storage or invalid JSON: keep the defaults
    }
    preferences.value = normalizePreferences(raw)
    apply(preferences.value)
  }

  function set<K extends keyof Preferences>(key: K, value: Preferences[K]) {
    preferences.value = { ...preferences.value, [key]: value }
    apply(preferences.value)
    try {
      localStorage.setItem(PREFERENCES_STORAGE_KEY, JSON.stringify(preferences.value))
    }
    catch {
      // ignore storage errors (private browsing): the choice still applies for this visit
    }
  }

  function reset() {
    preferences.value = { ...DEFAULT_PREFERENCES }
    apply(preferences.value)
    try {
      localStorage.removeItem(PREFERENCES_STORAGE_KEY)
    }
    catch {
      // ignore storage errors
    }
  }

  return { preferences, preferencesOpen, load, set, reset }
}
