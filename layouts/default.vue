<script lang="ts" setup></script>

<template>
  <div>
    <a
      href="#main-content"
    >
      {{ $t('a11y.skipToContent') }}
    </a>
    <LayoutAppHeader />
    <main id="main-content">
      <slot />
    </main>
    <LayoutAppFooter />
  </div>
</template>
