<script setup lang="ts">
import { NAV_ITEMS } from '~/constants/nav'

const localePath = useLocalePath()
</script>

<template>
  <header class="sticky top-0 z-50 h-[58px] border-b border-border bg-background">
    <div class="mx-auto flex h-full max-w-[1180px] items-center justify-between px-8">
      <NuxtLink :to="localePath('/')" aria-label="Maxime Jolivet" class="flex items-center gap-2.5">
        <UiLogoMark :size="36" class="text-foreground" />
        <span class="font-sans text-sm font-bold tracking-tight text-foreground">maximejolivet</span>
      </NuxtLink>

      <div class="flex items-center gap-5 font-mono text-xs">
        <nav class="hidden items-center gap-5 md:flex">
          <NavigationNavLink
            v-for="item in NAV_ITEMS"
            :key="item.id"
            :to="item.to"
            :hash="item.hash"
          >
            {{ $t(item.labelKey) }}
          </NavigationNavLink>
        </nav>

        <span class="hidden text-border md:inline">|</span>

        <UiButton :to="localePath('/cv')" size="pill-md" icon="lucide:arrow-right" class="hidden md:inline-flex">
          {{ $t('cv.read') }}
        </UiButton>

        <NavigationLocaleSwitcher class="hidden md:flex" />

        <NavigationMobileMenu />
      </div>
    </div>
  </header>
</template>
