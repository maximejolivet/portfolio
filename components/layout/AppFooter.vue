<script setup lang="ts">
import { NAV_ITEMS } from '~/constants/nav'

const localePath = useLocalePath()

function openCookieSettings() {
  window.tarteaucitron?.userInterface?.openPanel()
}
</script>

<template>
  <footer class="px-8 py-6">
    <div
      class="mx-auto flex max-w-[1180px] flex-col items-center gap-3 font-sans text-[0.75rem] text-subtle sm:flex-row sm:justify-between sm:gap-4"
    >
      <div class="flex items-center gap-4">
        <NuxtLink :to="localePath('mentions-legales')" class="transition-colors hover:text-accent">
          {{ $t('footer.legalMentions') }}
        </NuxtLink>
        <button
          type="button"
          class="cursor-pointer transition-colors hover:text-accent"
          @click="openCookieSettings"
        >
          {{ $t('footer.manageCookies') }}
        </button>
      </div>
      <span class="text-center">{{ $t('footer.tagline') }}</span>
      <NavigationThemeToggle />
      <div class="flex items-center gap-4">
        <NavigationNavLink v-for="item in NAV_ITEMS" :key="item.id" :to="item.to" :hash="item.hash">
          {{ $t(item.labelKey) }}
        </NavigationNavLink>
      </div>
    </div>
  </footer>
</template>
