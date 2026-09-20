<script setup lang="ts">
import { EXPERIENCE_TIMELINE } from '~/constants/experience'

const { t } = useI18n()
// The latest entry is always unfolded and types itself when the section scrolls into view;
// the others start folded and type the first time they are unfolded.
const alwaysOpenId = EXPERIENCE_TIMELINE[0].id
const { isOpen, toggle } = useCollapsible([alwaysOpenId])
const { visibleChars, type, typeOnceVisible, stop } = useTypewriter()
const alreadyTyped = new Set<string>()
const rootEl = ref<HTMLElement>()

function logLines(item: (typeof EXPERIENCE_TIMELINE)[number]) {
  return [
    ...(item.descriptionKey ? [t(item.descriptionKey)] : []),
    ...(item.descriptionPointsKeys?.map((key) => t(key)) ?? []),
  ]
}

function logoMaskStyle(logo: string) {
  return {
    maskImage: `url(${logo})`,
    maskSize: 'contain',
    maskRepeat: 'no-repeat',
    maskPosition: 'left center',
    WebkitMaskImage: `url(${logo})`,
    WebkitMaskSize: 'contain',
    WebkitMaskRepeat: 'no-repeat',
    WebkitMaskPosition: 'left center',
  }
}

const entries = computed(() =>
  EXPERIENCE_TIMELINE.map((item) => {
    const texts = [
      `# ${t(item.locationKey)}`,
      ...(item.introKey ? [t(item.introKey)] : []),
      ...logLines(item),
    ]
    const [location, ...rest] = revealLines(texts, visibleChars(item.id))
    return {
      item,
      location,
      intro: item.introKey ? rest[0] : null,
      points: item.introKey ? rest.slice(1) : rest,
      totalChars: texts.join('').length,
    }
  }),
)

function onToggle(entry: (typeof entries.value)[number]) {
  if (entry.item.id === alwaysOpenId) return
  const opening = !isOpen(entry.item.id)
  toggle(entry.item.id)
  if (opening && !alreadyTyped.has(entry.item.id)) {
    alreadyTyped.add(entry.item.id)
    type(entry.item.id, entry.totalChars)
  }
}

onMounted(() => {
  if (rootEl.value) typeOnceVisible(rootEl.value, alwaysOpenId, entries.value[0].totalChars)
})

onUnmounted(stop)
</script>

<template>
  <LayoutPageSection id="experience" class="pt-24">
    <UiSectionHeading
      :title="$t('experienceSection.eyebrow')"
      icon="lucide:briefcase"
      diamond="mint"
    />

    <p
      class="-mt-6 mb-8 max-w-[560px] text-pretty font-sans text-[1rem] leading-[1.6] text-muted-foreground"
    >
      {{ $t('experienceSection.titleStart') }}
      <span class="text-primary">{{ $t('experienceSection.titleHighlight') }}</span>{{ $t('experienceSection.titleEnd') }}
    </p>

    <div class="overflow-hidden rounded-2xl bg-panel text-panel-foreground">
      <div class="flex items-center gap-2 border-b border-panel-foreground/10 px-5 py-3">
        <span class="size-2.5 rounded-full bg-red-400/70" />
        <span class="size-2.5 rounded-full bg-yellow-400/70" />
        <span class="size-2.5 rounded-full bg-green-400/70" />
        <span class="ml-2 font-mono text-xs text-panel-foreground/60">experience.log</span>
      </div>

      <div ref="rootEl" class="overflow-x-auto px-5 py-6 font-mono text-[0.8125rem] leading-[1.9]">
        <div v-for="(entry, index) in entries" :key="entry.item.id" class="group mb-5 last:mb-0">
          <div
            class="-mx-2 flex flex-wrap items-center gap-x-3 gap-y-1 rounded-md px-2 transition-colors group-hover:bg-panel-foreground/5"
            :class="index === 0 ? 'mb-1' : 'cursor-pointer'"
            @click="onToggle(entry)"
          >
            <span
              aria-hidden="true"
              class="flex shrink-0 items-center justify-center rounded-full bg-primary"
              :class="index === 0 ? 'size-10' : 'size-2.5'"
            >
              <svg
                v-if="index === 0"
                viewBox="0 0 162 162"
                fill="currentColor"
                aria-hidden="true"
                class="size-9 text-primary-foreground"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M81 2.9C37.9 2.9 2.9 37.9 2.9 81s35 78.1 78.1 78.1 78.1-35 78.1-78.1S124.1 2.9 81 2.9m24.8 117.6h-.8c-2.8 0-5.4-1.6-6.7-4.2L83 85.2c-1.2-2.5-3.8-4.2-6.7-4.2h-8.1c-2.8 0-5.4-1.6-6.7-4.2l-12-24.7c-2.4-4.9 1.2-10.7 6.7-10.7h.8c2.8 0 5.4 1.6 6.7 4.2L79 76.8c1.2 2.5 3.8 4.2 6.7 4.2h8.1c2.8 0 5.4 1.6 6.7 4.2l12.1 24.7c2.2 4.9-1.4 10.6-6.8 10.6"
                />
              </svg>
            </span>
            <span class="shrink-0 text-rose-300">{{ t(entry.item.periodKey) }}</span>
            <span class="text-panel-foreground">{{ t(entry.item.titleKey) }}</span>
            <span class="text-panel-foreground/40">@</span>
            <a
              v-if="entry.item.organizationUrl"
              :href="entry.item.organizationUrl"
              target="_blank"
              rel="noopener noreferrer"
              :aria-label="entry.item.logo ? t(entry.item.organizationKey) : undefined"
              class="inline-flex items-center gap-2 text-primary underline decoration-dotted underline-offset-2 transition-colors hover:text-mint"
              @click.stop
            >
              <span :class="entry.item.logo && 'hidden'">{{ t(entry.item.organizationKey) }}</span>
              <span
                v-if="entry.item.logo"
                aria-hidden="true"
                class="relative h-5 w-28 bg-primary"
                :style="logoMaskStyle(entry.item.logo)"
              />
            </a>
            <span v-else class="text-primary">{{ t(entry.item.organizationKey) }}</span>
            <button
              v-if="entry.item.id !== alwaysOpenId"
              type="button"
              :aria-expanded="isOpen(entry.item.id)"
              :aria-controls="`experience-${entry.item.id}`"
              :aria-label="t('experienceSection.toggleDetails', { organization: t(entry.item.organizationKey) })"
              class="ml-auto flex size-7 shrink-0 cursor-pointer items-center justify-center rounded-md text-panel-foreground/50 transition-colors hover:text-panel-foreground"
              @click.stop="onToggle(entry)"
            >
              <UiAppIcon
                icon="lucide:chevron-down"
                class="size-4 transition-transform motion-reduce:transition-none"
                :class="!isOpen(entry.item.id) && '-rotate-90'"
              />
            </button>
          </div>

          <div
            :id="`experience-${entry.item.id}`"
            class="grid transition-[grid-template-rows] duration-300 motion-reduce:transition-none"
            :class="isOpen(entry.item.id) ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'"
            :inert="!isOpen(entry.item.id)"
          >
            <div class="min-h-0 overflow-hidden">

          <p v-show="entry.location.isStarted" class="pl-2 text-panel-foreground/55">
            {{ entry.location.text
            }}<span v-if="!entry.location.isDone" class="animate-blink">▎</span>
          </p>

          <p
            v-if="entry.intro"
            v-show="entry.intro.isStarted"
            class="pl-2 text-pretty font-semibold text-panel-foreground/90"
          >
            {{ entry.intro.text }}<span v-if="!entry.intro.isDone" class="animate-blink">▎</span>
          </p>

          <p
            v-for="(line, li) in entry.points"
            v-show="line.isStarted"
            :key="li"
            class="flex gap-2 pl-2 text-pretty text-panel-foreground/70"
          >
            <span class="shrink-0 text-panel-foreground/25">{{
              li === entry.points.length - 1 ? '└─' : '├─'
            }}</span>
            <span>{{ line.text }}<span v-if="!line.isDone" class="animate-blink">▎</span></span>
          </p>
            </div>
          </div>
        </div>

        <p class="mt-1 text-panel-foreground/30">
          <span class="text-mint">$</span> <span class="animate-blink">▎</span>
        </p>
      </div>
    </div>
  </LayoutPageSection>
</template>
