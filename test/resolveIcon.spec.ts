import { describe, expect, it } from 'vitest'
import { resolveIcon } from '../utils/resolveIcon'

describe('resolveIcon', () => {
  it('returns an empty icon for a missing ref instead of throwing', () => {
    expect(resolveIcon(undefined).body).toBe('')
    expect(resolveIcon(null).body).toBe('')
    expect(resolveIcon('').body).toBe('')
  })

  it('returns an empty icon for an unknown collection or name', () => {
    expect(resolveIcon('nope:whatever').body).toBe('')
    expect(resolveIcon('lucide:this-icon-does-not-exist').body).toBe('')
  })

  it('resolves a known icon from the generated subset', () => {
    const icon = resolveIcon('lucide:kanban')
    expect(icon.body).not.toBe('')
    expect(icon.width).toBeGreaterThan(0)
    expect(icon.height).toBeGreaterThan(0)
  })
})
