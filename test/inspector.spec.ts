import { describe, expect, it } from 'vitest'
import {
  classifyTarget,
  composite,
  contrastRatio,
  flattenLayers,
  isIncidentalText,
  parseRgba,
  requiredContrast,
} from '../utils/inspector'

describe('isIncidentalText', () => {
  it('treats separators and symbols as incidental', () => {
    expect(isIncidentalText('|')).toBe(true)
    expect(isIncidentalText(' · ')).toBe(true)
    expect(isIncidentalText('▎')).toBe(true)
  })

  it('evaluates text that carries words or digits', () => {
    expect(isIncidentalText('name')).toBe(false)
    expect(isIncidentalText('2026')).toBe(false)
  })
})

const WHITE = { r: 255, g: 255, b: 255, a: 1 }
const BLACK = { r: 0, g: 0, b: 0, a: 1 }

describe('parseRgba', () => {
  it('parses rgb() and rgba() strings from getComputedStyle', () => {
    expect(parseRgba('rgb(29, 53, 64)')).toEqual({ r: 29, g: 53, b: 64, a: 1 })
    expect(parseRgba('rgba(243, 244, 240, 0.62)')).toEqual({ r: 243, g: 244, b: 240, a: 0.62 })
  })

  it('parses the oklab() and color(srgb) forms Chrome returns for opacity modifiers', () => {
    const white = parseRgba('oklab(1 0 0 / 1)')!
    expect(white.r).toBeCloseTo(255, 0)
    expect(white.g).toBeCloseTo(255, 0)
    expect(white.b).toBeCloseTo(255, 0)

    const faded = parseRgba('oklab(0.965273 -0.00248107 0.00478357 / 0.25)')!
    expect(faded.a).toBe(0.25)
    expect(faded.r).toBeGreaterThan(240)

    const mix = parseRgba('color(srgb 0.788235 0.603922 0.290196 / 0.1)')!
    expect(mix.r).toBeCloseTo(201, 0)
    expect(mix.g).toBeCloseTo(154, 0)
    expect(mix.b).toBeCloseTo(74, 0)
    expect(mix.a).toBe(0.1)
  })

  it('returns null for values it cannot read (named colors, color-mix, oklch)', () => {
    expect(parseRgba('transparent')).toBeNull()
    expect(parseRgba('oklch(0.5 0.1 200)')).toBeNull()
  })
})

describe('flattenLayers', () => {
  it('blends a translucent layer with the opaque surface beneath it, not the page', () => {
    const darkPanel = { r: 36, g: 65, b: 79, a: 1 }
    const whiteOverlay = { r: 255, g: 255, b: 255, a: 0.1 }
    const result = flattenLayers([whiteOverlay], darkPanel)
    // Lighter than the panel, but nowhere near the page colour (243, 244, 240).
    expect(result.r).toBeGreaterThan(36)
    expect(result.r).toBeLessThan(80)
  })
})

describe('composite', () => {
  it('blends a semi-transparent text color over its background', () => {
    const result = composite({ r: 0, g: 0, b: 0, a: 0.5 }, WHITE)
    expect(result.r).toBeCloseTo(127.5)
    expect(result.a).toBe(1)
  })
})

describe('contrastRatio', () => {
  it('gives 21:1 for black on white and 1:1 for identical colors', () => {
    expect(contrastRatio(BLACK, WHITE)).toBeCloseTo(21, 1)
    expect(contrastRatio(WHITE, WHITE)).toBeCloseTo(1, 5)
  })

  it('is symmetric in its arguments', () => {
    const ink = { r: 29, g: 53, b: 64, a: 1 }
    expect(contrastRatio(ink, WHITE)).toBeCloseTo(contrastRatio(WHITE, ink), 10)
  })

  it('flags the site mint accent on the light background as below 4.5:1', () => {
    // --accent #4fb39c on --bg #f3f4f0: a known low-contrast pair on this site.
    const mint = { r: 0x4f, g: 0xb3, b: 0x9c, a: 1 }
    const bg = { r: 0xf3, g: 0xf4, b: 0xf0, a: 1 }
    expect(contrastRatio(mint, bg)).toBeLessThan(4.5)
  })
})

describe('requiredContrast', () => {
  it('uses 4.5:1 for body text and 3:1 for large or bold large text', () => {
    expect(requiredContrast(16, 400)).toBe(4.5)
    expect(requiredContrast(24, 400)).toBe(3)
    expect(requiredContrast(18.66, 700)).toBe(3)
    expect(requiredContrast(18.66, 400)).toBe(4.5)
  })
})

describe('classifyTarget', () => {
  it('fails targets under 24px (WCAG 2.5.8)', () => {
    expect(classifyTarget(16, 16)).toBe('fail')
    expect(classifyTarget(40, 20)).toBe('fail')
  })

  it('warns between 24px and 44px', () => {
    expect(classifyTarget(30, 30)).toBe('warn')
  })

  it('accepts targets of 44px or more on both sides', () => {
    expect(classifyTarget(44, 44)).toBe('ok')
    expect(classifyTarget(120, 48)).toBe('ok')
  })
})
