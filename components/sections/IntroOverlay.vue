<script setup lang="ts">
const SESSION_KEY = 'mj_intro_shown'

const pct = ref(0)
const fading = ref(false)
const visible = ref(false)
const detailsVisible = ref(false)

let interval: ReturnType<typeof setInterval> | undefined

function finish() {
  if (fading.value) return
  if (interval) clearInterval(interval)
  pct.value = 100
  fading.value = true
  setTimeout(() => {
    visible.value = false
  }, 500)
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

  setTimeout(() => {
    detailsVisible.value = true
  }, 350)

  interval = setInterval(() => {
    pct.value = Math.min(100, pct.value + 1)
    if (pct.value >= 100) {
      if (interval) clearInterval(interval)
      setTimeout(finish, 500)
    }
  }, 190)

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
    class="fixed inset-0 z-[1000] flex cursor-pointer flex-col items-center justify-center bg-panel transition-opacity duration-[500ms] ease-out"
    :class="fading ? 'opacity-0' : 'opacity-100'"
    @click="finish"
  >
    <div
      class="absolute left-8 top-7 flex items-center gap-2.5 transition-opacity duration-500 ease-out"
      :class="detailsVisible ? 'opacity-100' : 'opacity-0'"
    >
      <UiLogoMark :size="30" class="text-panel-foreground" />
      <span class="font-mono text-[0.75rem] font-medium text-panel-foreground/60">maximejolivet.fr</span>
    </div>

    <UiLogoMark :size="140" class="animate-intro-logo-in text-panel-foreground" />

    <div
      class="absolute bottom-8 left-8 font-mono text-[0.875rem] font-semibold text-primary transition-opacity duration-500 ease-out"
      :class="detailsVisible ? 'opacity-100' : 'opacity-0'"
    >
      {{ pct }}%<span class="animate-blink text-panel-foreground"> ▎</span>
    </div>
    <div
      class="absolute bottom-8 font-mono text-[0.7188rem] font-medium tracking-[2px] text-panel-foreground/45 transition-opacity duration-500 ease-out"
      :class="detailsVisible ? 'opacity-100' : 'opacity-0'"
    >
      {{ $t('intro.skipHint') }}
    </div>
  </div>
</template>
