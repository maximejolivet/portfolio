<script setup lang="ts">
import { NAV_ITEMS } from '~/constants/nav'

const localePath = useLocalePath()

const hidden = ref(false)
let lastScrollY = 0

function onScroll() {
  const currentY = window.scrollY
  const scrollingDown = currentY > lastScrollY
  hidden.value = !scrollingDown && currentY > 80
  lastScrollY = currentY
}

onMounted(() => {
  lastScrollY = window.scrollY
  window.addEventListener('scroll', onScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<template>
  <header
    class="sticky top-0 z-50 h-[58px] border-b border-border bg-background transition-transform duration-300 ease-out"
    :class="hidden ? '-translate-y-full' : 'translate-y-0'"
  >
    <div class="mx-auto flex h-full max-w-[1180px] items-center justify-between px-8">
      <div class="flex items-center gap-4">
        <NuxtLink
          :to="localePath('/')"
          aria-label="Maxime Jolivet"
          class="flex items-center gap-2.5"
        >
          <UiLogoMark :size="36" class="text-foreground" />
          <span class="font-sans text-sm font-bold tracking-tight text-foreground"
            >maximejolivet</span
          >
        </NuxtLink>
      </div>

      <div class="flex items-center gap-5 font-mono text-xs">
        <UiButton :to="localePath('/cv')" size="pill-sm" class="md:hidden">
          {{ $t('cv.read') }}
        </UiButton>
        <nav class="hidden items-center gap-5 md:flex">
          <NavigationNavLink
            v-for="item in NAV_ITEMS"
            :key="item.id"
            :to="item.to"
            :hash="item.hash"
            :icon="item.icon"
            :aria-label="item.iconOnly ? $t(item.labelKey) : undefined"
          >
            <template v-if="!item.iconOnly">{{ $t(item.labelKey) }}</template>
          </NavigationNavLink>
        </nav>

        <span class="hidden text-border md:inline">|</span>

        <UiButton
          :to="localePath('/cv')"
          size="pill-md"
          icon="lucide:arrow-right"
          class="hidden md:inline-flex"
        >
          {{ $t('cv.read') }}
        </UiButton>

        <NavigationLocaleSwitcher class="hidden md:flex" />

        <NavigationMobileMenu />
      </div>
    </div>
  </header>
</template>
