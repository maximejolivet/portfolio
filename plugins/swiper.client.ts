import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin(async () => {
  const { register } = await import('swiper/element/bundle')
  register()
})
