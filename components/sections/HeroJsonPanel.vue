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
      <span class="ml-2 truncate font-mono text-xs text-panel-foreground/40">portfolio — profile.json</span>
    </div>

    <div class="flex min-h-0 flex-1">
      <!-- activity bar -->
      <div
        class="hidden w-11 shrink-0 flex-col items-center gap-5 border-r border-panel-foreground/10 bg-panel-2 py-4 md:flex"
      >
        <UiAppIcon icon="lucide:files" class="size-4.5 text-panel-foreground" />
        <UiAppIcon icon="lucide:search" class="size-4.5 text-panel-foreground/35" />
        <UiAppIcon icon="lucide:git-branch" class="size-4.5 text-panel-foreground/35" />
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
          <div
            class="flex items-center gap-2 border-r border-t-2 border-panel-foreground/10 border-t-mint bg-panel px-3.5 py-2 font-mono text-xs"
          >
            <UiAppIcon icon="lucide:file-json" class="size-3.5 text-mint" />
            profile.json
            <UiAppIcon icon="lucide:x" class="size-3 text-panel-foreground/30" />
          </div>
        </div>

        <div
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
                class="ml-2.5 inline-block size-2 animate-pulse-dot rounded-full bg-red-500 align-middle"
              />
              <span v-if="line.cursor" class="animate-blink text-panel-foreground"> ▎</span>
              <span class="ml-1 text-panel-foreground/15">¬</span>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
