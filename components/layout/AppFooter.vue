<script setup lang="ts">
import { SOCIAL_LINKS } from '~/constants/social'
import { CONTACT_EMAIL } from '~/constants/contact'

const year = new Date().getFullYear()
</script>

<template>
  <footer class="relative border-t border-white/10 py-12">
    <UiContainer
      class="flex flex-col items-center gap-6 text-center sm:flex-row sm:justify-between
        sm:text-left"
    >
      <p class="text-sm text-fg-muted">{{ $t('footer.tagline') }}</p>

      <div class="flex items-center gap-4">
        <a
          :href="`mailto:${CONTACT_EMAIL}`"
          aria-label="Email"
          class="flex h-10 w-10 items-center justify-center rounded-full border border-white/15
            text-fg-muted transition hover:border-white/30 hover:text-fg"
        >
          <UiAppIcon icon="lucide:mail" class="h-4 w-4" />
        </a>
        <a
          v-for="social in SOCIAL_LINKS"
          :key="social.id"
          :href="social.href"
          target="_blank"
          rel="noopener noreferrer"
          :aria-label="social.label"
          class="flex h-10 w-10 items-center justify-center rounded-full border border-white/15
            text-fg-muted transition hover:border-white/30 hover:text-fg"
        >
          <UiAppIcon :icon="social.icon" class="h-4 w-4" />
        </a>
      </div>

      <p class="text-sm text-fg-muted">© {{ year }} Maxime Jolivet</p>
    </UiContainer>
  </footer>
</template>
