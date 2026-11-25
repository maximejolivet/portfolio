// Source text for the editor files shown in the hero panel (projects/index.ts, contact.ts).
// Values go through JSON.stringify so quotes and accents stay valid in the shown code.

export interface PanelProject {
  slug: string
  title: string
  year: string
}

export function renderProjectsFile(projects: PanelProject[]): string[] {
  return [
    'export const personalProjects = [',
    ...projects.map(
      (p) => `  { slug: ${JSON.stringify(p.slug)}, title: ${JSON.stringify(p.title)}, year: ${JSON.stringify(p.year)} },`,
    ),
    ']',
  ]
}

export interface PanelContact {
  email: string
  booking: string
  status: string
  socials: string[]
}

export function renderContactFile(contact: PanelContact): string[] {
  return [
    'export const contact = {',
    `  email: ${JSON.stringify(contact.email)},`,
    `  booking: ${JSON.stringify(contact.booking)},`,
    `  status: ${JSON.stringify(contact.status)},`,
    '  socials: [',
    ...contact.socials.map((href) => `    ${JSON.stringify(href)},`),
    '  ],',
    '}',
  ]
}
