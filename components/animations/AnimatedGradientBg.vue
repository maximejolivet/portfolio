<script setup lang="ts"></script>

<template>
  <div class="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
    <div class="bg-gradient-aurora animate-gradient-pan absolute inset-0 opacity-80" />
    <div
      class="animate-float-slow absolute top-1/4 -left-32 h-72 w-72 rounded-full bg-gold-500/20
        blur-3xl"
    />
    <div
      class="animate-float-slow absolute right-[-6rem] bottom-0 h-80 w-80 rounded-full
        bg-gold-600/15 blur-3xl"
      style="animation-delay: -3s"
    />
  </div>
</template>
