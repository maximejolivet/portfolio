<script setup lang="ts">
import { NAV_ITEMS } from '~/constants/nav'
import { GITHUB_REPO_URL } from '~/constants/pageSource'

const localePath = useLocalePath()
const { public: { appVersion, commitSha, buildDate } } = useRuntimeConfig()

const shortSha = computed(() => commitSha.slice(0, 7))
const buildDay = computed(() => buildDate.slice(0, 10))

function openCookieSettings() {
  window.tarteaucitron?.userInterface?.openPanel()
}

function scrollToTop() {
  window.scrollTo({ top: 0, left: 0 })
}
</script>

<template>
  <footer class="bg-background text-foreground">
    <div
      class="mx-auto grid max-w-[1180px] gap-12 px-4 pb-14 pt-16 sm:px-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] md:gap-16 md:pb-20 md:pt-24"
    >
      <div class="flex flex-col gap-6">
        <p class="font-sans text-[2rem] font-bold leading-[1.05] tracking-[-0.03em] text-foreground">
          Maxime Jolivet
        </p>
        <div class="flex flex-col gap-1 font-sans text-sm text-muted-foreground">
          <p>{{ $t('footer.taglineRole') }}</p>
          <p>{{ $t('footer.taglineDetails') }}</p>
        </div>
        <p class="flex flex-wrap items-center gap-x-2 gap-y-1 font-sans text-sm text-muted-foreground">
          {{ $t('footer.madeInPrefix') }}
          <img
            src="/flag-br.svg"
            :alt="$t('footer.madeInPlace')"
            width="29"
            height="20"
            class="h-5 w-auto"
          />
          {{ $t('footer.madeInSuffix') }}
        </p>
        <div class="self-start">
          <NavigationThemeToggle />
        </div>
      </div>

      <nav :aria-label="$t('footer.navLabel')">
        <ul class="grid grid-cols-2 gap-x-8 gap-y-4 font-sans text-sm sm:grid-cols-3">
          <li v-for="item in NAV_ITEMS" :key="item.id">
            <NavigationNavLink
              :to="item.to"
              :href="item.href"
              :hash="item.hash"
              :open-chat="item.openChat"
              :rel="item.rel"
              large
            >
              {{ $t(item.labelKey) }}
            </NavigationNavLink>
          </li>
          <li>
            <NuxtLink
              :to="localePath('mentions-legales')"
              rel="nofollow"
              class="text-muted-foreground transition-colors hover:text-accent"
            >
              {{ $t('footer.legalMentions') }}
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              :to="localePath('accessibilite')"
              rel="nofollow"
              class="text-muted-foreground transition-colors hover:text-accent"
            >
              {{ $t('footer.accessibility') }}
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              :to="localePath('changelog')"
              rel="nofollow"
              class="text-muted-foreground transition-colors hover:text-accent"
            >
              {{ $t('footer.changelog') }}
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              :to="localePath('status')"
              rel="nofollow"
              class="text-muted-foreground transition-colors hover:text-accent"
            >
              {{ $t('footer.status') }}
            </NuxtLink>
          </li>
          <li>
            <button
              type="button"
              class="cursor-pointer text-muted-foreground transition-colors hover:text-accent"
              @click="openCookieSettings"
            >
              {{ $t('footer.manageCookies') }}
            </button>
          </li>
        </ul>
      </nav>
    </div>

    <div class="bg-panel text-panel-foreground">
      <div
        class="mx-auto flex max-w-[1180px] flex-col gap-3 px-4 py-4 font-mono text-xs sm:flex-row sm:items-center sm:justify-between sm:px-8"
      >
        <p class="min-w-0 wrap-break-word">
          <span class="text-mint" aria-hidden="true">$</span>
          git log -1 --oneline
          <template v-if="commitSha">
            <a
              :href="`${GITHUB_REPO_URL}/commit/${commitSha}`"
              target="_blank"
              rel="noopener noreferrer"
              class="ml-2 underline-offset-4 transition-colors hover:text-mint hover:underline focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mint"
            >
              {{ shortSha }}<span class="sr-only">{{ $t('a11y.newWindow') }}</span>
            </a>
          </template>
          <span class="ml-2 text-panel-foreground/60">v{{ appVersion }} ({{ buildDay }})</span>
        </p>
        <button
          type="button"
          class="self-start text-panel-foreground/70 transition-colors hover:text-mint focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mint sm:self-auto"
          @click="scrollToTop"
        >
          {{ $t('footer.backToTop') }}
        </button>
      </div>
    </div>
  </footer>
</template>
