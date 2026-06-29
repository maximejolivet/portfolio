export interface NavItem {
  id: string
  labelKey: string
  to: string
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
  period: string
  titleKey: string
  organizationKey: string
  descriptionKey: string
}

export interface ClientSector {
  id: string
  labelKey: string
  icon: string
  clients: string[]
}
