<script setup lang="ts">
import { NAV_ITEMS } from '~/constants/nav'

const localePath = useLocalePath()
const { openChat } = useChatIntro()

// Only the labelled items: the icon-only home link is already the header's logo.
const siteLinks = NAV_ITEMS.filter((item) => !item.iconOnly)

function onChatClick(event: MouseEvent, shouldOpenChat?: boolean) {
  if (!shouldOpenChat) return
  event.preventDefault()
  openChat()
}

function openCookieSettings() {
  window.tarteaucitron?.userInterface?.openPanel()
}

function scrollToTop() {
  window.scrollTo({ top: 0, left: 0 })
}

const linkClass = 'text-[#1d3540] underline underline-offset-4 decoration-2 transition-colors hover:text-[#0f5f52] hover:decoration-[3px] focus-visible:rounded-sm focus-visible:outline-[3px] focus-visible:outline-offset-4 focus-visible:outline-foreground'
</script>

<template>
  <footer class="bg-white text-[#1d3540]">
    <div class="mx-auto max-w-[1180px] px-4 pb-12 pt-20 sm:px-8 md:pt-28">
      <div class="flex items-center gap-4 sm:gap-6">
        <UiLogoMark :size="56" class="shrink-0 text-[#1d3540] sm:size-[72px] md:size-[96px]" />
        <p
          class="font-sans text-[clamp(3rem,10vw,7.5rem)] font-semibold leading-[0.92] tracking-[-0.045em] text-balance text-[#1d3540]"
        >
          Maxime Jolivet
        </p>
      </div>

      <div class="mt-16 flex flex-col gap-4 font-sans text-sm text-[#1d3540]">
        <p class="text-base font-semibold text-[#1d3540]">
          {{ $t('footer.taglineRole') }}
        </p>
        <p>{{ $t('footer.taglineDetails') }}</p>
        <p class="flex flex-wrap items-center gap-x-2 gap-y-1">
          {{ $t('footer.madeInPrefix') }}
          <span class="inline-flex rounded-sm bg-panel-foreground p-0.5">
            <img
              src="/flag-br.svg"
              :alt="$t('footer.madeInPlace')"
              width="29"
              height="20"
              class="h-4 w-auto"
            />
          </span>
          {{ $t('footer.madeInSuffix') }}
        </p>
      </div>

      <nav :aria-label="$t('footer.navLabel')" class="mt-12">
        <ul class="grid grid-cols-1 gap-x-10 gap-y-4 font-sans text-base sm:grid-cols-2 lg:grid-cols-3">
          <li v-for="item in siteLinks" :key="item.id">
            <a
              v-if="item.href"
              :href="item.href"
              target="_blank"
              rel="noopener noreferrer"
              :class="linkClass"
              @click="onChatClick($event, item.openChat)"
            >
              {{ $t(item.labelKey) }}<span class="sr-only">{{ $t('a11y.newWindow') }}</span>
            </a>
            <NuxtLink
              v-else
              :to="item.hash ? { path: localePath(item.to), hash: item.hash } : localePath(item.to)"
              :class="linkClass"
            >
              {{ $t(item.labelKey) }}
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              :to="localePath('mentions-legales')"
              rel="nofollow"
              :class="linkClass"
            >
              {{ $t('footer.legalMentions') }}
            </NuxtLink>
          </li>
          <li>
            <NuxtLink :to="localePath('accessibilite')" rel="nofollow" :class="linkClass">
              {{ $t('footer.accessibility') }}
            </NuxtLink>
          </li>
          <li>
            <NuxtLink :to="localePath('changelog')" rel="nofollow" :class="linkClass">
              {{ $t('footer.changelog') }}
            </NuxtLink>
          </li>
          <li>
            <NuxtLink :to="localePath('status')" rel="nofollow" :class="linkClass">
              {{ $t('footer.status') }}
            </NuxtLink>
          </li>
          <li>
            <button type="button" class="cursor-pointer" :class="linkClass" @click="openCookieSettings">
              {{ $t('footer.manageCookies') }}
            </button>
          </li>
        </ul>
      </nav>

      <div class="mt-12 flex flex-wrap items-center justify-between gap-6">
        <NavigationThemeToggle />
        <button
          type="button"
          class="inline-flex min-h-6 items-center py-2 font-sans text-sm underline underline-offset-4 decoration-2 transition-colors hover:text-[#0f5f52] focus-visible:rounded-sm focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-foreground"
          @click="scrollToTop"
        >
          {{ $t('footer.backToTop') }}
        </button>
      </div>
    </div>
  </footer>
</template>
