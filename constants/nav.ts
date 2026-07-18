import type { NavItem } from '~/types/content.types'

export const NAV_ITEMS: NavItem[] = [
  { id: 'home', labelKey: 'nav.home', to: '/', icon: 'lucide:home', iconOnly: true },
  { id: 'projects', labelKey: 'nav.projects', to: 'projects' },
  { id: 'contact', labelKey: 'nav.contact', to: '/', hash: '#contact' },
]
