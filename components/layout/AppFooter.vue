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
      <div class="flex flex-col items-center gap-1">
        <span class="sr-only">{{ $t('footer.taglineRole') }} {{ $t('footer.taglineDetails') }}</span>
        <div class="flex items-center gap-2">
          <span
            class="flex flex-wrap items-center justify-center gap-x-1.5 gap-y-1 rounded-2xl border border-border bg-white px-3 py-2 text-center font-mono text-[0.6875rem] font-semibold text-primary-foreground sm:h-9 sm:flex-nowrap sm:gap-2 sm:rounded-full sm:px-3.5 sm:py-0 sm:text-xs sm:whitespace-nowrap"
          >
            {{ $t('footer.madeInPrefix') }}
            <img
              src="/flag-bretagne.svg"
              :alt="$t('footer.madeInPlace')"
              :title="$t('footer.madeInPlace')"
              class="h-5 w-auto"
            />
            {{ $t('footer.madeInSuffix') }}
            <span class="text-base" aria-hidden="true">🥐</span>
          </span>
          <NavigationThemeToggle />
        </div>
      </div>
      <div class="flex items-center gap-4">
        <NavigationNavLink v-for="item in NAV_ITEMS" :key="item.id" :to="item.to" :hash="item.hash">
          {{ $t(item.labelKey) }}
        </NavigationNavLink>
      </div>
    </div>
  </footer>
</template>
