import type { NavItem } from '~/types/content.types'

export const NAV_ITEMS: NavItem[] = [
  { id: 'projects', labelKey: 'nav.projects', to: 'projects' },
  { id: 'blog', labelKey: 'nav.blog', to: 'blog' },
  { id: 'contact', labelKey: 'nav.contact', to: '/', hash: '#contact' },
]
