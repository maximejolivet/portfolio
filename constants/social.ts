export interface SocialLink {
  id: string
  label: string
  href: string
  icon: string
}

export const SOCIAL_LINKS: SocialLink[] = [
  {
    id: 'github',
    label: 'GitHub',
    href: 'https://github.com/maximejolivet',
    icon: 'lucide:github',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/jolivetmaxime/',
    icon: 'lucide:linkedin',
  },
]
