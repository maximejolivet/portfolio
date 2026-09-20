import { describe, expect, it } from 'vitest'
import { logoMaskStyle } from '~/utils/logoMaskStyle'

describe('logoMaskStyle', () => {
  it('masks with the logo, prefixed and unprefixed', () => {
    const style = logoMaskStyle('/logo.svg')
    expect(style.maskImage).toBe('url(/logo.svg)')
    expect(style.WebkitMaskImage).toBe('url(/logo.svg)')
    expect(style.maskSize).toBe('contain')
  })
})
