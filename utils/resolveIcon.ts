import iconSubset from './generated/icon-subset.json'

interface IconCollection {
  prefix: string
  width: number
  height: number
  icons: Record<string, { body: string, width?: number, height?: number, left?: number, top?: number }>
}

const COLLECTIONS: Record<string, IconCollection> = iconSubset

export interface ResolvedIcon {
  body: string
  width: number
  height: number
  // viewBox origin. Some Iconify icons (e.g. material-icon-theme json) are drawn at
  // top: -960, so the viewBox must start there or the artwork sits outside it.
  left: number
  top: number
}

export function resolveIcon(ref?: string | null): ResolvedIcon {
  // A missing ref (undefined from a lookup table) or an unknown name must render
  // an empty icon, not throw during SSR.
  const parts = (ref ?? '').split(':')
  const prefix = parts[0]
  const name = parts[1]

  if (!prefix || !name) {
    return { body: '', width: 24, height: 24, left: 0, top: 0 }
  }

  const collection = COLLECTIONS[prefix as keyof typeof COLLECTIONS]
  const icon = collection?.icons?.[name]

  if (!collection || !icon) {
    return { body: '', width: collection?.width ?? 24, height: collection?.height ?? 24, left: 0, top: 0 }
  }

  return {
    body: icon.body,
    width: icon.width ?? collection.width ?? 24,
    height: icon.height ?? collection.height ?? 24,
    left: icon.left ?? 0,
    top: icon.top ?? 0,
  }
}
