import { describe, expect, it } from 'vitest'
import type { ClassValue } from '../lib/utils'
import { clsx, cn, twMerge } from '../lib/utils'

describe('clsx', () => {
  it('joins plain strings', () => {
    expect(clsx('a', 'b')).toBe('a b')
  })

  it('drops falsy values', () => {
    expect(clsx('a', undefined, null, false, 0, '', 'b')).toBe('a b')
  })

  it('flattens arrays', () => {
    expect(clsx(['a', 'b'], 'c')).toBe('a b c')
  })

  it('keeps only truthy object keys', () => {
    expect(clsx({ a: true, b: false, c: 1, d: 0 })).toBe('a c')
  })

  it('preserves left-to-right, depth-first order across nested arrays', () => {
    expect(clsx('a', ['b', ['c', 'd']], 'e')).toBe('a b c d e')
  })

  it('does not blow the call stack on a pathologically deep nested array', () => {
    let deeplyNested: ClassValue = 'bottom'
    for (let i = 0; i < 50_000; i++) deeplyNested = [deeplyNested]
    expect(() => clsx(deeplyNested)).not.toThrow()
    expect(clsx(deeplyNested)).toBe('bottom')
  })

  it('only reads the object input\'s own properties, not inherited ones', () => {
    const base = { inherited: true }
    const input = Object.create(base) as Record<string, boolean>
    input.own = true
    expect(clsx(input)).toBe('own')
  })
})

describe('twMerge', () => {
  it('keeps the later class when two utilities conflict', () => {
    expect(twMerge('p-4 p-6')).toBe('p-6')
  })

  it('keeps unrelated classes untouched', () => {
    expect(twMerge('flex items-center p-4')).toBe('flex items-center p-4')
  })

  it('does not confuse padding sides with the shorthand', () => {
    expect(twMerge('p-4 px-6')).toBe('p-4 px-6')
  })

  it('resolves rounded-corner conflicts', () => {
    expect(twMerge('rounded-xl rounded-2xl')).toBe('rounded-2xl')
  })

  it('distinguishes text size from text color', () => {
    expect(twMerge('text-sm text-foreground text-lg')).toBe('text-lg text-foreground')
  })

  it('only conflicts within the same variant chain', () => {
    expect(twMerge('bg-red-500 hover:bg-blue-500')).toBe('bg-red-500 hover:bg-blue-500')
  })

  it('resolves conflicts within the same variant chain', () => {
    expect(twMerge('hover:bg-red-500 hover:bg-blue-500')).toBe('hover:bg-blue-500')
  })

  it('does not treat a ":" inside an arbitrary-variant bracket as a modifier split', () => {
    expect(twMerge('[&_svg:not([class*=\'size-\'])]:size-3 [&_svg:not([class*=\'size-\'])]:size-4'))
      .toBe('[&_svg:not([class*=\'size-\'])]:size-4')
  })

  it('passes unrecognized classes through unchanged', () => {
    expect(twMerge('animate-pulse-dot custom-thing')).toBe('animate-pulse-dot custom-thing')
  })
})

describe('cn', () => {
  it('combines clsx flattening with twMerge conflict resolution', () => {
    expect(cn('rounded-xl p-6', { hidden: false }, ['gap-4'], 'rounded-2xl p-4')).toBe('rounded-2xl p-4 gap-4')
  })
})
