<script setup lang="ts">
import { CONTACT_EMAIL } from '~/constants/contact'
import { SOCIAL_LINKS } from '~/constants/social'
</script>

<template>
  <LayoutPageSection id="social-links" class="py-6 md:py-10 bg-accent">
    <div class="flex items-center justify-center gap-4 md:gap-12">
      <div v-for="social in SOCIAL_LINKS" :key="social.id" class="group relative flex items-center">
        <span
          class="pointer-events-none absolute bottom-full left-1/2 mb-1 -translate-x-1/2 whitespace-nowrap rounded-full bg-foreground px-3 py-1.5 font-sans text-xs font-semibold text-background opacity-0 transition-opacity duration-200 group-hover:opacity-100"
        >
          {{ $t(`social.${social.id}`) }}
        </span>
        <a
          :href="social.href"
          target="_blank"
          rel="noopener noreferrer"
          :aria-label="$t(`social.${social.id}`)"
          class="text-white transition-colors hover:text-subtle"
        >
          <UiAppIcon :icon="social.icon" class="size-8 md:size-14" />
        </a>
      </div>
      <div class="group relative flex items-center">
        <span
          class="pointer-events-none absolute bottom-full left-1/2 mb-1 -translate-x-1/2 whitespace-nowrap rounded-full bg-foreground px-3 py-1.5 font-sans text-xs font-semibold text-background opacity-0 transition-opacity duration-200 group-hover:opacity-100"
        >
          {{ $t('social.email') }}
        </span>
        <a
          :href="`mailto:${CONTACT_EMAIL}`"
          :aria-label="$t('social.email')"
          class="text-white transition-colors hover:text-subtle"
        >
          <UiAppIcon icon="lucide:mail" class="size-8 md:size-14" />
        </a>
      </div>
    </div>
  </LayoutPageSection>
</template>
