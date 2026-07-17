<script setup lang="ts">
import { cn } from '~/lib/utils'

const props = withDefaults(
  defineProps<{
    id?: string
    bare?: boolean
    class?: string
    containerClass?: string
  }>(),
  { bare: false },
)
</script>

<template>
  <section :id="id" :class="cn('scroll-mt-[58px]', props.class)">
    <UiContainer v-if="!bare" :class="containerClass">
      <slot />
    </UiContainer>
    <slot v-else />
  </section>
</template>
