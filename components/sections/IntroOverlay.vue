<script setup lang="ts">
const SESSION_KEY = 'mj_intro_shown'

const pct = ref(0)
const fading = ref(false)
const visible = ref(false)

let interval: ReturnType<typeof setInterval> | undefined

function finish() {
  if (fading.value) return
  if (interval) clearInterval(interval)
  pct.value = 100
  fading.value = true
  setTimeout(() => {
    visible.value = false
  }, 480)
}

function onKey(e: KeyboardEvent) {
  if (e.code === 'Space' || e.code === 'Escape') {
    e.preventDefault()
    finish()
  }
}

onMounted(() => {
  let alreadyShown = false
  try {
    alreadyShown = sessionStorage.getItem(SESSION_KEY) === '1'
  }
  catch {
    alreadyShown = false
  }

  if (alreadyShown) return

  visible.value = true
  try {
    sessionStorage.setItem(SESSION_KEY, '1')
  }
  catch {
    // ignore storage errors (private browsing)
  }

  interval = setInterval(() => {
    pct.value = Math.min(100, pct.value + 2)
    if (pct.value >= 100) {
      if (interval) clearInterval(interval)
      setTimeout(finish, 350)
    }
  }, 26)

  window.addEventListener('keydown', onKey)
})

onUnmounted(() => {
  if (interval) clearInterval(interval)
  window.removeEventListener('keydown', onKey)
})
</script>

<template>
  <div
    v-if="visible"
    class="fixed inset-0 z-[1000] flex cursor-pointer flex-col items-center justify-center bg-panel transition-opacity duration-[450ms] ease-out"
    :class="fading ? 'opacity-0' : 'opacity-100'"
    @click="finish"
  >
    <div class="absolute left-8 top-7 flex items-center gap-2.5">
      <UiLogoMark :size="30" class="text-panel-foreground" />
      <span class="font-mono text-[0.75rem] font-medium text-panel-foreground/60">maximejolivet.fr</span>
    </div>

    <div
      class="text-center font-sans text-[clamp(3.375rem,9.2vw,8rem)] font-bold uppercase leading-[0.98] tracking-[-3px] text-panel-foreground"
    >
      {{ $t('intro.title') }}<br>
      <span class="text-mint">{{ $t('intro.subtitle') }}</span>
    </div>

    <div class="absolute bottom-8 left-8 font-mono text-[0.875rem] font-semibold text-primary">
      {{ pct }}%<span class="animate-blink text-panel-foreground"> ▎</span>
    </div>
    <div class="absolute bottom-8 font-mono text-[0.7188rem] font-medium tracking-[2px] text-panel-foreground/45">
      {{ $t('intro.skipHint') }}
    </div>
  </div>
</template>
