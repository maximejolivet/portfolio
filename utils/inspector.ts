// Pure helpers for the on-site inspector (components/layout/SiteInspector.vue).
// No DOM access here, so they can be unit-tested in the node environment.

export interface Rgba {
  r: number
  g: number
  b: number
  a: number
}

// WCAG 2.2 criterion 2.5.8 (minimum 24 CSS px) and the stricter 44 px target
// used across this site (RGAA / WCAG 2.5.5 AAA).
export const TARGET_MIN_PX = 24
export const TARGET_RECOMMENDED_PX = 44

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value))

// One CSS component: a number, or a percentage of `scale`.
function component(token: string, scale: number): number {
  return token.endsWith('%') ? (Number.parseFloat(token) / 100) * scale : Number.parseFloat(token)
}

// OKLab to gamma-encoded sRGB (0-255). Chrome returns color-mix() and Tailwind's
// opacity modifiers (text-x/25) in this form, so it must be handled to audit them.
function oklabToRgb(L: number, a: number, b: number): [number, number, number] {
  const l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3
  const m = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3
  const s = (L - 0.0894841775 * a - 1.291485548 * b) ** 3
  const linear = [
    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
  ]
  return linear.map((c) => {
    const v = clamp(c, 0, 1)
    const encoded = v <= 0.0031308 ? 12.92 * v : 1.055 * v ** (1 / 2.4) - 0.055
    return encoded * 255
  }) as [number, number, number]
}

// Parses the colour strings returned by getComputedStyle: rgb()/rgba(), oklab() and
// color(srgb ...). Returns null for anything else (named colours, gradients, oklch...).
export function parseRgba(value: string): Rgba | null {
  const match = value.trim().match(/^(rgba?|oklab|color)\((.*)\)$/)
  if (!match) return null
  const kind = match[1]!
  let inner = match[2]!.trim()
  // color(srgb r g b / a) carries 0-1 channels, unlike rgb() which uses 0-255.
  if (kind === 'color') {
    if (!inner.startsWith('srgb ')) return null
    inner = inner.slice('srgb '.length)
  }

  const parts = inner.replace(/[,/]/g, ' ').trim().split(/\s+/)
  if (parts.length < 3) return null

  const alpha = parts.length >= 4 ? clamp(component(parts[3]!, 1), 0, 1) : 1
  let channels: [number, number, number]
  if (kind === 'oklab') {
    channels = oklabToRgb(component(parts[0]!, 1), component(parts[1]!, 0.4), component(parts[2]!, 0.4))
  }
  else if (kind === 'color') {
    channels = [parts[0], parts[1], parts[2]].map((p) => component(p!, 1) * 255) as [number, number, number]
  }
  else {
    channels = [parts[0], parts[1], parts[2]].map((p) => component(p!, 255)) as [number, number, number]
  }

  if (channels.some((c) => Number.isNaN(c)) || Number.isNaN(alpha)) return null
  return { r: channels[0], g: channels[1], b: channels[2], a: alpha }
}

// Composites a (possibly transparent) foreground over an opaque background.
export function composite(fg: Rgba, bg: Rgba): Rgba {
  return {
    r: fg.r * fg.a + bg.r * (1 - fg.a),
    g: fg.g * fg.a + bg.g * (1 - fg.a),
    b: fg.b * fg.a + bg.b * (1 - fg.a),
    a: 1,
  }
}

// Stacks semi-transparent background layers, listed from the top-most to the bottom-most,
// over an opaque base. Each layer must blend with what lies beneath it, not with the page.
export function flattenLayers(layers: Rgba[], base: Rgba): Rgba {
  let result = base
  for (let i = layers.length - 1; i >= 0; i--) result = composite(layers[i]!, result)
  return result
}

function channelLuminance(value: number): number {
  const c = value / 255
  return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
}

export function relativeLuminance(color: Rgba): number {
  return (
    0.2126 * channelLuminance(color.r)
    + 0.7152 * channelLuminance(color.g)
    + 0.0722 * channelLuminance(color.b)
  )
}

// WCAG contrast ratio between two opaque colors, from 1 to 21.
export function contrastRatio(a: Rgba, b: Rgba): number {
  const la = relativeLuminance(a)
  const lb = relativeLuminance(b)
  const [light, dark] = la > lb ? [la, lb] : [lb, la]
  return (light + 0.05) / (dark + 0.05)
}

// Large text is 24px, or 18.66px (14pt) bold. Thresholds: 3:1 large, 4.5:1 otherwise.
export function requiredContrast(fontSizePx: number, fontWeight: number): number {
  const isLarge = fontSizePx >= 24 || (fontSizePx >= 18.66 && fontWeight >= 700)
  return isLarge ? 3 : 4.5
}

// Text made only of punctuation, symbols or spaces (separators such as "|" or "·")
// is incidental: it carries no content to read, so its contrast is not evaluated.
export function isIncidentalText(text: string): boolean {
  return /^[\p{P}\p{S}\s]*$/u.test(text)
}

export type TargetSeverity = 'fail' | 'warn' | 'ok'

export function classifyTarget(widthPx: number, heightPx: number): TargetSeverity {
  const smallest = Math.min(widthPx, heightPx)
  if (smallest < TARGET_MIN_PX) return 'fail'
  if (smallest < TARGET_RECOMMENDED_PX) return 'warn'
  return 'ok'
}
