// Used by the full-content llms.txt companion -
// both walk the same locale JSON files by dotted i18n key.
import fr from '~/i18n/locales/fr.json'
import en from '~/i18n/locales/en.json'

const LOCALES = { fr, en } as const
export type Locale = keyof typeof LOCALES

export function resolveLocale(value: unknown): Locale {
  return value === 'en' ? value : 'fr'
}

export function t(locale: Locale, key: string): string {
  const value = key.split('.').reduce<unknown>((node, segment) => {
    return typeof node === 'object' && node !== null
      ? (node as Record<string, unknown>)[segment]
      : undefined
  }, LOCALES[locale])

  return typeof value === 'string' ? value : ''
}
