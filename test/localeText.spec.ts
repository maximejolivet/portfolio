import { describe, expect, it } from 'vitest'
import { resolveLocale, t } from '../server/utils/localeText'

describe('resolveLocale', () => {
  it('keeps supported locales', () => {
    expect(resolveLocale('en')).toBe('en')
    expect(resolveLocale('fr')).toBe('fr')
  })

  it('falls back to fr for unsupported or missing values', () => {
    expect(resolveLocale('br')).toBe('fr')
    expect(resolveLocale(undefined)).toBe('fr')
    expect(resolveLocale(42)).toBe('fr')
  })
})

describe('t', () => {
  it('returns the translated string for a dotted key', () => {
    expect(t('en', 'footer.madeInPlace')).toBe('Brittany')
    expect(t('fr', 'footer.madeInPlace')).toBe('Bretagne')
  })
})
