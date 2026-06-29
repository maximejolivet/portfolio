import type { Ref } from 'vue'
import { gsap } from 'gsap'
import type { ScrollTrigger } from 'gsap/ScrollTrigger'

interface ScrollRevealOptions {
  /** Reveal direct children with a staggered offset instead of the root element itself */
  stagger?: number
  y?: number
  duration?: number
  delay?: number
  start?: string
}

export function useScrollReveal(
  target: Ref<HTMLElement | null>,
  options: ScrollRevealOptions = {},
) {
  let trigger: ScrollTrigger | undefined

  onMounted(() => {
    const el = target.value
    if (!el) return

    const targets = options.stagger ? Array.from(el.children) : el
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
      gsap.set(targets, { opacity: 1, y: 0 })
      return
    }

    const animation = gsap.fromTo(
      targets,
      { opacity: 0, y: options.y ?? 32 },
      {
        opacity: 1,
        y: 0,
        duration: options.duration ?? 0.8,
        delay: options.delay ?? 0,
        stagger: options.stagger ?? 0,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: options.start ?? 'top 80%',
        },
      },
    )

    trigger = animation.scrollTrigger
  })

  onUnmounted(() => {
    trigger?.kill()
  })
}
