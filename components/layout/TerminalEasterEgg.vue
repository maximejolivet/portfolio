<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

interface Line {
  text: string
  isInput?: boolean
}

const open = ref(false)
const command = ref('')
const lines = ref<Line[]>([{ text: t('terminal.hint') }])
const inputRef = ref<HTMLInputElement | null>(null)
const scrollRef = ref<HTMLDivElement | null>(null)

const COMMANDS = ['help', 'whoami', 'cv', 'projects', 'contact', 'clear', 'exit'] as const

function scrollToBottom() {
  nextTick(() => {
    scrollRef.value?.scrollTo({ top: scrollRef.value.scrollHeight })
  })
}

function toggle() {
  open.value = !open.value
  if (open.value) nextTick(() => inputRef.value?.focus())
}

function close() {
  open.value = false
}

function runCommand(raw: string) {
  const cmd = raw.trim().toLowerCase()
  lines.value.push({ text: `$ ${raw}`, isInput: true })

  switch (cmd) {
    case 'help':
      lines.value.push({ text: t('terminal.help') })
      break
    case 'whoami':
      lines.value.push({ text: t('terminal.whoami', { role: t('hero.role') }) })
      break
    case 'cv':
      navigateTo(localePath('/cv'))
      close()
      break
    case 'projects':
      navigateTo(localePath('projects'))
      close()
      break
    case 'contact':
      navigateTo({ path: localePath('/'), hash: '#contact' })
      close()
      break
    case 'clear':
      lines.value = []
      break
    case 'exit':
      close()
      break
    case '':
      break
    default:
      lines.value.push({ text: t('terminal.notFound', { cmd }) })
  }

  command.value = ''
  scrollToBottom()
}

function onKeydown(e: KeyboardEvent) {
  if (e.key !== '`') return
  const target = e.target as HTMLElement
  if (target && ['INPUT', 'TEXTAREA'].includes(target.tagName) && target !== inputRef.value) return
  e.preventDefault()
  toggle()
}

onMounted(() => {
  window.addEventListener('keydown', onKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <button
    type="button"
    :aria-label="t('terminal.toggle')"
    class="fixed bottom-5 right-5 z-40 flex size-11 items-center justify-center rounded-full border border-border bg-card text-muted-foreground opacity-40 transition-opacity hover:text-accent hover:opacity-100"
    @click="toggle"
  >
    <UiAppIcon icon="lucide:terminal" class="size-5" />
  </button>

  <div
    v-if="open"
    class="fixed inset-x-4 bottom-20 z-40 mx-auto flex h-80 max-w-xl flex-col overflow-hidden rounded-xl border border-panel-foreground/10 bg-panel-2 font-mono text-xs text-panel-foreground shadow-2xl sm:inset-x-auto sm:right-5"
  >
    <div class="flex shrink-0 items-center gap-2 border-b border-panel-foreground/10 px-4 py-2.5">
      <span class="size-2.5 rounded-full bg-red-400/70" />
      <span class="size-2.5 rounded-full bg-yellow-400/70" />
      <span class="size-2.5 rounded-full bg-green-400/70" />
      <span class="ml-2 truncate text-panel-foreground/40">{{ t('terminal.title') }}</span>
      <button
        type="button"
        :aria-label="t('terminal.toggle')"
        class="ml-auto text-panel-foreground/40 hover:text-panel-foreground"
        @click="close"
      >
        <UiAppIcon icon="lucide:x" class="size-3.5" />
      </button>
    </div>

    <div ref="scrollRef" class="flex-1 space-y-1 overflow-y-auto px-4 py-3">
      <div v-for="(line, i) in lines" :key="i" :class="line.isInput ? 'text-mint' : 'text-panel-foreground/70'">
        {{ line.text }}
      </div>
    </div>

    <form class="flex shrink-0 items-center gap-2 border-t border-panel-foreground/10 px-4 py-2.5" @submit.prevent="runCommand(command)">
      <span class="text-mint">$</span>
      <input
        ref="inputRef"
        v-model="command"
        type="text"
        autocomplete="off"
        spellcheck="false"
        :placeholder="COMMANDS.join(' · ')"
        class="min-w-0 flex-1 bg-transparent text-panel-foreground caret-mint placeholder:text-panel-foreground/25 focus:outline-none"
      />
      <span class="animate-blink text-panel-foreground">▎</span>
    </form>
  </div>
</template>
