import { describe, expect, it } from 'vitest'
import { renderBars, renderTimeline } from '../utils/terminalRender'

describe('renderBars', () => {
  it('scales the largest count to the full bar width', () => {
    const [first] = renderBars([{ label: 'Vue.js', count: 3 }, { label: 'Nuxt', count: 1 }], 12)
    expect(first).toContain('█'.repeat(12))
  })

  it('gives a zero count no bar, but still shows it', () => {
    const [line] = renderBars([{ label: 'Svelte', count: 0 }, { label: 'Vue', count: 2 }], 8)
    expect(line).not.toContain('█')
    expect(line?.trim().endsWith('0')).toBe(true)
  })

  it('uses a shared scale when given one, so bars compare across groups', () => {
    const [line] = renderBars([{ label: 'PHP', count: 1 }], 10, 10)
    expect(line!.split('█').length - 1).toBe(1)
  })

  it('aligns the bars on the longest label', () => {
    const lines = renderBars([{ label: 'PHP', count: 1 }, { label: 'JavaScript', count: 1 }], 4)
    expect(lines[0]!.indexOf('█')).toBe(lines[1]!.indexOf('█'))
  })

  it('keeps every bar between 1 and maxBar characters when the count is positive', () => {
    const lines = renderBars([{ label: 'A', count: 1 }, { label: 'B', count: 100 }], 10)
    const small = lines[0]!.split('█').length - 1
    expect(small).toBeGreaterThanOrEqual(1)
    expect(lines[1]!.split('█').length - 1).toBe(10)
  })
})

describe('renderTimeline', () => {
  const rows = [
    { period: '2017 - 2026', title: 'Développeur', organization: 'A' },
    { period: '2015', title: 'Stage', organization: 'B' },
    { period: '2014', title: 'Stage', organization: 'C' },
  ]

  it('draws one connector between consecutive entries only', () => {
    const lines = renderTimeline(rows)
    expect(lines.filter((line) => line === '│')).toHaveLength(2)
    expect(lines[lines.length - 1]).toContain('C')
  })

  it('returns an empty list for no entries', () => {
    expect(renderTimeline([])).toEqual([])
  })
})
