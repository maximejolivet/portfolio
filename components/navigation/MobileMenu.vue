<script setup lang="ts">
import { NAV_ITEMS } from '~/constants/nav'

const isOpen = ref(false)

function close() {
  isOpen.value = false
}
</script>

<template>
  <div class="md:hidden">
    <button
      type="button"
      class="glass flex h-10 w-10 items-center justify-center rounded-full text-white"
      :aria-label="isOpen ? $t('nav.closeMenu') : $t('nav.openMenu')"
      @click="isOpen = !isOpen"
    >
      <UiAppIcon :icon="isOpen ? 'lucide:x' : 'lucide:menu'" class="h-5 w-5" />
    </button>

    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div
        v-if="isOpen"
        class="glass-strong absolute inset-x-4 top-20 z-40 flex flex-col gap-4 rounded-2xl p-6"
      >
        <NavigationNavLink :to="'/'" class="flex items-center gap-2" @click="close">
          <UiAppIcon icon="lucide:home" class="h-4 w-4" />
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
        <NavigationLocaleSwitcher class="w-fit" />
      </div>
    </Transition>
  </div>
</template>
