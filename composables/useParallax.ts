import type { Ref } from 'vue'
import { gsap } from 'gsap'
import type { ScrollTrigger } from 'gsap/ScrollTrigger'

interface ParallaxOptions {
  distance?: number
  start?: string
  end?: string
}

export function useParallax(target: Ref<HTMLElement | null>, options: ParallaxOptions = {}) {
  let trigger: ScrollTrigger | undefined

  onMounted(() => {
    const el = target.value
    if (!el) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const animation = gsap.to(el, {
      y: options.distance ?? -60,
      ease: 'none',
      scrollTrigger: {
        trigger: el,
        start: options.start ?? 'top bottom',
        end: options.end ?? 'bottom top',
        scrub: true,
      },
    })

    trigger = animation.scrollTrigger
  })

  onUnmounted(() => {
    trigger?.kill()
  })
}
