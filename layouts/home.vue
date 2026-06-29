<script lang="ts" setup></script>

<template>
  <div class="flex min-h-screen flex-col bg-ink-950">
    <a
      href="#main-content"
      class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[60]
        focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold
        focus:text-ink-950"
    >
      {{ $t('a11y.skipToContent') }}
    </a>
    <LayoutAppHeader />
    <main id="main-content" class="flex-1">
      <slot />
    </main>
    <LayoutAppFooter />
  </div>
</template>
