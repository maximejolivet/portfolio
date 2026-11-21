import { describe, expect, it } from 'vitest'
import { resolveDateLocale } from '../utils/resolveDateLocale'

describe('resolveDateLocale', () => {
  it('maps en to en-US', () => {
    expect(resolveDateLocale('en')).toBe('en-US')
  })

  it('falls back to fr-FR for any other locale', () => {
    expect(resolveDateLocale('fr')).toBe('fr-FR')
    expect(resolveDateLocale('br')).toBe('fr-FR')
    expect(resolveDateLocale('')).toBe('fr-FR')
  })
})
