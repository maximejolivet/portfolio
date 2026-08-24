<script setup lang="ts">
interface ShippedItem {
  repo: string
  message: string
  date: string
}

const props = defineProps<{
  item: 'building' | 'reading' | 'listening' | 'shipped'
  titleOverride?: string
  detailOverride?: string
  shippedItems?: ShippedItem[]
}>()

const { t } = useI18n()

const title = computed(() => props.titleOverride || t(`home.now.items.${props.item}.title`))
const detail = computed(() => props.detailOverride || t(`home.now.items.${props.item}.detail`))
</script>

<template>
  <div class="flex flex-col gap-2.5">
    <div class="font-mono text-[0.7188rem] font-bold tracking-[1.5px] text-panel-foreground/50">
      {{ $t(`home.now.items.${item}.label`) }}
    </div>

    <template v-if="item === 'shipped' && shippedItems?.length">
      <div v-for="shipped in shippedItems" :key="shipped.repo" class="flex flex-col gap-0.5">
        <div class="flex items-center gap-2 font-sans text-[1rem] leading-[1.4] font-semibold">
          <span class="size-2 shrink-0 animate-pulse-dot rounded-full bg-mint" />
          <span class="truncate">{{ shipped.repo }}</span>
        </div>
        <div class="truncate font-mono text-xs leading-[1.5] text-panel-foreground/55">
          {{ shipped.message }}
        </div>
      </div>
    </template>

    <template v-else>
      <div class="flex items-center gap-2 font-sans text-[1rem] leading-[1.4] font-semibold">
        <span v-if="item === 'shipped'" class="size-2 animate-pulse-dot rounded-full bg-mint" />
        {{ title }}
      </div>
      <div class="font-mono text-xs leading-[1.5] text-panel-foreground/55">
        {{ detail }}
      </div>
    </template>
  </div>
</template>
