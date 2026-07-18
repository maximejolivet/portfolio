import lucideData from '@iconify-json/lucide/icons.json'
import logosData from '@iconify-json/logos/icons.json'

interface IconCollection {
  prefix: string
  width: number
  height: number
  icons: Record<string, { body: string; width?: number; height?: number }>
  aliases?: Record<string, { parent: string }>
}

const COLLECTIONS: Record<string, IconCollection> = {
  lucide: lucideData,
  logos: logosData,
}

export interface ResolvedIcon {
  body: string
  width: number
  height: number
}

export function resolveIcon(ref: string): ResolvedIcon {
  const [prefix, name] = ref.split(':')
  const collection = COLLECTIONS[prefix]
  const parent = collection?.aliases?.[name]?.parent
  const icon = collection?.icons[name] ?? (parent ? collection?.icons[parent] : undefined)

  return {
    body: icon?.body ?? '',
    width: icon?.width ?? collection?.width ?? 24,
    height: icon?.height ?? collection?.height ?? 24,
  }
}
