<script setup lang="ts">
import { SOCIAL_LINKS } from '~/constants/social'
import { CONTACT_EMAIL } from '~/constants/contact'

const year = new Date().getFullYear()
</script>

<template>
  <footer>
    <UiContainer>
      <p>{{ $t('footer.tagline') }}</p>

      <div>
        <a
          :href="`mailto:${CONTACT_EMAIL}`"
          aria-label="Email"
        >
          <UiAppIcon icon="lucide:mail" />
        </a>
        <a
          v-for="social in SOCIAL_LINKS"
          :key="social.id"
          :href="social.href"
          target="_blank"
          rel="noopener noreferrer"
          :aria-label="social.label"
        >
          <UiAppIcon :icon="social.icon" />
        </a>
      </div>

      <p>© {{ year }} Maxime Jolivet</p>
    </UiContainer>
  </footer>
</template>
