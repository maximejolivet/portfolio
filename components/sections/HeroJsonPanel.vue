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
  <div
    class="flex min-w-0 flex-col justify-center overflow-hidden bg-panel pl-4 pr-0 py-14 font-mono text-[clamp(0.7812rem,1vw,0.9375rem)] leading-[2.05] text-panel-foreground md:pl-12"
  >
    <div class="overflow-x-auto">
      <div
        v-for="(line, i) in renderLines"
        v-show="line.isStarted"
        :key="i"
        class="w-max whitespace-pre"
      >
        <span class="mr-5 inline-block w-6 text-right text-panel-foreground/25">{{ i + 1 }}</span>
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
          <span v-else :class="token.class ?? 'text-panel-foreground/60'">{{ token.text }}</span>
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
</template>
