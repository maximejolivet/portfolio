import iconSubset from './generated/icon-subset.json'

interface IconCollection {
  prefix: string
  width: number
  height: number
  icons: Record<string, { body: string, width?: number, height?: number }>
}

const COLLECTIONS: Record<string, IconCollection> = iconSubset

export interface ResolvedIcon {
  body: string
  width: number
  height: number
}

export function resolveIcon(ref?: string | null): ResolvedIcon {
  // A missing ref (undefined from a lookup table) or an unknown name must render
  // an empty icon, not throw during SSR.
  const parts = (ref ?? '').split(':')
  const prefix = parts[0]
  const name = parts[1]

  if (!prefix || !name) {
    return { body: '', width: 24, height: 24 }
  }

  const collection = COLLECTIONS[prefix as keyof typeof COLLECTIONS]
  const icon = collection?.icons?.[name]

  if (!collection || !icon) {
    return { body: '', width: collection?.width ?? 24, height: collection?.height ?? 24 }
  }

  return {
    body: icon.body,
    width: icon.width ?? collection.width ?? 24,
    height: icon.height ?? collection.height ?? 24,
  }
}
