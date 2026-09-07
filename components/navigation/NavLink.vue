<script setup lang="ts">
import { NuxtLink } from '#components'

const props = defineProps<{
  to?: string
  href?: string
  hash?: string
  icon?: string
  large?: boolean
  iconOnly?: boolean
  openChat?: boolean
  sparkle?: boolean
}>()

const STAR_CLIP
  = 'polygon(50% 0%, 61% 35%, 100% 50%, 61% 65%, 50% 100%, 39% 65%, 0% 50%, 39% 35%)'

const localePath = useLocalePath()
const route = useRoute()
const { openChat: triggerOpenChat } = useChatIntro()

const target = computed(() => (props.to ? localePath(props.to) : undefined))
const resolvedTo = computed(() =>
  props.hash && target.value ? { path: target.value, hash: props.hash } : target.value,
)
const isActive = computed(() => !!target.value && !props.hash && route.path === target.value)

function onClick(event: MouseEvent) {
  if (props.openChat) {
    event.preventDefault()
    triggerOpenChat()
  }
}
</script>

<template>
  <component
    :is="href ? 'a' : NuxtLink"
    :to="href ? undefined : resolvedTo"
    :href="href"
    :target="href ? '_blank' : undefined"
    :rel="href ? 'noopener noreferrer' : undefined"
    class="relative inline-flex items-center gap-1.5 pb-0.5 font-sans transition-colors"
    :class="[
      large ? 'text-sm' : 'text-xs',
      isActive ? 'font-bold text-accent' : 'text-muted-foreground hover:text-accent',
      !iconOnly && [
        'after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:origin-left',
        'after:bg-mint after:transition-transform after:content-[\'\'] hover:after:scale-x-100',
        isActive ? 'after:scale-x-100' : 'after:scale-x-0',
      ],
    ]"
    @click="onClick"
  >
    <span v-if="icon" class="relative inline-flex items-center justify-center">
      <template v-if="sparkle">
        <span
          aria-hidden="true"
          class="absolute -left-1 -top-1 size-1.5 animate-pulse-dot bg-mint"
          :style="{ clipPath: STAR_CLIP, animationDelay: '0.3s' }"
        />
        <span
          aria-hidden="true"
          class="absolute -right-1.5 -bottom-0.5 size-1 animate-pulse-dot bg-accent"
          :style="{ clipPath: STAR_CLIP, animationDelay: '0.9s' }"
        />
      </template>
      <UiAppIcon
        :icon="icon"
        :class="[large ? 'relative size-6 top-[1px]' : 'size-6', sparkle && 'animate-pulse-dot']"
      />
    </span>
    <slot />
  </component>
</template>
