import opentype from 'opentype.js'

// Text is drawn as vector outlines (SVG paths) rather than <text>, so the image does not depend
// on the visitor's installed fonts and carries no selectable or indexable text.
// Fonts ship in server/assets/fonts and are read through Nitro storage, so they are bundled
// with the server output (works on Vercel).
//
// Each distinct character is outlined once at the origin (<defs>) and placed with <use>. Placing
// the outlines at their final coordinates makes opentype.js emit NaN for some glyphs, so we don't.
export type OutlineWeight = 'medium' | 'semibold'

const FONT_FILES: Record<OutlineWeight, string> = {
  medium: 'fonts/SpaceGrotesk-Medium.ttf',
  semibold: 'fonts/SpaceGrotesk-SemiBold.ttf',
}

const cache = new Map<OutlineWeight, Promise<opentype.Font>>()

export function loadOutlineFont(weight: OutlineWeight): Promise<opentype.Font> {
  let font = cache.get(weight)
  if (!font) {
    font = (async () => {
      const raw = await useStorage('assets:server').getItemRaw<Uint8Array>(FONT_FILES[weight])
      if (!raw) throw new Error(`Missing font asset: ${FONT_FILES[weight]}`)
      const bytes = raw.buffer.slice(raw.byteOffset, raw.byteOffset + raw.byteLength) as ArrayBuffer
      return opentype.parse(bytes)
    })()
    cache.set(weight, font)
  }
  return font
}

// Horizontal position of each character (in px) and the total advance, with kerning.
export function layoutRun(font: opentype.Font, text: string, size: number) {
  const scale = size / font.unitsPerEm
  const chars = [...text]
  const glyphs = chars.map((ch) => font.charToGlyph(ch))
  const xs: number[] = []
  let x = 0
  glyphs.forEach((glyph, i) => {
    xs.push(x)
    const next = glyphs[i + 1]
    const kern = next ? font.getKerningValue(glyph, next) : 0
    x += (glyph.advanceWidth + (Number.isFinite(kern) ? kern : 0)) * scale
  })
  return { chars, xs, width: x }
}

export function measureText(font: opentype.Font, text: string, size: number): number {
  return layoutRun(font, text, size).width
}

// SVG markup for one line of text whose baseline starts at (x, y). `defs` must be emitted once
// per image, and `ids` maps each character to its shared outline id.
export function outlineDefs(font: opentype.Font, texts: string[], size: number): { defs: string, ids: Map<string, string> } {
  const ids = new Map<string, string>()
  for (const text of texts) {
    for (const ch of text) {
      if (ch.trim() && !ids.has(ch)) ids.set(ch, `g${ids.size}`)
    }
  }
  const defs = [...ids].map(([ch, id]) => `<path id="${id}" d="${font.charToGlyph(ch).getPath(0, 0, size).toPathData(2)}"/>`).join('')
  return { defs, ids }
}

export function outlineUses(font: opentype.Font, ids: Map<string, string>, text: string, x: number, y: number, size: number): string {
  const { chars, xs } = layoutRun(font, text, size)
  return chars
    .map((ch, i) => (ids.has(ch) ? `<use href="#${ids.get(ch)}" x="${(x + xs[i]!).toFixed(2)}" y="${y.toFixed(2)}"/>` : ''))
    .join('')
}
