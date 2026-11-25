import { describe, expect, it } from 'vitest'
import { renderContactFile, renderProjectsFile } from '../utils/panelFiles'

describe('renderProjectsFile', () => {
  it('wraps one entry per project in an exported array', () => {
    const lines = renderProjectsFile([
      { slug: 'saur', title: 'SAUR', year: '2025' },
      { slug: 'precia-molen', title: 'Precia Molen', year: '2026' },
    ])
    expect(lines[0]).toBe('export const personalProjects = [')
    expect(lines[lines.length - 1]).toBe(']')
    expect(lines).toHaveLength(4)
    expect(lines[1]).toContain('slug: "saur"')
  })

  it('escapes quotes in titles', () => {
    const [, line] = renderProjectsFile([{ slug: 'x', title: 'Say "hi"', year: '2024' }])
    expect(line).toContain('"Say \\"hi\\""')
  })

  it('returns an empty array body when there are no projects', () => {
    expect(renderProjectsFile([])).toEqual(['export const personalProjects = [', ']'])
  })
})

describe('renderContactFile', () => {
  const lines = renderContactFile({
    email: 'a@b.fr',
    booking: 'https://example.com',
    status: 'open_to_work',
    socials: ['https://github.com/x', 'https://linkedin.com/in/x'],
  })

  it('exports one contact object with the email first', () => {
    expect(lines[0]).toBe('export const contact = {')
    expect(lines[1]).toBe('  email: "a@b.fr",')
  })

  it('lists every social link inside the socials array', () => {
    const start = lines.indexOf('  socials: [')
    const end = lines.indexOf('  ],')
    expect(end - start - 1).toBe(2)
  })
})
