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
      <p class="text-sm text-white/50">{{ $t('footer.tagline') }}</p>

      <div class="flex items-center gap-4">
        <a
          :href="`mailto:${CONTACT_EMAIL}`"
          aria-label="Email"
          class="glass flex h-10 w-10 items-center justify-center rounded-full text-white/70
            transition hover:text-white"
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
          class="glass flex h-10 w-10 items-center justify-center rounded-full text-white/70
            transition hover:text-white"
        >
          <UiAppIcon :icon="social.icon" class="h-4 w-4" />
        </a>
      </div>

      <p class="text-sm text-white/40">© {{ year }} Maxime Jolivet</p>
    </UiContainer>
  </footer>
</template>
