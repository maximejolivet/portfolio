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

defineProps<{
  lines: JsonLine[]
}>()

function isIndent(token: JsonToken) {
  return !token.class && /^ +$/.test(token.text)
}

function asDots(text: string) {
  return text.replace(/ /g, '·')
}
</script>

<template>
  <div
    class="flex min-w-0 flex-col justify-center overflow-hidden bg-panel pl-4 pr-0 px-4 py-14 font-mono text-[clamp(0.7812rem,1vw,0.9375rem)] leading-[2.05] text-panel-foreground sm:px-12"
  >
    <div class="overflow-x-auto">
      <div v-for="(line, i) in lines" :key="i" class="w-max whitespace-pre">
        <span class="mr-5 inline-block w-6 text-right text-panel-foreground/25">{{ i + 1 }}</span>
        <template v-for="(token, ti) in line.tokens" :key="ti">
          <span v-if="isIndent(token)" class="text-panel-foreground/20">{{ asDots(token.text) }}</span>
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
        <span
          v-if="line.statusDot"
          class="ml-2.5 inline-block size-2 animate-pulse-dot rounded-full bg-accent align-middle"
        />
        <span v-if="line.cursor" class="animate-blink text-panel-foreground"> ▎</span>
        <span class="ml-1 text-panel-foreground/15">¬</span>
      </div>
    </div>
  </div>
</template>
