<script setup lang="ts">
const { t } = useI18n()

const open = ref(false)

const SHORTCUT_KEYS = [
  ['?'],
  ['Ctrl/⌘', 'Shift', 'P'],
  ['Esc'],
] as const

function isTypingTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false
  return (
    target.tagName === 'INPUT'
    || target.tagName === 'TEXTAREA'
    || target.isContentEditable
  )
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    open.value = false
    return
  }
  if (event.key === '?' && !isTypingTarget(event.target)) {
    event.preventDefault()
    open.value = !open.value
  }
}

onMounted(() => window.addEventListener('keydown', onKeydown))
onUnmounted(() => window.removeEventListener('keydown', onKeydown))
</script>

<template>
  <div
    v-if="open"
    class="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm"
    @click.self="open = false"
  >
    <div class="flex w-full max-w-sm flex-col gap-4 rounded-2xl border border-panel-foreground/10 bg-panel-2 p-6 font-mono text-panel-foreground shadow-2xl">
      <div class="flex items-center justify-between">
        <h2 class="text-sm font-bold">
          {{ t('shortcuts.title') }}
        </h2>
        <button
          type="button"
          :aria-label="t('shortcuts.close')"
          class="flex size-7 items-center justify-center rounded-full text-panel-foreground/60 transition-colors hover:text-mint"
          @click="open = false"
        >
          <UiAppIcon icon="lucide:x" class="size-4" />
        </button>
      </div>

      <ul class="flex flex-col gap-3 text-xs">
        <li v-for="(keys, i) in SHORTCUT_KEYS" :key="i" class="flex items-center justify-between gap-3">
          <span class="text-panel-foreground/70">{{ t(`shortcuts.items.${i}`) }}</span>
          <span class="flex items-center gap-1">
            <kbd
              v-for="key in keys"
              :key="key"
              class="rounded border border-panel-foreground/20 bg-panel-foreground/5 px-1.5 py-0.5 text-[0.6875rem]"
            >{{ key }}</kbd>
          </span>
        </li>
      </ul>

      <p class="border-t border-panel-foreground/10 pt-3 text-[0.6875rem] text-panel-foreground/40">
        {{ t('shortcuts.terminalHint') }}
      </p>
    </div>
  </div>
</template>
