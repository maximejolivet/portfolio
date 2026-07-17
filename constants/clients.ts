import type { ClientSector } from '~/types/content.types'

export const CLIENT_SECTORS: ClientSector[] = [
  {
    id: 'construction',
    labelKey: 'clientsSection.sectors.construction',
    icon: 'lucide:building-2',
    clients: [
      'Saint-Gobain',
      'Eurocoustic',
      'Plafometal',
      'Groupe Intuis / Muller',
      'Noirot',
      'Applimo',
      'Airelec',
      'Groupe SAMSE',
      'Akena',
      'Andrety',
      'Wibaie',
      'Fenetrea',
      'Abrisud',
      'Janneau',
      'Artibat',
      'Groupe Ginger Travaux publics',
    ],
  },
  {
    id: 'energy',
    labelKey: 'clientsSection.sectors.energy',
    icon: 'lucide:zap',
    clients: ['SAUR', 'Groupe Claire', 'SAMOA Nantes', 'CCI Pays de la Loire', 'Boralex', 'Idex'],
  },
  {
    id: 'industry',
    labelKey: 'clientsSection.sectors.industry',
    icon: 'lucide:factory',
    clients: ['Fraikin', 'Otokar', 'ThyssenKrupp', 'NGE', 'CF Group / Fija', 'Capremib', 'CFAO'],
  },
  {
    id: 'agriculture',
    labelKey: 'clientsSection.sectors.agriculture',
    icon: 'lucide:wheat',
    clients: ['Groupe Techna', 'Cooperl', 'Armor'],
  },
  {
    id: 'health',
    labelKey: 'clientsSection.sectors.health',
    icon: 'lucide:heart-pulse',
    clients: ['Vygon', 'PiLeJe', 'LNA Santé', 'Fondation Motrice', 'Nature & Stratégie / Coslys'],
  },
  {
    id: 'services',
    labelKey: 'clientsSection.sectors.services',
    icon: 'lucide:briefcase',
    clients: ['Onet', 'Best Drive', 'Ampelio', 'Precia Molen', 'OUNO'],
  },
  {
    id: 'finance',
    labelKey: 'clientsSection.sectors.finance',
    icon: 'lucide:landmark',
    clients: ['Mutualia', 'Malakoff Humanis', 'Groupe VYV / Mona'],
  },
]
