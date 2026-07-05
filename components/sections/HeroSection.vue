<script setup lang="ts">
import { CONTACT_EMAIL } from '~/constants/contact'

const localePath = useLocalePath()
</script>

<template>
  <section class="relative flex min-h-screen items-center pt-32 pb-20">
    <UiContainer>
      <p class="font-mono text-sm tracking-wide text-fg-muted uppercase">
        {{ $t('hero.location') }}
      </p>

      <h1 class="mt-4 text-4xl font-extrabold tracking-tight text-fg sm:text-6xl">
        Maxime Jolivet
      </h1>
      <p class="mt-2 text-xl text-fg-muted sm:text-2xl">
        {{ $t('hero.role') }} <span class="text-fg-muted">·</span> Gingerminds
      </p>

      <p class="mt-6 max-w-xl text-base text-fg-muted sm:text-lg">
        {{ $t('hero.bio') }}
      </p>
      <p class="mt-4 max-w-xl text-sm text-fg-muted">
        {{ $t('hero.subtitle') }}
      </p>

      <div class="mt-10 flex flex-wrap items-center gap-4">
        <UiButton :to="localePath('projects')" variant="primary">
          {{ $t('hero.ctaSecondary') }}
          <UiAppIcon icon="lucide:arrow-right" class="h-4 w-4" />
        </UiButton>
        <a
          :href="`mailto:${CONTACT_EMAIL}`"
          class="text-sm font-medium text-fg-muted underline decoration-white/20
            underline-offset-4 transition hover:text-fg hover:decoration-accent"
        >
          {{ CONTACT_EMAIL }}
        </a>
      </div>
    </UiContainer>

    <a
      href="#about"
      class="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2
        text-xs text-fg-muted transition hover:text-fg sm:flex"
    >
      {{ $t('hero.scrollHint') }}
      <UiAppIcon icon="lucide:chevron-down" class="h-4 w-4" />
    </a>
  </section>
</template>
