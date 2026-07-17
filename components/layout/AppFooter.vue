<script setup lang="ts">
import { CONTACT_EMAIL } from '~/constants/contact'
import { NAV_ITEMS } from '~/constants/nav'
import { SOCIAL_LINKS } from '~/constants/social'

const year = new Date().getFullYear()
</script>

<template>
  <footer class="border-t border-border px-8 py-6">
    <div
      class="mx-auto flex max-w-[1180px] flex-col items-center gap-3 font-mono text-[0.75rem] text-subtle sm:flex-row sm:justify-between sm:gap-4"
    >
      <span>© {{ year }} Maxime Jolivet</span>
      <span>{{ $t('footer.tagline') }}</span>
      <div class="flex items-center gap-4">
        <NavigationNavLink
          v-for="item in NAV_ITEMS"
          :key="item.id"
          :to="item.to"
          :hash="item.hash"
        >
          {{ $t(item.labelKey) }}
        </NavigationNavLink>
        <a
          v-for="social in SOCIAL_LINKS"
          :key="social.id"
          :href="social.href"
          target="_blank"
          rel="noopener noreferrer"
          :aria-label="social.label"
          class="text-subtle transition-colors hover:text-accent"
        >
          <UiAppIcon :icon="social.icon" class="size-3.5" />
        </a>
        <a
          :href="`mailto:${CONTACT_EMAIL}`"
          aria-label="Email"
          class="text-subtle transition-colors hover:text-accent"
        >
          <UiAppIcon icon="lucide:mail" class="size-3.5" />
        </a>
        <NavigationThemeToggle />
      </div>
    </div>
  </footer>
</template>
