import { afterEach, describe, expect, it, vi } from 'vitest'
import { useExperienceLog } from '~/composables/useExperienceLog'
import type { TimelineItem } from '~/types/content.types'

const item = (id: string, extra: Partial<TimelineItem> = {}): TimelineItem => ({
  id,
  periodKey: `${id}.period`,
  titleKey: `${id}.title`,
  organizationKey: `${id}.org`,
  organizationUrl: 'https://example.com',
  locationKey: `${id}.location`,
  ...extra,
})

const ITEMS = [
  item('first', { introKey: 'first.intro', descriptionPointsKeys: ['first.p0', 'first.p1'] }),
  item('second', { descriptionKey: 'second.desc' }),
]
const t = (key: string) => key

function stubBrowser() {
  const request = vi.fn(() => 1)
  vi.stubGlobal('requestAnimationFrame', request)
  vi.stubGlobal('cancelAnimationFrame', vi.fn())
  vi.stubGlobal('matchMedia', () => ({ matches: false }))
  return request
}

describe('useExperienceLog', () => {
  afterEach(() => vi.unstubAllGlobals())

  it('builds the log lines of every entry, fully revealed by default', () => {
    const { entries } = useExperienceLog(ITEMS, t)
    const [first, second] = entries.value
    expect(first.location.text).toBe('# first.location')
    expect(first.intro?.text).toBe('first.intro')
    expect(first.points.map((p) => p.text)).toEqual(['first.p0', 'first.p1'])
    expect(second.intro).toBeNull()
    expect(second.points.map((p) => p.text)).toEqual(['second.desc'])
    expect(first.totalChars).toBe('# first.location'.length + 'first.intro'.length + 16)
  })

  it('keeps the latest entry open and ignores toggling it', () => {
    const request = stubBrowser()
    const { entries, isOpen, onToggle, alwaysOpenId } = useExperienceLog(ITEMS, t)
    expect(alwaysOpenId).toBe('first')
    expect(isOpen('first')).toBe(true)
    expect(isOpen('second')).toBe(false)
    onToggle(entries.value[0])
    expect(isOpen('first')).toBe(true)
    expect(request).not.toHaveBeenCalled()
  })

  it('types an entry only the first time it is unfolded', () => {
    const request = stubBrowser()
    const { entries, isOpen, onToggle } = useExperienceLog(ITEMS, t)
    onToggle(entries.value[1])
    expect(isOpen('second')).toBe(true)
    expect(request).toHaveBeenCalledTimes(1)
    expect(entries.value[1].location.isStarted).toBe(false)
    onToggle(entries.value[1])
    onToggle(entries.value[1])
    expect(isOpen('second')).toBe(true)
    expect(request).toHaveBeenCalledTimes(1)
  })

  it('starts typing the latest entry once its section is visible', () => {
    stubBrowser()
    let onIntersect: IntersectionObserverCallback = () => {}
    vi.stubGlobal(
      'IntersectionObserver',
      class {
        constructor(cb: IntersectionObserverCallback) {
          onIntersect = cb
        }

        observe = vi.fn()
        disconnect = vi.fn()
      },
    )
    const { entries, start } = useExperienceLog(ITEMS, t)
    start({} as Element)
    onIntersect([{ isIntersecting: true }] as IntersectionObserverEntry[], {} as IntersectionObserver)
    expect(entries.value[0].location.isStarted).toBe(false)
  })
})
