# Editorial Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the current dark gold/emerald/glassmorphism "fake JSON code editor" portfolio theme with a dark, editorial-minimalist design system (matte black, single amber accent, Inter + mono) across Home, Projects, CV, and Blog, with GSAP/motion-v removed entirely.

**Architecture:** Tokens change first (Tailwind v4 `@theme` in `assets/css/main.css` + font `<link>` in `nuxt.config.ts`), then shared UI primitives, then layout/nav, then each content section/page is rewritten to drop the `UiCodeWindow` JSON conceit in favor of plain editorial typography, then dead components/composables/dependencies are deleted last (only once nothing references them).

**Tech Stack:** Nuxt 4 (SSR/static generate), Vue 3 `<script setup>`, Tailwind CSS v4 (`@theme`/`@utility`), `@nuxtjs/i18n`, ESLint (no semicolons, single quotes, 2-space indent, trailing commas multiline).

## Global Constraints

- No semicolons, single quotes, trailing commas in multiline, 2-space indent (from `CLAUDE.md` / `eslint.config.mjs`).
- Reuse existing i18n keys in `i18n/locales/en.json` / `i18n/locales/fr.json` as-is — no key renames, no new keys added.
- No new page routes, no routing changes.
- Dark mode only, no light mode, no theme toggle.
- Design tokens (from the approved spec `docs/superpowers/specs/2026-07-03-editorial-redesign-design.md`):
  - `--color-canvas: #0a0a0a` (page background)
  - `--color-surface: #141414` (cards / raised surfaces)
  - `--color-fg: #f5f5f5` (primary text)
  - `--color-fg-muted: #a3a3a3` (secondary/meta text — single named gray, not scattered opacity values)
  - `--color-accent: #f59e0b` (links, CTAs, focus rings, active states — never decorative)
  - Borders: 1px hairline, `border-white/10` (default) / `border-white/15` or `/20` for slightly stronger emphasis on hover — no glow, no blur.
  - Fonts: `--font-sans` stays Inter; `--font-mono` becomes `'JetBrains Mono'` (replaces `Space Grotesk`, which is dropped).
- No entrance/scroll animations. Only hover/focus CSS transitions, 100–150ms, `ease-out`. All interactive elements get a visible 2px `accent` focus ring.
- `gsap` and `motion-v` must have zero remaining imports anywhere in the repo by the end of this plan, and are removed from `package.json`.

---

### Task 1: Design tokens and fonts

**Files:**
- Modify: `assets/css/main.css` (full rewrite)
- Modify: `nuxt.config.ts:20-26` (Google Fonts `<link>` href)

**Interfaces:**
- Produces: Tailwind utility classes used by every later task — `bg-canvas`, `bg-surface`, `text-fg`, `text-fg-muted`, `text-accent`, `bg-accent`, `border-accent`, `font-mono` (now JetBrains Mono), `font-sans` (Inter, unchanged).
- Removes: `bg-ink-950`, `text-gold-*`, `text-emerald-*`, `font-display`, `glass`, `glass-strong`, `text-gradient`, `bg-gradient-aurora`, `glow-gold`, `glow-emerald`, `animate-gradient-pan`, `animate-float-slow` — none of these utility names may appear anywhere after Task 12.

- [ ] **Step 1: Rewrite `assets/css/main.css`**

Replace the entire file with:

```css
@import 'tailwindcss';

@theme {
  --font-sans: 'Inter', ui-sans-serif, system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', ui-monospace, 'SFMono-Regular', Menlo, monospace;

  --color-canvas: #0a0a0a;
  --color-surface: #141414;
  --color-fg: #f5f5f5;
  --color-fg-muted: #a3a3a3;
  --color-accent: #f59e0b;
}

html,
body,
#__nuxt {
  @apply h-full;
}

body {
  @apply bg-canvas font-sans text-fg antialiased;
}

::selection {
  @apply bg-accent/30 text-fg;
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.001ms !important;
    scroll-behavior: auto !important;
  }
}
```

- [ ] **Step 2: Update the Google Fonts link in `nuxt.config.ts`**

Find this block (around line 20):

```ts
        {
          rel: 'stylesheet',
          href:
            'https://fonts.googleapis.com/css2'
            + '?family=Inter:wght@400;500;600;700;800'
            + '&family=Space+Grotesk:wght@500;600;700&display=swap',
        },
```

Replace with:

```ts
        {
          rel: 'stylesheet',
          href:
            'https://fonts.googleapis.com/css2'
            + '?family=Inter:wght@400;500;600;700;800'
            + '&family=JetBrains+Mono:wght@400;500&display=swap',
        },
```

- [ ] **Step 3: Verify**

Run: `npm run lint`
Expected: no errors (CSS file isn't linted by ESLint, this only checks `nuxt.config.ts` didn't break style rules).

Run: `npm run dev` briefly (or `npm run generate` if you prefer a full build check), confirm no CSS parse errors in the console, then stop the dev server.

- [ ] **Step 4: Commit**

```bash
git add assets/css/main.css nuxt.config.ts
git commit -m "Replace design tokens with editorial dark theme"
```

---

### Task 2: Core UI primitives — Button, Badge, SectionHeading, ConstructionBanner

**Files:**
- Modify: `components/ui/Button.vue`
- Modify: `components/ui/Badge.vue`
- Modify: `components/ui/SectionHeading.vue`
- Modify: `components/ui/ConstructionBanner.vue`

**Interfaces:**
- Consumes: tokens from Task 1 (`bg-canvas`, `text-fg`, `text-fg-muted`, `bg-accent`, `text-accent`, `font-mono`).
- Produces: no prop/API changes to any of these four components — `UiButton :variant="'primary'|'secondary'|'ghost'"`, `UiBadge` (slot only), `UiSectionHeading :eyebrow :align="'left'|'center'"` (title/subtitle slots), `UiConstructionBanner` (no props) all keep their existing public interface, so no consumer in a later task needs changes beyond what's already planned there.

- [ ] **Step 1: Rewrite `components/ui/Button.vue`**

```vue
<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    to?: string
    href?: string
    variant?: 'primary' | 'secondary' | 'ghost'
  }>(),
  { variant: 'primary' },
)

const NuxtLinkComponent = resolveComponent('NuxtLink')

const tag = computed(() => (props.to ? NuxtLinkComponent : props.href ? 'a' : 'button'))
const isExternal = computed(() => props.href?.startsWith('http'))

const variantClasses: Record<string, string> = {
  primary: 'bg-accent text-canvas hover:bg-accent/90',
  secondary: 'border border-white/15 text-fg hover:border-white/30',
  ghost: 'text-fg-muted hover:text-fg',
}
</script>

<template>
  <component
    :is="tag"
    :to="to"
    :href="href"
    :target="isExternal ? '_blank' : undefined"
    :rel="isExternal ? 'noopener noreferrer' : undefined"
    class="inline-flex items-center justify-center gap-2 rounded-md px-6 py-3 text-sm font-medium
      transition duration-150 ease-out focus-visible:outline focus-visible:outline-2
      focus-visible:outline-offset-2 focus-visible:outline-accent"
    :class="variantClasses[variant]"
  >
    <slot />
  </component>
</template>
```

- [ ] **Step 2: Rewrite `components/ui/Badge.vue`**

```vue
<script setup lang="ts"></script>

<template>
  <span
    class="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-1.5
      font-mono text-xs font-medium tracking-wide text-fg-muted uppercase"
  >
    <slot />
  </span>
</template>
```

- [ ] **Step 3: Rewrite `components/ui/SectionHeading.vue`**

```vue
<script setup lang="ts">
withDefaults(
  defineProps<{
    eyebrow?: string
    align?: 'left' | 'center'
  }>(),
  { align: 'left' },
)
</script>

<template>
  <div :class="align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'">
    <UiBadge v-if="eyebrow">{{ eyebrow }}</UiBadge>
    <h2 class="mt-4 text-3xl font-extrabold tracking-tight text-fg sm:text-4xl">
      <slot name="title" />
    </h2>
    <p v-if="$slots.subtitle" class="mt-4 text-base text-fg-muted sm:text-lg">
      <slot name="subtitle" />
    </p>
  </div>
</template>
```

- [ ] **Step 4: Rewrite `components/ui/ConstructionBanner.vue`**

```vue
<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <div class="relative z-[70] flex items-center justify-center gap-2 bg-accent px-4 py-2
      text-center text-sm font-medium text-canvas">
    <UiAppIcon icon="lucide:construction" class="h-4 w-4 shrink-0" />
    <span>{{ t('construction.message') }}</span>
  </div>
</template>
```

- [ ] **Step 5: Verify**

Run: `npx eslint components/ui/Button.vue components/ui/Badge.vue components/ui/SectionHeading.vue components/ui/ConstructionBanner.vue`
Expected: no errors.

- [ ] **Step 6: Commit**

```bash
git add components/ui/Button.vue components/ui/Badge.vue components/ui/SectionHeading.vue components/ui/ConstructionBanner.vue
git commit -m "Restyle core UI primitives to editorial theme"
```

---

### Task 3: Layout and navigation

**Files:**
- Modify: `components/layout/AppHeader.vue`
- Modify: `components/layout/AppFooter.vue`
- Modify: `components/navigation/NavLink.vue`
- Modify: `components/navigation/MobileMenu.vue`
- Modify: `components/navigation/LocaleSwitcher.vue`
- Modify: `layouts/default.vue`

**Interfaces:**
- Consumes: `UiButton`, `UiAppIcon`, `UiContainer` (unchanged props), tokens from Task 1.
- No prop/API changes to any nav component.

- [ ] **Step 1: Rewrite `components/layout/AppHeader.vue`**

```vue
<script setup lang="ts">
import { useWindowScroll } from '@vueuse/core'
import { NAV_ITEMS } from '~/constants/nav'

const localePath = useLocalePath()
const { y } = useWindowScroll()

const isScrolled = computed(() => y.value > 24)
</script>

<template>
  <header
    class="sticky top-0 z-50 border-b transition-colors duration-150"
    :class="isScrolled ? 'border-white/10 bg-canvas py-3' : 'border-transparent bg-transparent py-5'"
  >
    <UiContainer class="flex items-center justify-between">
      <div class="flex items-center gap-8">
        <NuxtLink :to="localePath('/')" aria-label="Maxime Jolivet">
          <img src="/maxime.svg" alt="" class="h-8 w-8" />
        </NuxtLink>

        <nav class="hidden items-center gap-8 md:flex">
          <NavigationNavLink :to="'/'" :aria-label="$t('nav.home')">
            <UiAppIcon icon="lucide:home" class="h-4 w-4" />
          </NavigationNavLink>
          <NavigationNavLink v-for="item in NAV_ITEMS" :key="item.id" :to="item.to">
            {{ $t(item.labelKey) }}
          </NavigationNavLink>
        </nav>
      </div>

      <div class="flex items-center gap-3">
        <NavigationLocaleSwitcher class="hidden sm:flex" />
        <UiButton :to="localePath('/cv')" variant="secondary" class="hidden sm:inline-flex">
          {{ $t('cv.read') }}
        </UiButton>
        <NavigationMobileMenu />
      </div>
    </UiContainer>
  </header>
</template>
```

- [ ] **Step 2: Rewrite `components/layout/AppFooter.vue`**

```vue
<script setup lang="ts">
import { SOCIAL_LINKS } from '~/constants/social'
import { CONTACT_EMAIL } from '~/constants/contact'

const year = new Date().getFullYear()
</script>

<template>
  <footer class="relative border-t border-white/10 py-12">
    <UiContainer
      class="flex flex-col items-center gap-6 text-center sm:flex-row sm:justify-between
        sm:text-left"
    >
      <p class="text-sm text-fg-muted">{{ $t('footer.tagline') }}</p>

      <div class="flex items-center gap-4">
        <a
          :href="`mailto:${CONTACT_EMAIL}`"
          aria-label="Email"
          class="flex h-10 w-10 items-center justify-center rounded-full border border-white/15
            text-fg-muted transition hover:border-white/30 hover:text-fg"
        >
          <UiAppIcon icon="lucide:mail" class="h-4 w-4" />
        </a>
        <a
          v-for="social in SOCIAL_LINKS"
          :key="social.id"
          :href="social.href"
          target="_blank"
          rel="noopener noreferrer"
          :aria-label="social.label"
          class="flex h-10 w-10 items-center justify-center rounded-full border border-white/15
            text-fg-muted transition hover:border-white/30 hover:text-fg"
        >
          <UiAppIcon :icon="social.icon" class="h-4 w-4" />
        </a>
      </div>

      <p class="text-sm text-fg-muted">© {{ year }} Maxime Jolivet</p>
    </UiContainer>
  </footer>
</template>
```

- [ ] **Step 3: Rewrite `components/navigation/NavLink.vue`**

```vue
<script setup lang="ts">
defineProps<{
  to: string
}>()

const localePath = useLocalePath()
</script>

<template>
  <NuxtLink
    :to="localePath(to)"
    class="group relative text-sm font-medium text-fg-muted transition hover:text-fg"
    active-class="text-fg"
  >
    <slot />
    <span
      class="absolute -bottom-1.5 left-0 h-px w-0 bg-accent transition-all duration-150
        group-hover:w-full"
    />
  </NuxtLink>
</template>
```

- [ ] **Step 4: Rewrite `components/navigation/MobileMenu.vue`**

```vue
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
      class="flex h-10 w-10 items-center justify-center rounded-full border border-white/15
        text-fg transition hover:border-white/30"
      :aria-label="isOpen ? $t('nav.closeMenu') : $t('nav.openMenu')"
      @click="isOpen = !isOpen"
    >
      <UiAppIcon :icon="isOpen ? 'lucide:x' : 'lucide:menu'" class="h-5 w-5" />
    </button>

    <Transition
      enter-active-class="transition duration-150 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-100 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div
        v-if="isOpen"
        class="absolute inset-x-4 top-20 z-40 flex flex-col gap-4 rounded-2xl border
          border-white/10 bg-surface p-6"
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
```

- [ ] **Step 5: Rewrite `components/navigation/LocaleSwitcher.vue`**

```vue
<script setup lang="ts">
const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const availableLocales = computed(() => locales.value.map((l) => l.code))
</script>

<template>
  <div class="flex items-center gap-1 rounded-full border border-white/15 p-1 font-mono text-xs
      font-medium">
    <NuxtLink
      v-for="code in availableLocales"
      :key="code"
      :to="switchLocalePath(code)"
      class="rounded-full px-3 py-1.5 uppercase transition"
      :class="
        code === locale
          ? 'bg-accent text-canvas'
          : 'text-fg-muted hover:text-fg'
      "
    >
      {{ code }}
    </NuxtLink>
  </div>
</template>
```

- [ ] **Step 6: Update `layouts/default.vue`**

```vue
<script lang="ts" setup></script>

<template>
  <div class="flex min-h-screen flex-col bg-canvas">
    <a
      href="#main-content"
      class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[60]
        focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-semibold
        focus:text-canvas"
    >
      {{ $t('a11y.skipToContent') }}
    </a>
    <LayoutAppHeader />
    <main id="main-content" class="flex-1">
      <slot />
    </main>
    <LayoutAppFooter />
  </div>
</template>
```

- [ ] **Step 7: Verify**

Run: `npx eslint components/layout/AppHeader.vue components/layout/AppFooter.vue components/navigation/NavLink.vue components/navigation/MobileMenu.vue components/navigation/LocaleSwitcher.vue layouts/default.vue`
Expected: no errors.

- [ ] **Step 8: Commit**

```bash
git add components/layout/AppHeader.vue components/layout/AppFooter.vue components/navigation/NavLink.vue components/navigation/MobileMenu.vue components/navigation/LocaleSwitcher.vue layouts/default.vue
git commit -m "Restyle navigation and layout to editorial theme"
```

---

### Task 4: Hero section

**Files:**
- Modify: `components/sections/HeroSection.vue`

**Interfaces:**
- Consumes: `UiButton`, `UiAppIcon`, `UiContainer`, `CONTACT_EMAIL` from `~/constants/contact`, i18n keys `hero.location`, `hero.role`, `hero.bio`, `hero.subtitle`, `hero.ctaSecondary`, `hero.scrollHint`.
- Removes this component's only usages of `UiCodeWindow`, `AnimationsScrollReveal`, `AnimationsMagneticButton`, `AnimationsAnimatedGradientBg`, `useParallax` (confirmed via repo-wide search that `HeroSection.vue` is the only consumer of `AnimationsMagneticButton`, `AnimationsAnimatedGradientBg`, and `useParallax`).

- [ ] **Step 1: Rewrite `components/sections/HeroSection.vue`**

```vue
<script setup lang="ts">
import { CONTACT_EMAIL } from '~/constants/contact'

const localePath = useLocalePath()
</script>

<template>
  <section class="relative flex min-h-screen items-center pt-32 pb-20">
    <UiContainer>
      <p class="font-mono text-sm tracking-wide text-fg-muted uppercase">
        {{ $t('hero.location') }}
      </p>

      <h1 class="mt-4 text-4xl font-extrabold tracking-tight text-fg sm:text-6xl">
        Maxime Jolivet
      </h1>
      <p class="mt-2 text-xl text-fg-muted sm:text-2xl">
        {{ $t('hero.role') }} <span class="text-fg-muted">·</span> Gingerminds
      </p>

      <p class="mt-6 max-w-xl text-base text-fg-muted sm:text-lg">
        {{ $t('hero.bio') }}
      </p>
      <p class="mt-4 max-w-xl text-sm text-fg-muted">
        {{ $t('hero.subtitle') }}
      </p>

      <div class="mt-10 flex flex-wrap items-center gap-4">
        <UiButton :to="localePath('projects')" variant="primary">
          {{ $t('hero.ctaSecondary') }}
          <UiAppIcon icon="lucide:arrow-right" class="h-4 w-4" />
        </UiButton>
        <a
          :href="`mailto:${CONTACT_EMAIL}`"
          class="text-sm font-medium text-fg-muted underline decoration-white/20
            underline-offset-4 transition hover:text-fg hover:decoration-accent"
        >
          {{ CONTACT_EMAIL }}
        </a>
      </div>
    </UiContainer>

    <a
      href="#about"
      class="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2
        text-xs text-fg-muted transition hover:text-fg sm:flex"
    >
      {{ $t('hero.scrollHint') }}
      <UiAppIcon icon="lucide:chevron-down" class="h-4 w-4" />
    </a>
  </section>
</template>
```

- [ ] **Step 2: Verify**

Run: `npx eslint components/sections/HeroSection.vue`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/sections/HeroSection.vue
git commit -m "Rewrite Hero section in editorial style, drop JSON conceit"
```

---

### Task 5: About section

**Files:**
- Modify: `components/sections/AboutSection.vue`

**Interfaces:**
- Consumes: `UiSectionHeading`, `UiAppIcon`, `LayoutPageSection`, i18n keys `aboutSection.eyebrow`, `aboutSection.titleStart`, `aboutSection.titleHighlight`, `aboutSection.titleEnd`, `aboutSection.paragraph1`, `aboutSection.paragraph2`, `aboutSection.highlight1-3`, `aboutSection.imageAlt`, `aboutSection.tags.*`.

- [ ] **Step 1: Rewrite `components/sections/AboutSection.vue`**

```vue
<script setup lang="ts">
const highlightKeys = ['highlight1', 'highlight2', 'highlight3'] as const

const tagKeys = [
  'conceptionUiUx',
  'problemSolving',
  'webDev',
  'cloudDevops',
  'aiAutomation',
  'vibeCoding',
] as const
</script>

<template>
  <LayoutPageSection id="about">
    <div class="grid items-start gap-16 lg:grid-cols-[240px_1fr]">
      <div class="mx-auto w-full max-w-[240px] lg:mx-0">
        <div class="overflow-hidden rounded-2xl border border-white/10 p-2">
          <NuxtImg
            src="/maximejolivet.jpeg"
            :alt="$t('aboutSection.imageAlt')"
            width="240"
            height="240"
            loading="lazy"
            class="aspect-square w-full rounded-xl object-cover grayscale"
          />
        </div>
      </div>

      <div>
        <UiSectionHeading :eyebrow="$t('aboutSection.eyebrow')">
          <template #title>
            {{ $t('aboutSection.titleStart') }}
            <span class="text-accent">{{ $t('aboutSection.titleHighlight') }}</span>
            {{ $t('aboutSection.titleEnd') }}
          </template>
        </UiSectionHeading>

        <p class="mt-6 max-w-2xl text-base text-fg-muted sm:text-lg">
          {{ $t('aboutSection.paragraph1') }}
        </p>
        <p class="mt-4 max-w-2xl text-base text-fg-muted sm:text-lg">
          {{ $t('aboutSection.paragraph2') }}
        </p>

        <ul class="mt-6 list-none space-y-2">
          <li
            v-for="key in highlightKeys"
            :key="key"
            class="flex items-start gap-2 text-sm text-fg-muted"
          >
            <UiAppIcon icon="lucide:check" class="mt-0.5 h-4 w-4 shrink-0 text-accent" />
            {{ $t(`aboutSection.${key}`) }}
          </li>
        </ul>

        <div class="mt-6 flex flex-wrap gap-2">
          <span
            v-for="key in tagKeys"
            :key="key"
            class="rounded-full border border-white/15 px-4 py-1.5 font-mono text-xs
              text-fg-muted"
          >
            {{ $t(`aboutSection.tags.${key}`) }}
          </span>
        </div>
      </div>
    </div>
  </LayoutPageSection>
</template>
```

- [ ] **Step 2: Verify**

Run: `npx eslint components/sections/AboutSection.vue`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/sections/AboutSection.vue
git commit -m "Rewrite About section in editorial style, drop JSON conceit"
```

---

### Task 6: Experience section

**Files:**
- Modify: `components/sections/ExperienceSection.vue`

**Interfaces:**
- Consumes: `EXPERIENCE_TIMELINE` from `~/constants/experience` (unchanged shape: `{ id, periodKey, titleKey, organizationKey, locationKey, descriptionKey }[]`), `UiSectionHeading`, `LayoutPageSection`, i18n keys `experienceSection.eyebrow/titleStart/titleHighlight/titleEnd` and the per-item keys under `experienceSection.items.<id>.*`.

- [ ] **Step 1: Rewrite `components/sections/ExperienceSection.vue`**

```vue
<script setup lang="ts">
import { EXPERIENCE_TIMELINE } from '~/constants/experience'

const { t } = useI18n()
</script>

<template>
  <LayoutPageSection id="experience">
    <UiSectionHeading :eyebrow="$t('experienceSection.eyebrow')" align="center" class="mx-auto">
      <template #title>
        {{ $t('experienceSection.titleStart') }}
        <span class="text-accent">{{ $t('experienceSection.titleHighlight') }}</span>
        {{ $t('experienceSection.titleEnd') }}
      </template>
    </UiSectionHeading>

    <ol class="mx-auto mt-14 max-w-3xl space-y-10">
      <li
        v-for="item in EXPERIENCE_TIMELINE"
        :key="item.id"
        class="grid gap-2 sm:grid-cols-[140px_1fr] sm:gap-8"
      >
        <p class="font-mono text-xs tracking-wide text-fg-muted uppercase">
          {{ t(item.periodKey) }}
        </p>
        <div class="border-l border-white/10 pl-6">
          <h3 class="text-lg font-semibold text-fg">
            {{ t(item.titleKey) }}
          </h3>
          <p class="text-sm text-fg-muted">
            {{ t(item.organizationKey) }} · {{ t(item.locationKey) }}
          </p>
          <p class="mt-2 max-w-xl text-sm text-fg-muted">
            {{ t(item.descriptionKey) }}
          </p>
        </div>
      </li>
    </ol>
  </LayoutPageSection>
</template>
```

- [ ] **Step 2: Verify**

Run: `npx eslint components/sections/ExperienceSection.vue`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/sections/ExperienceSection.vue
git commit -m "Rewrite Experience section as an editorial timeline"
```

---

### Task 7: Tech Stack section

**Files:**
- Modify: `components/sections/TechStackSection.vue`

**Interfaces:**
- Consumes: `TECH_CATEGORIES` from `~/constants/techstack` (unchanged shape: `{ id, labelKey, descriptionKey, items: { id, name, icon }[] }[]`), `UiSectionHeading`, `UiAppIcon`, `LayoutPageSection`, i18n keys `techSection.eyebrow/titleStart/titleHighlight/titleEnd` and `techSection.categories.<id>.label/description`.

- [ ] **Step 1: Rewrite `components/sections/TechStackSection.vue`**

```vue
<script setup lang="ts">
import { TECH_CATEGORIES } from '~/constants/techstack'

const { t } = useI18n()
</script>

<template>
  <LayoutPageSection id="tech">
    <UiSectionHeading :eyebrow="$t('techSection.eyebrow')" align="center" class="mx-auto">
      <template #title>
        {{ $t('techSection.titleStart') }}
        <span class="text-accent">{{ $t('techSection.titleHighlight') }}</span>
        {{ $t('techSection.titleEnd') }}
      </template>
    </UiSectionHeading>

    <div class="mx-auto mt-14 max-w-4xl space-y-10">
      <div v-for="category in TECH_CATEGORIES" :key="category.id">
        <h3 class="text-sm font-semibold tracking-wide text-fg uppercase">
          {{ t(category.labelKey) }}
        </h3>
        <p class="mt-1 text-sm text-fg-muted">
          {{ t(category.descriptionKey) }}
        </p>
        <div class="mt-4 flex flex-wrap gap-3">
          <span
            v-for="item in category.items"
            :key="item.id"
            class="flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm
              text-fg-muted transition hover:border-white/30 hover:text-fg"
          >
            <UiAppIcon :icon="item.icon" class="h-5 w-5" />
            {{ item.name }}
          </span>
        </div>
      </div>
    </div>
  </LayoutPageSection>
</template>
```

- [ ] **Step 2: Verify**

Run: `npx eslint components/sections/TechStackSection.vue`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/sections/TechStackSection.vue
git commit -m "Rewrite Tech Stack section as a flat tag grid"
```

---

### Task 8: Projects page — PageIntro, ProjectsSection, ClientSectorCard

**Files:**
- Modify: `components/sections/PageIntro.vue`
- Modify: `components/sections/ProjectsSection.vue`
- Modify: `components/cards/ClientSectorCard.vue`

**Interfaces:**
- `PageIntro` props unchanged: `eyebrow: string`, `titleStart: string`, `titleHighlight: string`, `titleEnd?: string`, `subtitle?: string`.
- `ClientSectorCard` props unchanged: `title: string`, `icon: string`, `clients: string[]`.
- Consumes: `CLIENT_SECTORS` from `~/constants/clients` (unchanged shape), `UiSectionHeading`, `UiBadge`, `UiAppIcon`, `LayoutPageSection`.
- `pages/projects.vue` is not modified — it already calls `SectionsPageIntro` and `SectionsProjectsSection` with the same prop names, so no changes ripple to it.

- [ ] **Step 1: Rewrite `components/sections/PageIntro.vue`**

```vue
<script setup lang="ts">
defineProps<{
  eyebrow: string
  titleStart: string
  titleHighlight: string
  titleEnd?: string
  subtitle?: string
}>()
</script>

<template>
  <LayoutPageSection class="pt-40 pb-12">
    <UiBadge>{{ eyebrow }}</UiBadge>
    <h1 class="mt-6 max-w-2xl text-4xl font-extrabold tracking-tight text-fg sm:text-5xl">
      {{ titleStart }}
      <span class="text-accent">{{ titleHighlight }}</span>
      {{ titleEnd }}
    </h1>
    <p v-if="subtitle" class="mt-5 max-w-xl text-lg text-fg-muted">{{ subtitle }}</p>
  </LayoutPageSection>
</template>
```

- [ ] **Step 2: Rewrite `components/sections/ProjectsSection.vue`**

```vue
<script setup lang="ts">
import { CLIENT_SECTORS } from '~/constants/clients'

const { t } = useI18n()
</script>

<template>
  <LayoutPageSection id="projects-list">
    <UiSectionHeading :eyebrow="$t('projectsSection.eyebrow')" align="center" class="mx-auto">
      <template #title>
        {{ $t('projectsSection.titleStart') }}
        <span class="text-accent">{{ $t('projectsSection.titleHighlight') }}</span>
        {{ $t('projectsSection.titleEnd') }}
      </template>
    </UiSectionHeading>

    <div class="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <CardsClientSectorCard
        v-for="sector in CLIENT_SECTORS"
        :key="sector.id"
        :title="t(sector.labelKey)"
        :icon="sector.icon"
        :clients="sector.clients"
      />
    </div>
  </LayoutPageSection>
</template>
```

- [ ] **Step 3: Rewrite `components/cards/ClientSectorCard.vue`**

```vue
<script setup lang="ts">
defineProps<{
  title: string
  icon: string
  clients: string[]
}>()
</script>

<template>
  <div class="rounded-2xl border border-white/10 p-6 transition hover:border-white/20">
    <div
      class="flex h-16 w-16 items-center justify-center rounded-xl border border-white/15
        text-accent"
    >
      <UiAppIcon :icon="icon" class="h-8 w-8" />
    </div>
    <h3 class="mt-4 text-lg font-semibold text-fg">{{ title }}</h3>
    <div class="mt-4 flex flex-wrap gap-2">
      <span
        v-for="client in clients"
        :key="client"
        class="rounded-full border border-white/10 px-4 py-1.5 text-sm text-fg-muted"
      >
        {{ client }}
      </span>
    </div>
  </div>
</template>
```

- [ ] **Step 4: Verify**

Run: `npx eslint components/sections/PageIntro.vue components/sections/ProjectsSection.vue components/cards/ClientSectorCard.vue`
Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add components/sections/PageIntro.vue components/sections/ProjectsSection.vue components/cards/ClientSectorCard.vue
git commit -m "Rewrite Projects page components in editorial style"
```

---

### Task 9: CV page background

**Files:**
- Modify: `pages/cv.vue` (full rewrite)

**Interfaces:**
- No behavior changes — `useHead`, `useSeoMeta`, and the `pdfjs-viewer-element` usage stay identical. This task fixes 4 pre-existing lint errors in this file (unused `locales` var, three lines over 100 chars) while it's already being touched, since the plan's lint-clean verification would otherwise fail on baseline issues unrelated to this task.

- [ ] **Step 1: Rewrite `pages/cv.vue`**

```vue
<script setup>
const { locale } = useI18n()
const lang = locale._value

useHead({
  meta: [
    { name: 'robots', content: 'noindex, nofollow' },
  ],
})

useSeoMeta({
  title: 'Curriculum vitæ - Maxime Jolivet',
  ogTitle:
    'CV - Maxime Jolivet, Développeur web full-stack senior PHP - JavaScript / Expert Drupal',
  description:
    'Développeur web avec 10 ans d\'expérience en agence digitale, solides bases en '
    + 'informatique et développement web - Consultez le CV de Maxime Jolivet 🚀',
  ogDescription:
    'Développeur web avec 10 ans d\'expérience en agence digitale, solides bases en '
    + 'informatique et développement web - Consultez le CV de Maxime Jolivet 🚀',
  ogImage: 'https://maximejolivet.fr/open-graph-maximejolivet.jpg',
  ogType: 'website',
  twitterCard: 'summary_large_image',
})
</script>

<template>
  <div class="flex flex-col h-full bg-canvas">
    <h1 class="sr-only">Maxime Jolivet - Curriculum vitæ</h1>
    <pdfjs-viewer-element
      src="/cv-maximejolivet-developpeur-web-fullstack-senior-lead-dev-tech-lead.pdf"
      viewer-css-theme="DARK"
      zoom="auto"
      :locale="lang"
      class="flex-1 w-full h-screen border-0"
    />
  </div>
</template>
```

- [ ] **Step 2: Verify**

Run: `npx eslint pages/cv.vue`
Expected: no errors (2 pre-existing warnings — `vue/first-attribute-linebreak` and `vue/html-closing-bracket-newline` style — no longer apply since the element is now multi-line; if any warning remains it does not block, only errors do).

- [ ] **Step 3: Commit**

```bash
git add pages/cv.vue
git commit -m "Match CV page background to canvas token, fix pre-existing lint errors"
```

---

### Task 10: Blog index page

**Files:**
- Modify: `pages/blog/index.vue`

**Interfaces:**
- No script/data-fetching changes — `useArticles()`, `title()`, `excerpt()`, `slug()`, `formattedDate()` all stay exactly as they are. Only the `<template>` classes change.

- [ ] **Step 1: Replace the `<template>` block in `pages/blog/index.vue`**

Keep the existing `<script setup>` block untouched. Replace the `<template>` block with:

```vue
<template>
  <div class="min-h-screen px-6 pt-32 pb-16 md:pb-24">
    <div class="mx-auto max-w-5xl">
      <NuxtLink
        :to="localePath('/')"
        class="mb-10 inline-flex items-center gap-2 text-sm text-fg-muted transition
          hover:text-fg"
      >
        ← {{ $t('blog.back') }}
      </NuxtLink>

      <h1 class="text-3xl font-extrabold tracking-tight text-fg md:text-4xl">
        {{ $t('blog.title') }}
      </h1>
      <p class="mt-3 text-fg-muted">{{ $t('blog.subtitle') }}</p>

      <p v-if="pending" class="mt-12 text-fg-muted">{{ $t('blog.loading') }}</p>
      <p v-else-if="error" class="mt-12 text-fg-muted">{{ $t('blog.error') }}</p>
      <p v-else-if="!articles.length" class="mt-12 text-fg-muted">{{ $t('blog.empty') }}</p>

      <div v-else class="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        <NuxtLink
          v-for="article in articles"
          :key="article.id"
          :to="localePath(`/blog/${slug(article)}`)"
          class="flex flex-col overflow-hidden rounded-xl border border-white/10 transition
            hover:border-white/20"
        >
          <img
            v-if="article.cover_image_url"
            :src="article.cover_image_url"
            :alt="title(article)"
            class="h-40 w-full object-cover grayscale"
          />
          <div class="flex flex-1 flex-col p-6">
            <p class="font-mono text-xs text-fg-muted">
              {{ formattedDate(article.published_at) }}
            </p>
            <h2 class="mt-2 text-lg font-semibold text-fg">
              {{ title(article) }}
            </h2>
            <p class="mt-2 flex-1 text-sm text-fg-muted">
              {{ excerpt(article) }}
            </p>
            <span class="mt-4 text-sm text-accent underline hover:no-underline">
              {{ $t('blog.read_more') }}
            </span>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
```

- [ ] **Step 2: Verify**

Run: `npx eslint pages/blog/index.vue`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add pages/blog/index.vue
git commit -m "Restyle blog index page to editorial theme"
```

---

### Task 11: Blog article page

**Files:**
- Modify: `pages/blog/[slug].vue`

**Interfaces:**
- No script/data-fetching changes — `useArticle()`, `title`, `excerpt`, `paragraphs`, `formattedDate` computed refs stay exactly as they are. Only the `<template>` classes change.

- [ ] **Step 1: Replace the `<template>` block in `pages/blog/[slug].vue`**

Keep the existing `<script setup>` block untouched. Replace the `<template>` block with:

```vue
<template>
  <div class="min-h-screen px-6 pt-32 pb-16 md:pb-24">
    <div class="mx-auto max-w-2xl">
      <NuxtLink
        :to="localePath('/blog')"
        class="mb-10 inline-flex items-center gap-2 text-sm text-fg-muted transition
          hover:text-fg"
      >
        ← {{ $t('blog.back_to_list') }}
      </NuxtLink>

      <p v-if="pending" class="text-fg-muted">{{ $t('blog.loading') }}</p>
      <p v-else-if="error" class="text-fg-muted">{{ $t('blog.error') }}</p>

      <template v-else-if="article">
        <p class="font-mono text-xs text-fg-muted">{{ formattedDate }}</p>
        <h1 class="mt-2 text-3xl font-extrabold tracking-tight text-fg md:text-4xl">
          {{ title }}
        </h1>
        <img
          v-if="article.cover_image_url"
          :src="article.cover_image_url"
          :alt="title"
          class="mt-8 w-full rounded-xl object-cover grayscale"
        />
        <div class="mt-8 space-y-4 leading-relaxed text-fg-muted">
          <p v-for="paragraph in paragraphs" :key="paragraph">
            {{ paragraph }}
          </p>
        </div>
      </template>
    </div>
  </div>
</template>
```

- [ ] **Step 2: Verify**

Run: `npx eslint "pages/blog/[slug].vue"`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add "pages/blog/[slug].vue"
git commit -m "Restyle blog article page to editorial theme"
```

---

### Task 12: Remove dead animation code and GSAP/motion-v dependencies

**Files:**
- Delete: `components/ui/CodeWindow.vue`
- Delete: `components/ui/GradientText.vue`
- Delete: `components/ui/GlowCard.vue`
- Delete: `components/animations/AnimatedGradientBg.vue`
- Delete: `components/animations/MagneticButton.vue`
- Delete: `components/animations/ScrollReveal.vue`
- Delete: `composables/useGsap.ts`
- Delete: `composables/useParallax.ts`
- Delete: `composables/useScrollReveal.ts`
- Delete: `plugins/gsap.client.ts`
- Modify: `package.json` (remove `gsap`, `motion-v` from `dependencies`)

**Interfaces:**
- This task has no consumers left by design — Tasks 4 through 11 already removed every usage of these components/composables. This task only deletes now-dead files and confirms it with a repo-wide search.

- [ ] **Step 1: Delete the dead component and composable files**

`components/ui/CodeWindow.vue` is currently untracked (never committed), so it's removed with a plain `rm`, not `git rm`. Every other file below is tracked.

```bash
rm -f components/ui/CodeWindow.vue
git rm components/ui/GradientText.vue components/ui/GlowCard.vue
git rm components/animations/AnimatedGradientBg.vue components/animations/MagneticButton.vue components/animations/ScrollReveal.vue
git rm composables/useGsap.ts composables/useParallax.ts composables/useScrollReveal.ts
git rm plugins/gsap.client.ts
```

- [ ] **Step 2: Remove `gsap` and `motion-v` from `package.json`**

Find in `package.json`:

```json
  "dependencies": {
    "@nuxt/image": "^2.0.0",
    "@supabase/supabase-js": "^2.108.2",
    "gsap": "^3.15.0",
    "motion-v": "^2.3.0"
  }
```

Replace with:

```json
  "dependencies": {
    "@nuxt/image": "^2.0.0",
    "@supabase/supabase-js": "^2.108.2"
  }
```

- [ ] **Step 3: Reinstall to update the lockfile**

Run: `npm install`
Expected: `package-lock.json` updates, removing `gsap`, `motion-v`, and their now-unused transitive dependencies. No errors.

- [ ] **Step 4: Confirm no remaining references anywhere in source**

Run: `grep "gsap|motion-v|CodeWindow|GradientText|GlowCard|ScrollReveal|MagneticButton|AnimatedGradientBg|useParallax|useGsap|useScrollReveal" . -t vue -t ts`
Expected: no matches under `components/`, `composables/`, `pages/`, `layouts/`, `plugins/`, `constants/`, `types/` (only `.nuxt/` generated types may still mention them until the next `nuxt prepare`/dev run regenerates them, and `package-lock.json`/`node_modules` references from unrelated packages are expected — those are not source code).

- [ ] **Step 5: Full build verification**

Run: `npm run lint`
Expected: no errors.

Run: `npm run generate`
Expected: build succeeds with no errors, producing static output.

- [ ] **Step 6: Manual QA pass**

- Start `npm run dev`, open `http://localhost:8000/fr` and `http://localhost:8000/en`.
- Check Home, `/projects`, `/cv`, `/blog`, and one `/blog/<slug>` article render with the new dark editorial theme (no leftover gold/emerald colors, no glass/blur, no gradient text).
- Resize to 375px width — confirm no horizontal scroll, text remains readable.
- Tab through the page with keyboard only — confirm a visible amber focus ring appears on every link/button/nav item.
- Stop the dev server.

- [ ] **Step 7: Commit**

```bash
git add package.json package-lock.json
git commit -m "Remove GSAP and motion-v, delete dead animation components"
```

## Self-Review Notes

- **Spec coverage:** every section of the design spec (tokens, components removed/kept/rewritten, pages, animation, technical cleanup, testing) maps to a task above — Task 1 (tokens/fonts), Task 2 (primitives), Task 3 (nav/layout), Tasks 4–7 (Home sections), Task 8 (Projects), Task 9 (CV), Tasks 10–11 (Blog), Task 12 (cleanup + QA).
- **Ordering guarantees buildability:** Task 12 (file deletion) is last and only removes files whose last real usage was eliminated in Tasks 4–8, confirmed via a repo-wide search before writing this plan.
- **No new i18n keys:** every task reuses existing keys already present in `i18n/locales/en.json` / `i18n/locales/fr.json`; no translation file changes are part of this plan.
- **Type/shape consistency:** `EXPERIENCE_TIMELINE` (Task 6) and `TECH_CATEGORIES` (Task 7) item shapes match `types/content.types.ts` (`TimelineItem`, `TechCategory`) exactly as already defined — no changes to `types/content.types.ts` or `constants/*.ts` are needed anywhere in this plan.
