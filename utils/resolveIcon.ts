import deviconData from '@iconify-json/devicon/icons.json'
import deviconPlainData from '@iconify-json/devicon-plain/icons.json'
import lucideData from '@iconify-json/lucide/icons.json'
import logosData from '@iconify-json/logos/icons.json'
import materialIconThemeData from '@iconify-json/material-icon-theme/icons.json'
import selfhstData from '@iconify-json/selfhst/icons.json'
import skillIconsData from '@iconify-json/skill-icons/icons.json'

interface IconCollection {
  prefix: string
  width: number
  height: number
  icons: Record<string, { body: string, width?: number, height?: number }>
  aliases?: Record<string, { parent: string }>
}

const COLLECTIONS: Record<string, IconCollection> = {
  'devicon': deviconData,
  'devicon-plain': deviconPlainData,
  'lucide': lucideData,
  'logos': logosData,
  'material-icon-theme': materialIconThemeData,
  'selfhst': selfhstData,
  'skill-icons': skillIconsData,
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
