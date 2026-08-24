<script setup lang="ts">
export interface JsonToken {
  text: string
  class?: string
  href?: string
}

export interface JsonLine {
  tokens: JsonToken[]
  statusDot?: boolean
  cursor?: boolean
}

interface ExplorerEntry {
  depth: number
  label: string
  type: 'folder' | 'file'
  icon?: string
  active?: boolean
}

interface TerminalLine {
  text: string
  isInput?: boolean
}

const EXPLORER_TREE: ExplorerEntry[] = [
  { depth: 0, type: 'folder', label: 'portfolio' },
  { depth: 1, type: 'file', label: 'about.md', icon: 'lucide:file-text' },
  { depth: 1, type: 'file', label: 'experience.log', icon: 'lucide:file-text' },
  { depth: 1, type: 'folder', label: 'projects' },
  { depth: 2, type: 'file', label: 'index.ts', icon: 'lucide:file-code' },
  { depth: 1, type: 'file', label: 'contact.ts', icon: 'lucide:file-code' },
  { depth: 1, type: 'file', label: 'profile.json', icon: 'lucide:file-json', active: true },
]

const CHARS_PER_TICK = 2
const TICK_MS = 10

const props = defineProps<{
  lines: JsonLine[]
}>()

const { t } = useI18n()
const localePath = useLocalePath()

type Tab = 'profile.json' | 'terminal'
const activeTab = ref<Tab>('profile.json')

const TERMINAL_COMMANDS = ['help', 'whoami', 'cv', 'projects', 'contact', 'clear', 'exit'] as const

const terminalLines = ref<TerminalLine[]>([{ text: t('terminal.hint') }])
const terminalCommand = ref('')
const terminalInputRef = ref<HTMLInputElement | null>(null)
const terminalScrollRef = ref<HTMLDivElement | null>(null)

function scrollTerminalToBottom() {
  nextTick(() => {
    terminalScrollRef.value?.scrollTo({ top: terminalScrollRef.value.scrollHeight })
  })
}

function selectTab(tab: Tab) {
  activeTab.value = tab
  if (tab === 'terminal') nextTick(() => terminalInputRef.value?.focus())
}

function runTerminalCommand(raw: string) {
  const cmd = raw.trim().toLowerCase()
  terminalLines.value.push({ text: `$ ${raw}`, isInput: true })

  switch (cmd) {
    case 'help':
      terminalLines.value.push({ text: t('terminal.help') })
      break
    case 'whoami':
      terminalLines.value.push({ text: t('terminal.whoami', { role: t('hero.role') }) })
      break
    case 'cv':
      navigateTo(localePath('/cv'))
      break
    case 'projects':
      navigateTo(localePath('projects'))
      break
    case 'contact':
      navigateTo({ path: localePath('/'), hash: '#contact' })
      break
    case 'clear':
      terminalLines.value = []
      break
    case 'exit':
      selectTab('profile.json')
      break
    case '':
      break
    default:
      terminalLines.value.push({ text: t('terminal.notFound', { cmd }) })
  }

  terminalCommand.value = ''
  scrollTerminalToBottom()
}

function isIndent(token: JsonToken) {
  return !token.class && /^ +$/.test(token.text)
}

function asDots(text: string) {
  return text.replace(/ /g, '·')
}

const linesWithLength = computed(() =>
  props.lines.map((line) => ({
    ...line,
    length: line.tokens.reduce((sum, token) => sum + token.text.length, 0),
  })),
)

const totalLength = computed(() =>
  linesWithLength.value.reduce((sum, line) => sum + line.length, 0),
)

// Starts fully revealed so SSR / no-JS output shows the complete panel; onMounted
// resets it to 0 and animates back up, which happens before the first paint.
const visibleChars = ref(Infinity)

const renderLines = computed(() => {
  let consumed = 0
  return linesWithLength.value.map((line) => {
    const lineStart = consumed
    consumed += line.length
    let remaining = Math.max(0, Math.min(line.length, visibleChars.value - lineStart))
    const isStarted = remaining > 0
    const isDone = remaining >= line.length

    const tokens: JsonToken[] = []
    for (const token of line.tokens) {
      if (remaining <= 0) break
      if (token.text.length <= remaining) {
        tokens.push(token)
        remaining -= token.text.length
      }
      else {
        tokens.push({ ...token, text: token.text.slice(0, remaining) })
        remaining = 0
      }
    }

    return { ...line, tokens, isStarted, isDone }
  })
})

let rafId = 0

function animateTyping() {
  visibleChars.value = 0
  let lastTick = 0

  function step(now: number) {
    if (now - lastTick >= TICK_MS) {
      visibleChars.value = Math.min(visibleChars.value + CHARS_PER_TICK, totalLength.value)
      lastTick = now
    }
    if (visibleChars.value < totalLength.value) {
      rafId = requestAnimationFrame(step)
    }
  }

  rafId = requestAnimationFrame(step)
}

onMounted(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (!reduceMotion) animateTyping()
})

onUnmounted(() => {
  if (rafId) cancelAnimationFrame(rafId)
})
</script>

<template>
  <div class="flex h-full min-w-0 flex-col bg-panel text-panel-foreground">
    <!-- window title bar -->
    <div class="flex shrink-0 items-center gap-2 border-b border-panel-foreground/10 px-4 py-2.5">
      <span class="size-2.5 rounded-full bg-red-400/70" />
      <span class="size-2.5 rounded-full bg-yellow-400/70" />
      <span class="size-2.5 rounded-full bg-green-400/70" />
      <span class="ml-2 truncate font-mono text-xs text-panel-foreground/40">portfolio — {{ activeTab }}</span>
    </div>

    <div class="flex min-h-0 flex-1">
      <!-- activity bar -->
      <div
        class="hidden h-full w-11 shrink-0 flex-col items-center justify-between border-r border-panel-foreground/10 bg-panel-2 py-4 md:flex"
      >
        <div class="flex flex-col items-center gap-5">
          <UiAppIcon icon="lucide:files" class="size-4.5 text-panel-foreground" />
          <UiAppIcon icon="lucide:search" class="size-4.5 text-panel-foreground/35" />
          <UiAppIcon icon="lucide:git-branch" class="size-4.5 text-panel-foreground/35" />
          <UiAppIcon icon="logos:claude-icon" class="size-4.5 opacity-35 brightness-0 invert" />
          <UiAppIcon icon="logos:docker-icon" class="size-4.5 opacity-35 brightness-0 invert" />
          <UiAppIcon icon="logos:figma" class="size-4.5 opacity-35 brightness-0 invert" />
        </div>
        <div class="flex flex-col items-center gap-5">
          <UiAppIcon icon="lucide:user-round" class="size-4.5 text-panel-foreground/35" />
          <UiAppIcon icon="lucide:settings" class="size-4.5 text-panel-foreground/35" />
        </div>
      </div>

      <!-- file explorer -->
      <div
        class="hidden w-44 shrink-0 flex-col gap-0.5 overflow-y-auto border-r border-panel-foreground/10 bg-panel-2 px-2 py-4 font-mono text-xs lg:flex"
      >
        <div
          v-for="entry in EXPLORER_TREE"
          :key="entry.label"
          class="flex items-center gap-1.5 rounded px-1.5 py-1"
          :class="entry.active ? 'bg-panel-foreground/10 text-mint' : 'text-panel-foreground/50'"
          :style="{ paddingLeft: `${entry.depth * 0.875 + 0.375}rem` }"
        >
          <UiAppIcon
            :icon="entry.type === 'folder' ? 'lucide:folder' : (entry.icon ?? 'lucide:file')"
            class="size-3.5 shrink-0"
            :class="entry.type === 'folder' && 'text-panel-foreground/35'"
          />
          <span class="truncate">{{ entry.label }}</span>
        </div>
      </div>

      <!-- editor -->
      <div class="flex min-w-0 flex-1 flex-col">
        <div class="flex shrink-0 border-b border-panel-foreground/10 bg-panel-2">
          <button
            type="button"
            class="flex items-center gap-2 border-r border-t-2 border-panel-foreground/10 px-3.5 py-2 font-mono text-xs"
            :class="
              activeTab === 'profile.json'
                ? 'border-t-mint bg-panel'
                : 'text-panel-foreground/50 hover:text-panel-foreground'
            "
            @click="selectTab('profile.json')"
          >
            <UiAppIcon
              icon="lucide:file-json"
              class="size-3.5"
              :class="activeTab === 'profile.json' ? 'text-mint' : 'text-panel-foreground/35'"
            />
            profile.json
            <UiAppIcon icon="lucide:x" class="size-3 text-panel-foreground/30" />
          </button>
          <button
            type="button"
            class="flex items-center gap-2 border-r border-t-2 border-panel-foreground/10 px-3.5 py-2 font-mono text-xs"
            :class="
              activeTab === 'terminal'
                ? 'border-t-mint bg-panel'
                : 'text-panel-foreground/50 hover:text-panel-foreground'
            "
            @click="selectTab('terminal')"
          >
            <UiAppIcon
              icon="lucide:terminal"
              class="size-3.5"
              :class="activeTab === 'terminal' ? 'text-mint' : 'text-panel-foreground/35'"
            />
            terminal
          </button>
        </div>

        <div
          v-if="activeTab === 'profile.json'"
          class="min-h-0 flex-1 overflow-auto py-8 pl-4 font-mono text-[clamp(0.7812rem,1vw,0.9375rem)] leading-[2.05] md:pl-6"
        >
          <div
            v-for="(line, i) in renderLines"
            v-show="line.isStarted"
            :key="i"
            class="w-max whitespace-pre"
          >
            <span class="mr-5 inline-block w-6 text-right text-panel-foreground/25">{{
              i + 1
            }}</span>
            <template v-for="(token, ti) in line.tokens" :key="ti">
              <span v-if="isIndent(token)" class="text-panel-foreground/20">{{
                asDots(token.text)
              }}</span>
              <a
                v-else-if="token.href"
                :href="token.href"
                target="_blank"
                rel="noopener noreferrer"
                :class="token.class ?? 'text-panel-foreground/60'"
                class="underline decoration-dotted underline-offset-2 hover:text-mint"
                >{{ token.text }}</a>
              <span v-else :class="token.class ?? 'text-panel-foreground/60'">{{
                token.text
              }}</span>
            </template>
            <span v-if="!line.isDone" class="animate-blink text-panel-foreground">▎</span>
            <template v-else>
              <span
                v-if="line.statusDot"
                class="ml-2.5 inline-block size-2 animate-pulse-dot rounded-full bg-highlight align-middle"
              />
              <span v-if="line.cursor" class="animate-blink text-panel-foreground"> ▎</span>
              <span class="ml-1 text-panel-foreground/15">¬</span>
            </template>
          </div>
        </div>

        <div v-else class="flex min-h-0 flex-1 flex-col font-mono text-xs">
          <div ref="terminalScrollRef" class="flex-1 space-y-1 overflow-y-auto px-4 py-3 md:px-6">
            <div
              v-for="(line, i) in terminalLines"
              :key="i"
              :class="line.isInput ? 'text-mint' : 'text-panel-foreground/70'"
            >
              {{ line.text }}
            </div>
          </div>
          <form
            class="flex shrink-0 items-center gap-2 border-t border-panel-foreground/10 px-4 py-2.5 md:px-6"
            @submit.prevent="runTerminalCommand(terminalCommand)"
          >
            <span class="text-mint">$</span>
            <input
              ref="terminalInputRef"
              v-model="terminalCommand"
              type="text"
              autocomplete="off"
              spellcheck="false"
              :placeholder="TERMINAL_COMMANDS.join(' · ')"
              class="min-w-0 flex-1 bg-transparent text-panel-foreground caret-mint placeholder:text-panel-foreground/25 focus:outline-none"
            />
            <span class="animate-blink text-panel-foreground">▎</span>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
