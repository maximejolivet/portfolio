import { afterEach, describe, expect, it, vi } from 'vitest'
import { useTypewriter } from '~/composables/useTypewriter'

function stubBrowser(matchesMedia = false) {
  let callback: FrameRequestCallback | undefined
  const cancel = vi.fn()
  const request = vi.fn((fn: FrameRequestCallback) => {
    callback = fn
    return 1
  })
  vi.stubGlobal('requestAnimationFrame', request)
  vi.stubGlobal('cancelAnimationFrame', cancel)
  vi.stubGlobal('matchMedia', () => ({ matches: matchesMedia }))
  return {
    request,
    cancel,
    tick(now: number) {
      const fn = callback!
      callback = undefined
      fn(now)
    },
  }
}

describe('useTypewriter', () => {
  afterEach(() => vi.unstubAllGlobals())

  it('treats an id nobody typed as fully revealed', () => {
    stubBrowser()
    expect(useTypewriter().visibleChars('a')).toBe(Infinity)
  })

  it('types progressively, then reveals everything', () => {
    const browser = stubBrowser()
    const { visibleChars, type } = useTypewriter()
    type('a', 5)
    expect(visibleChars('a')).toBe(0)
    browser.tick(10)
    expect(visibleChars('a')).toBe(2)
    browser.tick(20)
    expect(visibleChars('a')).toBe(4)
    browser.tick(30)
    expect(visibleChars('a')).toBe(Infinity)
  })

  it('skips the animation for reduced motion / small screens', () => {
    const browser = stubBrowser(true)
    const { visibleChars, type } = useTypewriter()
    type('a', 5)
    expect(visibleChars('a')).toBe(Infinity)
    expect(browser.request).not.toHaveBeenCalled()
  })

  it('types once when the element first scrolls into view, then stops observing', () => {
    const browser = stubBrowser()
    let onIntersect: IntersectionObserverCallback = () => {}
    const disconnect = vi.fn()
    vi.stubGlobal(
      'IntersectionObserver',
      class {
        constructor(cb: IntersectionObserverCallback) {
          onIntersect = cb
        }

        observe = vi.fn()
        disconnect = disconnect
      },
    )
    const { visibleChars, typeOnceVisible } = useTypewriter()
    typeOnceVisible({} as Element, 'a', 5)
    onIntersect([{ isIntersecting: false }] as IntersectionObserverEntry[], {} as IntersectionObserver)
    expect(browser.request).not.toHaveBeenCalled()
    onIntersect([{ isIntersecting: true }] as IntersectionObserverEntry[], {} as IntersectionObserver)
    expect(visibleChars('a')).toBe(0)
    expect(disconnect).toHaveBeenCalledOnce()
  })

  it('cancels pending frames on stop', () => {
    const browser = stubBrowser()
    const { type, stop } = useTypewriter()
    type('a', 5)
    stop()
    expect(browser.cancel).toHaveBeenCalledWith(1)
  })
})
