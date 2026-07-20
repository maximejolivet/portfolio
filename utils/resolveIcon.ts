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

export function resolveIcon(ref: string): ResolvedIcon {
  const [prefix, name] = ref.split(':')
  const collection = COLLECTIONS[prefix]
  const icon = name ? collection?.icons[name] : undefined

  return {
    body: icon?.body ?? '',
    width: icon?.width ?? collection?.width ?? 24,
    height: icon?.height ?? collection?.height ?? 24,
  }
}
