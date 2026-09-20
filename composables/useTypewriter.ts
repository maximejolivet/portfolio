import { reactive } from 'vue'

const CHARS_PER_TICK = 2
const TICK_MS = 10

// Per-id typing progress. An id with no entry is fully revealed (SSR / no-JS / already typed).
export function useTypewriter() {
  const progress = reactive(new Map<string, number>())
  const frames: Record<string, number> = {}
  const observers: IntersectionObserver[] = []

  const visibleChars = (id: string) => progress.get(id) ?? Infinity

  function type(id: string, total: number) {
    const skip
      = globalThis.matchMedia?.('(prefers-reduced-motion: reduce)').matches
        || globalThis.matchMedia?.('(max-width: 767px)').matches
    if (skip) return

    progress.set(id, 0)
    let lastTick = 0

    function step(now: number) {
      if (now - lastTick >= TICK_MS) {
        progress.set(id, Math.min(visibleChars(id) + CHARS_PER_TICK, total))
        lastTick = now
      }
      if (visibleChars(id) < total) {
        frames[id] = requestAnimationFrame(step)
      }
      else {
        progress.delete(id)
      }
    }

    frames[id] = requestAnimationFrame(step)
  }

  // Fires `type` once, the first time `el` scrolls into view.
  function typeOnceVisible(el: Element, id: string, total: number) {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        type(id, total)
        observer.disconnect()
      },
      { threshold: 0.2 },
    )
    observer.observe(el)
    observers.push(observer)
  }

  function stop() {
    Object.values(frames).forEach((frame) => cancelAnimationFrame(frame))
    observers.forEach((observer) => observer.disconnect())
  }

  return { visibleChars, type, typeOnceVisible, stop }
}
