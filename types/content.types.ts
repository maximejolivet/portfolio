export interface NavItem {
  id: string
  labelKey: string
  to: string
  hash?: string
  icon?: string
  iconOnly?: boolean
}

export interface TechItem {
  id: string
  name: string
  icon: string
}

export interface TechCategory {
  id: string
  labelKey: string
  descriptionKey: string
  items: TechItem[]
}

export interface TimelineItem {
  id: string
  periodKey: string
  titleKey: string
  organizationKey: string
  organizationUrl: string
  locationKey: string
  descriptionKey?: string
  introKey?: string
  descriptionPointsKeys?: string[]
}

export interface ClientSector {
  id: string
  labelKey: string
  icon: string
  clients: string[]
}
