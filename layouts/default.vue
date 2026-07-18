<script lang="ts" setup></script>

<template>
  <div>
    <a
      href="#main-content"
      class="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[100] focus:rounded-full focus:bg-background focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:font-semibold focus:text-foreground focus:outline focus:outline-2 focus:outline-accent"
    >
      {{ $t('a11y.skipToContent') }}
    </a>
    <LayoutAppHeader />
    <main id="main-content">
      <slot />
    </main>
    <LayoutAppFooter />
    <LayoutFloatingActions />
  </div>
</template>
