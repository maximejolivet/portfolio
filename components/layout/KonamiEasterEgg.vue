<script setup lang="ts">
import { GITHUB_REPO_URL } from '~/constants/pageSource'

const { t } = useI18n()

const open = ref(false)
let buffer: string[] = []
let hideTimeout: ReturnType<typeof setTimeout> | undefined

const KONAMI_SEQUENCE = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a',
]

function isTypingTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false
  return (
    target.tagName === 'INPUT'
    || target.tagName === 'TEXTAREA'
    || target.isContentEditable
  )
}

function close() {
  open.value = false
  clearTimeout(hideTimeout)
}

function onKeydown(event: KeyboardEvent) {
  if (isTypingTarget(event.target)) return

  buffer.push(event.key.length === 1 ? event.key.toLowerCase() : event.key)
  buffer = buffer.slice(-KONAMI_SEQUENCE.length)

  if (buffer.length === KONAMI_SEQUENCE.length && buffer.every((key, i) => key === KONAMI_SEQUENCE[i])) {
    buffer = []
    open.value = true
    clearTimeout(hideTimeout)
    hideTimeout = setTimeout(close, 8000)
  }
}

onMounted(() => window.addEventListener('keydown', onKeydown))
onUnmounted(() => {
  window.removeEventListener('keydown', onKeydown)
  clearTimeout(hideTimeout)
})
</script>

<template>
  <Transition
    enter-active-class="transition duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
    enter-from-class="opacity-0 translate-y-4"
    enter-to-class="opacity-100 translate-y-0"
    leave-active-class="transition duration-200 ease-in"
    leave-from-class="opacity-100 translate-y-0"
    leave-to-class="opacity-0 translate-y-4"
  >
    <div
      v-if="open"
      class="fixed bottom-6 left-1/2 z-[100] w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 rounded-2xl border border-panel-foreground/10 bg-panel-2 p-5 font-mono text-panel-foreground shadow-2xl sm:left-auto sm:right-6 sm:translate-x-0"
    >
      <div class="flex items-start justify-between gap-3">
        <div class="flex items-center gap-2">
          <UiAppIcon icon="lucide:sparkles" class="size-4 text-mint" />
          <h2 class="text-sm font-bold">
            {{ t('konami.title') }}
          </h2>
        </div>
        <button
          type="button"
          :aria-label="t('konami.close')"
          class="flex size-7 shrink-0 items-center justify-center rounded-full text-panel-foreground/60 transition-colors hover:text-mint"
          @click="close"
        >
          <UiAppIcon icon="lucide:x" class="size-4" />
        </button>
      </div>

      <p class="mt-2 text-xs leading-relaxed text-panel-foreground/70">
        {{ t('konami.message') }}
      </p>

      <a
        :href="GITHUB_REPO_URL"
        target="_blank"
        rel="noopener noreferrer"
        class="mt-3 inline-flex items-center gap-1.5 text-xs text-mint hover:underline"
      >
        <UiAppIcon icon="lucide:github" class="size-3.5" />
        {{ t('konami.cta') }}
      </a>
    </div>
  </Transition>
</template>
