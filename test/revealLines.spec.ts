import { describe, expect, it } from 'vitest'
import { revealLines } from '~/utils/revealLines'

describe('revealLines', () => {
  it('shows everything when the budget is unbounded', () => {
    const lines = revealLines(['ab', 'cd'], Infinity)
    expect(lines.map((l) => l.text)).toEqual(['ab', 'cd'])
    expect(lines.every((l) => l.isDone)).toBe(true)
  })

  it('spreads the budget across lines in order', () => {
    const [first, second, third] = revealLines(['abc', 'def', 'ghi'], 4)
    expect(first).toEqual({ text: 'abc', isStarted: true, isDone: true })
    expect(second).toEqual({ text: 'd', isStarted: true, isDone: false })
    expect(third).toEqual({ text: '', isStarted: false, isDone: false })
  })

  it('reveals nothing at zero', () => {
    expect(revealLines(['abc'], 0)[0]).toEqual({ text: '', isStarted: false, isDone: false })
  })
})
