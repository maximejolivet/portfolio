import { afterEach, describe, expect, it, vi } from 'vitest'
import { DEFAULT_PREFERENCES, normalizePreferences } from '../utils/preferences'
import { prefersReducedMotion } from '../utils/motion'

describe('normalizePreferences', () => {
  it('returns the defaults for missing or non-object input', () => {
    expect(normalizePreferences(null)).toEqual(DEFAULT_PREFERENCES)
    expect(normalizePreferences(undefined)).toEqual(DEFAULT_PREFERENCES)
    expect(normalizePreferences('large')).toEqual(DEFAULT_PREFERENCES)
  })

  it('keeps valid values', () => {
    expect(
      normalizePreferences({ textScale: 'xlarge', motion: 'reduce', contrast: 'high' }),
    ).toEqual({ textScale: 'xlarge', motion: 'reduce', contrast: 'high' })
  })

  it('falls back field by field on unknown values', () => {
    expect(
      normalizePreferences({ textScale: 'huge', motion: 'reduce', contrast: 'max' }),
    ).toEqual({ textScale: 'default', motion: 'reduce', contrast: 'default' })
  })
})

describe('prefersReducedMotion', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  function stubDocument(motion?: string, systemReduces = false) {
    vi.stubGlobal('document', {
      documentElement: { dataset: motion ? { motion } : {} },
    })
    vi.stubGlobal('matchMedia', () => ({ matches: systemReduces }))
  }

  it('follows the system when the visitor has not chosen', () => {
    stubDocument(undefined, true)
    expect(prefersReducedMotion()).toBe(true)
    stubDocument(undefined, false)
    expect(prefersReducedMotion()).toBe(false)
  })

  it('forces reduced motion when chosen, whatever the system says', () => {
    stubDocument('reduce', false)
    expect(prefersReducedMotion()).toBe(true)
  })

  it('keeps full motion when chosen, even if the system asks to reduce', () => {
    stubDocument('full', true)
    expect(prefersReducedMotion()).toBe(false)
  })
})
