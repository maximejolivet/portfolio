import { defineNuxtPlugin } from '#app'

// Swiper only powers the swipeable project row on phones (see ProjectsSection). Desktop
// visitors never load it, which saves its bundle on every page. The element is registered
// once, when the viewport first matches a phone width.
const PHONE_QUERY = '(max-width: 639px)'

export default defineNuxtPlugin(() => {
  let registered = false

  async function registerSwiper() {
    if (registered) return
    registered = true
    const { register } = await import('swiper/element/bundle')
    register()
  }

  const query = window.matchMedia(PHONE_QUERY)
  if (query.matches) registerSwiper()
  else query.addEventListener('change', (event) => {
    if (event.matches) registerSwiper()
  })
})
