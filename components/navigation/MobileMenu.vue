<script setup lang="ts">
import { NAV_ITEMS } from '~/constants/nav'

const localePath = useLocalePath()
const route = useRoute()

const isOpen = ref(false)

function close() {
  isOpen.value = false
}

function isActive(item: (typeof NAV_ITEMS)[number]) {
  return !item.hash && route.path === localePath(item.to)
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
        class="absolute right-0 top-[calc(100%+25px)] z-50 flex w-56 flex-col gap-1 rounded-2xl border border-border bg-background p-2 shadow-lg"
      >
        <NuxtLink
          v-for="item in NAV_ITEMS"
          :key="item.id"
          :to="item.hash ? { path: localePath(item.to), hash: item.hash } : localePath(item.to)"
          class="flex items-center gap-2.5 rounded-full px-3.5 py-2 font-mono text-xs font-semibold transition-colors"
          :class="
            isActive(item)
              ? 'bg-primary text-primary-foreground'
              : 'text-muted-foreground hover:bg-accent/10 hover:text-accent'
          "
          @click="close"
        >
          <UiAppIcon v-if="item.icon" :icon="item.icon" class="size-3.5" />
          {{ $t(item.labelKey) }}
        </NuxtLink>

        <div class="my-1 border-t border-border" />

        <NavigationLocaleSwitcher class="self-start" />
      </div>
    </Transition>
  </div>
</template>
