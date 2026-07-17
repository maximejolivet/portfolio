<script setup lang="ts">
import { NAV_ITEMS } from '~/constants/nav'

const isOpen = ref(false)

function close() {
  isOpen.value = false
}
</script>

<template>
  <div class="relative md:hidden">
    <button
      type="button"
      class="flex size-8 items-center justify-center rounded-full border border-border text-foreground"
      :aria-label="isOpen ? $t('nav.closeMenu') : $t('nav.openMenu')"
      @click="isOpen = !isOpen"
    >
      <UiAppIcon :icon="isOpen ? 'lucide:x' : 'lucide:menu'" class="size-4" />
    </button>

    <Transition
      enter-active-class="transition duration-150 ease-out"
      enter-from-class="opacity-0 -translate-y-1"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-100 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-1"
    >
      <div
        v-if="isOpen"
        class="absolute right-0 top-[calc(100%+10px)] z-50 flex w-48 flex-col gap-4 rounded-2xl border border-border bg-background p-5 shadow-lg"
      >
        <NavigationNavLink
          v-for="item in NAV_ITEMS"
          :key="item.id"
          :to="item.to"
          :hash="item.hash"
          @click="close"
        >
          {{ $t(item.labelKey) }}
        </NavigationNavLink>
        <NavigationLocaleSwitcher class="self-start" />
      </div>
    </Transition>
  </div>
</template>
