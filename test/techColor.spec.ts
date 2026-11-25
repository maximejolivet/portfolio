import { describe, expect, it } from 'vitest'
import { PANEL_SURFACE, readableOnSurface } from '../utils/techColor'
import { contrastRatio } from '../utils/inspector'
import { TECH_BRAND_COLORS } from '../constants/techColors'

// parseRgba reads rgb()/oklab() strings (as getComputedStyle returns them), so hex is converted here.
const hexRgba = (hex: string) => {
  const v = hex.replace('#', '')
  return { r: parseInt(v.slice(0, 2), 16), g: parseInt(v.slice(2, 4), 16), b: parseInt(v.slice(4, 6), 16), a: 1 }
}
const ratioOf = (hex: string) => contrastRatio(hexRgba(hex), hexRgba(PANEL_SURFACE))

describe('readableOnSurface', () => {
  it('lightens a dark brand colour until it reaches 4.5:1 on the panel', () => {
    const adjusted = readableOnSurface('#0678be') // Drupal blue, too dark on its own
    expect(ratioOf(adjusted)).toBeGreaterThanOrEqual(4.5)
  })

  it('keeps a colour that already passes', () => {
    expect(readableOnSurface('#ffffff')).toBe('#ffffff')
  })

  it('returns a lowercase #rrggbb value', () => {
    expect(readableOnSurface('#777bb4')).toMatch(/^#[0-9a-f]{6}$/)
  })

  it('makes every listed brand colour readable on the panel', () => {
    for (const hex of Object.values(TECH_BRAND_COLORS)) {
      expect(ratioOf(readableOnSurface(hex))).toBeGreaterThanOrEqual(4.5)
    }
  })
})
