import { describe, expect, it } from 'vitest'
import { buildSpeculationRules } from '../shared/utils/speculationRules'

describe('buildSpeculationRules', () => {
  const rules = buildSpeculationRules()
  const [rule] = rules.prerender

  it('prerenders case studies at moderate eagerness, not eagerly', () => {
    expect(rule?.eagerness).toBe('moderate')
  })

  it('targets both locale paths for project detail pages', () => {
    const json = JSON.stringify(rule?.where)
    expect(json).toContain('/fr/projets/*')
    expect(json).toContain('/en/projects/*')
  })

  it('excludes nofollow links, so confidential client projects are never prerendered', () => {
    expect(JSON.stringify(rule?.where)).toContain('[rel~=nofollow]')
  })

  it('serialises to valid JSON for the speculationrules script', () => {
    expect(() => JSON.parse(JSON.stringify(rules))).not.toThrow()
  })
})
