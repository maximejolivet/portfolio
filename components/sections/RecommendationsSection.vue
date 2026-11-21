<script setup lang="ts">
const items = [
  { key: 'thibaut', linkedin: 'https://www.linkedin.com/in/thibautmonier' },
  { key: 'lucie', linkedin: 'https://www.linkedin.com/in/lucie-magadur' },
] as const
</script>

<template>
  <LayoutPageSection id="recommendations" class="pt-24">
    <UiSectionHeading
      :title="$t('recommendationsSection.eyebrow')"
      icon="lucide:quote"
      diamond="mint"
    />

    <div class="grid gap-6 md:grid-cols-2">
      <figure
        v-for="item in items"
        :key="item.key"
        class="flex flex-col gap-5 rounded-2xl border border-border bg-card p-6"
      >
        <blockquote
          class="text-pretty font-sans text-[0.95rem] leading-[1.7] text-muted-foreground"
        >
          {{ $t(`recommendationsSection.items.${item.key}.quote`) }}
        </blockquote>
        <figcaption class="mt-auto flex flex-col gap-1 font-sans">
          <span class="font-bold text-foreground">{{
            $t(`recommendationsSection.items.${item.key}.name`)
          }}</span>
          <span class="text-sm text-muted-foreground">{{
            $t(`recommendationsSection.items.${item.key}.role`)
          }}</span>
          <a
            :href="item.linkedin"
            target="_blank"
            rel="noopener noreferrer"
            class="mt-1 w-fit text-sm text-primary underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            LinkedIn {{ $t('a11y.newWindow') }}
          </a>
        </figcaption>
      </figure>
    </div>
  </LayoutPageSection>
</template>
