import { composite, contrastRatio, type Rgba } from './inspector'

// Darkest surface the coloured text can sit on: the terminal panel in day mode (#24414f).
export const PANEL_SURFACE = '#24414f'

function hexToRgba(hex: string): Rgba {
  const value = hex.replace('#', '')
  return {
    r: Number.parseInt(value.slice(0, 2), 16),
    g: Number.parseInt(value.slice(2, 4), 16),
    b: Number.parseInt(value.slice(4, 6), 16),
    a: 1,
  }
}

function toHex(color: Rgba): string {
  return `#${[color.r, color.g, color.b]
    .map((channel) => Math.round(channel).toString(16).padStart(2, '0'))
    .join('')}`
}

// Lightens a brand colour towards white until its text contrast on the surface reaches
// `minRatio` (WCAG AA, 4.5:1 for normal text). A colour that already passes is returned as is.
export function readableOnSurface(hex: string, surface = PANEL_SURFACE, minRatio = 4.5): string {
  const base = hexToRgba(hex)
  const background = hexToRgba(surface)
  for (let step = 0; step <= 20; step++) {
    const amount = step / 20
    const candidate: Rgba = {
      r: base.r + (255 - base.r) * amount,
      g: base.g + (255 - base.g) * amount,
      b: base.b + (255 - base.b) * amount,
      a: 1,
    }
    if (contrastRatio(composite(candidate, background), background) >= minRatio) return toHex(candidate)
  }
  return '#ffffff'
}
