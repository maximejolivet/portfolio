<script setup lang="ts">
import { NAV_ITEMS } from '~/constants/nav'

const isOpen = ref(false)

function close() {
  isOpen.value = false
}
</script>

<template>
  <div>
    <button
      type="button"
      :aria-label="isOpen ? $t('nav.closeMenu') : $t('nav.openMenu')"
      @click="isOpen = !isOpen"
    >
      <UiAppIcon :icon="isOpen ? 'lucide:x' : 'lucide:menu'" />
    </button>

    <Transition>
      <div
        v-if="isOpen"
      >
        <NavigationNavLink :to="'/'" @click="close">
          <UiAppIcon icon="lucide:home" />
          {{ $t('nav.home') }}
        </NavigationNavLink>
        <NavigationNavLink
          v-for="item in NAV_ITEMS"
          :key="item.id"
          :to="item.to"
          @click="close"
        >
          {{ $t(item.labelKey) }}
        </NavigationNavLink>
        <NavigationLocaleSwitcher />
      </div>
    </Transition>
  </div>
</template>
