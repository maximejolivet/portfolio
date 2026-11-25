// Display preferences chosen by the visitor (text size, motion, contrast). Pure helpers only:
// the DOM side lives in composables/usePreferences.ts.

export const PREFERENCES_STORAGE_KEY = 'mj_preferences'

export const TEXT_SCALES = ['default', 'large', 'xlarge'] as const
export const MOTION_PREFERENCES = ['system', 'reduce', 'full'] as const
export const CONTRAST_PREFERENCES = ['default', 'high'] as const

export type TextScale = (typeof TEXT_SCALES)[number]
export type MotionPreference = (typeof MOTION_PREFERENCES)[number]
export type ContrastPreference = (typeof CONTRAST_PREFERENCES)[number]

export interface Preferences {
  textScale: TextScale
  motion: MotionPreference
  contrast: ContrastPreference
}

export const DEFAULT_PREFERENCES: Preferences = {
  textScale: 'default',
  motion: 'system',
  contrast: 'default',
}

function pick<T extends string>(value: unknown, allowed: readonly T[], fallback: T): T {
  return (allowed as readonly string[]).includes(value as string) ? (value as T) : fallback
}

// Anything stored in localStorage is untrusted: unknown values fall back to the defaults.
export function normalizePreferences(raw: unknown): Preferences {
  const source = typeof raw === 'object' && raw !== null ? (raw as Record<string, unknown>) : {}
  return {
    textScale: pick(source.textScale, TEXT_SCALES, DEFAULT_PREFERENCES.textScale),
    motion: pick(source.motion, MOTION_PREFERENCES, DEFAULT_PREFERENCES.motion),
    contrast: pick(source.contrast, CONTRAST_PREFERENCES, DEFAULT_PREFERENCES.contrast),
  }
}
