<script setup lang="ts">
import { CONTACT_EMAIL } from '~/constants/contact'
import { NAV_ITEMS } from '~/constants/nav'
import { SOCIAL_LINKS } from '~/constants/social'

const localePath = useLocalePath()
</script>

<template>
  <footer class="border-t border-border px-8 py-6">
    <div
      class="mx-auto flex max-w-[1180px] flex-col items-center gap-3 font-mono text-[0.75rem] text-subtle sm:flex-row sm:justify-between sm:gap-4"
    >
      <NuxtLink :to="localePath('mentions-legales')" class="transition-colors hover:text-accent">
        {{ $t('footer.legalMentions') }}
      </NuxtLink>
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
        <NavigationThemeToggle />
      </div>
    </div>
  </footer>
</template>
