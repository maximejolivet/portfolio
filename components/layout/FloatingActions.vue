<script setup lang="ts">
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
  <div class="fixed bottom-4 right-0 md:right-6 z-50 flex flex-col items-end gap-3">
    <div class="group relative flex items-center">
      <span
        class="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-full bg-foreground px-3 py-1.5 font-sans text-xs font-semibold text-background opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-active:opacity-100"
      >
        {{ $t('home.contact.chat') }}
      </span>
      <button
        id="ia-chat-trigger"
        type="button"
        class="flex size-11 items-center justify-center rounded-l-full border-y border-l-0 border-r border-primary bg-primary text-primary-foreground shadow-lg transition-transform duration-300 hover:scale-105 hover:bg-accent hover:border-accent md:size-14 md:rounded-full md:border cursor-pointer"
        :aria-label="$t('home.contact.chat')"
      >
        <UiAppIcon icon="lucide:message-circle" class="pointer-events-none size-4 md:size-5" />
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
        class="hidden size-14 items-center justify-center rounded-full border border-black bg-background text-foreground shadow-md transition-colors hover:text-accent md:flex cursor-pointer [[data-theme=night]_&]:border-border [[data-theme=night]_&]:bg-black"
        :aria-label="$t('footer.backToTop')"
        @click="scrollToTop"
      >
        <UiAppIcon icon="lucide:arrow-up" class="size-5" />
      </button>
    </Transition>
  </div>
</template>
