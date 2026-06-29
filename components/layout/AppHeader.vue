<script setup lang="ts">
import { useWindowScroll } from '@vueuse/core'
import { NAV_ITEMS } from '~/constants/nav'

const localePath = useLocalePath()
const { y } = useWindowScroll()

const isScrolled = computed(() => y.value > 24)
</script>

<template>
  <header
    class="fixed inset-x-0 top-0 z-50 transition-all duration-300"
    :class="isScrolled ? 'glass-strong py-3' : 'bg-transparent py-5'"
  >
    <UiContainer class="flex items-center justify-between">
      <div class="flex items-center gap-8">
        <NuxtLink :to="localePath('/')" aria-label="Maxime Jolivet">
          <img src="/maxime.svg" alt="" class="h-8 w-8" />
        </NuxtLink>

        <nav class="hidden items-center gap-8 md:flex">
          <NavigationNavLink :to="'/'" :aria-label="$t('nav.home')">
            <UiAppIcon icon="lucide:home" class="h-4 w-4" />
          </NavigationNavLink>
          <NavigationNavLink v-for="item in NAV_ITEMS" :key="item.id" :to="item.to">
            {{ $t(item.labelKey) }}
          </NavigationNavLink>
        </nav>
      </div>

      <div class="flex items-center gap-3">
        <NavigationLocaleSwitcher class="hidden sm:flex" />
        <UiButton :to="localePath('/cv')" variant="secondary" class="hidden sm:inline-flex">
          {{ $t('cv.read') }}
        </UiButton>
        <NavigationMobileMenu />
      </div>
    </UiContainer>
  </header>
</template>
