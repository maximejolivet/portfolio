import { describe, expect, it } from 'vitest'
import { useCollapsible } from '~/composables/useCollapsible'

describe('useCollapsible', () => {
  it('starts folded unless listed as initially open', () => {
    const { isOpen } = useCollapsible(['a'])
    expect(isOpen('a')).toBe(true)
    expect(isOpen('b')).toBe(false)
  })

  it('unfolds a folded id on toggle and folds it again on the next one', () => {
    const { isOpen, toggle } = useCollapsible()
    toggle('a')
    expect(isOpen('a')).toBe(true)
    toggle('a')
    expect(isOpen('a')).toBe(false)
  })

  it('keeps ids independent', () => {
    const { isOpen, toggle } = useCollapsible()
    toggle('a')
    expect(isOpen('b')).toBe(false)
  })
})
