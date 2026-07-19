<script setup lang="ts">
import { CAL_LINK, CAL_NAMESPACE } from '~/constants/contact'

const { refused: calRefused } = useCalConsent()
const showBackToTop = ref(false)

function onScroll() {
  showBackToTop.value = window.scrollY > 400
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<template>
  <div class="fixed bottom-4 right-4 md:bottom-4 md:right-6 z-50 flex flex-col items-end gap-3">
    <div v-if="!calRefused" class="group relative flex items-center">
      <span
        class="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-full bg-foreground px-3 py-1.5 font-sans text-xs font-semibold text-background opacity-0 transition-opacity duration-200 group-hover:opacity-100"
      >
        {{ $t('home.contact.bookCall') }}
      </span>
      <button
        type="button"
        class="flex size-11 items-center justify-center rounded-full bg-primary border border-primary text-primary-foreground shadow-lg transition-transform duration-300 hover:scale-105 hover:bg-accent hover:border-accent md:size-14 cursor-pointer"
        :aria-label="$t('home.contact.bookCall')"
        :data-cal-link="CAL_LINK"
        :data-cal-namespace="CAL_NAMESPACE"
        data-cal-config="{&quot;layout&quot;:&quot;month_view&quot;,
          &quot;useSlotsViewOnSmallScreen&quot;:&quot;true&quot;}"
      >
        <UiAppIcon icon="lucide:calendar" class="size-4 md:size-5" />
      </button>
    </div>

    <Transition
      enter-active-class="transition duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
      enter-from-class="opacity-0 translate-y-4 scale-75"
      enter-to-class="opacity-100 translate-y-0 scale-100"
      leave-active-class="transition duration-300 ease-in"
      leave-from-class="opacity-100 translate-y-0 scale-100"
      leave-to-class="opacity-0 translate-y-4 scale-75"
    >
      <button
        v-if="showBackToTop"
        type="button"
        class="hidden size-14 items-center justify-center rounded-full border border-black bg-background text-foreground shadow-md transition-colors hover:text-accent md:flex cursor-pointer"
        :aria-label="$t('footer.backToTop')"
        @click="scrollToTop"
      >
        <UiAppIcon icon="lucide:arrow-up" class="size-5" />
      </button>
    </Transition>
  </div>
</template>
