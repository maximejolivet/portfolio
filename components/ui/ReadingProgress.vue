<script setup lang="ts">
const progress = ref(0)
let reduceMotion = false

function updateProgress() {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight
  progress.value = scrollable > 0 ? Math.min(100, Math.max(0, (window.scrollY / scrollable) * 100)) : 0
}

onMounted(() => {
  reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  updateProgress()
  window.addEventListener('scroll', updateProgress, { passive: true })
  window.addEventListener('resize', updateProgress)
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateProgress)
  window.removeEventListener('resize', updateProgress)
})
</script>

<template>
  <div class="fixed inset-x-0 top-0 z-50 h-[3px] bg-transparent">
    <div
      class="h-full bg-accent"
      :class="{ 'transition-[width] duration-150 ease-out': !reduceMotion }"
      :style="{ width: `${progress}%` }"
    />
  </div>
</template>
