<script setup lang="ts">
import { CONTACT_EMAIL } from '~/constants/contact'
import { SOCIAL_LINKS } from '~/constants/social'
</script>

<template>
  <LayoutPageSection id="social-links" class="py-6 md:py-10 bg-accent">
    <div class="flex items-center justify-center gap-4 md:gap-12">
      <a
        v-for="social in SOCIAL_LINKS"
        :key="social.id"
        :href="social.href"
        target="_blank"
        rel="noopener noreferrer"
        :aria-label="social.label"
        class="text-white transition-colors hover:text-subtle"
      >
        <UiAppIcon :icon="social.icon" class="size-8 md:size-14" />
      </a>
      <a
        :href="`mailto:${CONTACT_EMAIL}`"
        aria-label="Email"
        class="text-white transition-colors hover:text-subtle"
      >
        <UiAppIcon icon="lucide:mail" class="size-8 md:size-14" />
      </a>
    </div>
  </LayoutPageSection>
</template>
