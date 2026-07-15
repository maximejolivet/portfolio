<script setup lang="ts">
import { NAV_ITEMS } from '~/constants/nav'

const localePath = useLocalePath()
</script>

<template>
  <header>
    <UiContainer>
      <div>
        <NuxtLink :to="localePath('/')" aria-label="Maxime Jolivet">
          <img src="/maxime.svg" alt="" />
        </NuxtLink>

        <nav>
          <NavigationNavLink :to="'/'" :aria-label="$t('nav.home')">
            <UiAppIcon icon="lucide:home" />
          </NavigationNavLink>
          <NavigationNavLink v-for="item in NAV_ITEMS" :key="item.id" :to="item.to">
            {{ $t(item.labelKey) }}
          </NavigationNavLink>
        </nav>
      </div>

      <div>
        <NavigationLocaleSwitcher />
        <UiButton :to="localePath('/cv')">
          {{ $t('cv.read') }}
        </UiButton>
        <NavigationMobileMenu />
      </div>
    </UiContainer>
  </header>
</template>
