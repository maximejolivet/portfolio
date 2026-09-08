<script setup lang="ts">
const { t, locale } = useI18n()
const localePath = useLocalePath()
const route = useRoute()

const slug = Array.isArray(route.params.slug) ? (route.params.slug[0] ?? '') : route.params.slug

const article = ref<Article | null>(null)
const pending = ref(false)
const error = ref<unknown>(null)
const status = ref<'idle' | 'pending' | 'success' | 'error'>('idle')

try {
  const result = await useArticle(slug)
  article.value = result.data.value
  pending.value = result.pending.value
  error.value = result.error.value
  status.value = result.status.value
}
catch (fetchError) {
  error.value = fetchError
  status.value = 'error'
}

const title = computed(() => {
  if (!article.value) return ''
  return locale.value === 'en' ? article.value.title_en : article.value.title_fr
})
const excerpt = computed(() => {
  if (!article.value) return ''
  return locale.value === 'en' ? article.value.excerpt_en : article.value.excerpt_fr
})
const paragraphs = computed(() => {
  if (!article.value) return []
  const content = locale.value === 'en' ? article.value.content_en : article.value.content_fr
  return content.split(/\n\s*\n/).filter((paragraph: string) => paragraph.trim().length > 0)
})

const formattedDate = computed(() => {
  if (!article.value) return ''
  return new Date(article.value.published_at).toLocaleDateString(
    resolveDateLocale(locale.value),
    { year: 'numeric', month: 'long', day: 'numeric' },
  )
})

const readingTime = computed(() => {
  if (!article.value) return 0
  const content = locale.value === 'en' ? article.value.content_en : article.value.content_fr
  const wordCount = content.trim().split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(wordCount / 200))
})

const shareState = ref<'idle' | 'copied'>('idle')
let shareStateTimeout: ReturnType<typeof setTimeout> | undefined

async function share() {
  const shareData = { title: title.value, text: excerpt.value, url: window.location.href }

  if (navigator.share) {
    try {
      await navigator.share(shareData)
    }
    catch {
      // User cancelled or the share sheet failed - no feedback needed either way.
    }
    return
  }

  try {
    await navigator.clipboard.writeText(shareData.url)
  }
  catch {
    // Clipboard unavailable (non-secure context, permission denied) - no
    // feedback to show, same as a cancelled native share above.
    return
  }

  shareState.value = 'copied'
  clearTimeout(shareStateTimeout)
  shareStateTimeout = setTimeout(() => {
    shareState.value = 'idle'
  }, 2000)
}

onUnmounted(() => clearTimeout(shareStateTimeout))

watch(
  status,
  () => {
    if (status.value === 'success' && !article.value) {
      showError(createError({ statusCode: 404, statusMessage: t('blog.not_found') }))
    }
  },
  { immediate: true },
)

useSeoMeta({
  title: () => `${article.value ? title.value : t('blog.title')} - Maxime Jolivet`,
  ogTitle: () => (article.value ? title.value : t('blog.title')),
  description: () => excerpt.value || t('blog.subtitle'),
  ogImage: () => article.value?.cover_image_url ?? undefined,
})
</script>

<template>
  <div>
    <UiReadingProgress v-if="article" />

    <LayoutPageSection bare>
      <UiContainer class="max-w-[880px]">
        <div class="flex items-center justify-between py-8">
          <NuxtLink
            :to="localePath('blog')"
            class="inline-flex items-center gap-1 font-mono text-xs font-semibold text-muted-foreground hover:text-accent"
          >
            <UiAppIcon icon="lucide:arrow-left" class="size-3" />{{ $t('blog.back_to_list') }}
          </NuxtLink>

          <button
            v-if="article"
            type="button"
            class="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-muted-foreground transition-colors hover:text-accent"
            :aria-label="$t('blog.share')"
            @click="share"
          >
            <UiAppIcon :icon="shareState === 'copied' ? 'lucide:check' : 'lucide:share-2'" class="size-3.5" />
            {{ shareState === 'copied' ? $t('blog.linkCopied') : $t('blog.share') }}
          </button>
        </div>

        <div v-if="pending" class="flex flex-col gap-5 pb-20">
          <UiSkeleton class="h-3 w-32" />
          <UiSkeleton class="mt-3 h-10 w-4/5" />
          <UiSkeleton class="mt-10 h-64 w-full rounded-2xl" />
          <UiSkeleton class="mt-10 h-4 w-full" />
          <UiSkeleton class="h-4 w-full" />
          <UiSkeleton class="h-4 w-2/3" />
        </div>
        <UiEmptyState v-else-if="error" icon="lucide:wifi-off" :message="$t('blog.error')" />

        <template v-else-if="article">
          <span class="font-mono text-[0.7812rem] text-subtle">
            {{ formattedDate }} · {{ $t('blog.readingTime', { minutes: readingTime }) }}
          </span>
          <h1
            class="mt-3 text-balance font-sans text-[clamp(2.125rem,4.2vw,3.125rem)] font-bold leading-[1.1] tracking-[-1px] text-foreground"
          >
            {{ title }}
          </h1>
          <img
            v-if="article.cover_image_url"
            :src="article.cover_image_url"
            :alt="title"
            class="mt-10 w-full rounded-2xl border border-border object-cover"
          />
          <div class="mt-10 flex flex-col gap-5 pb-24">
            <p
              v-for="paragraph in paragraphs"
              :key="paragraph"
              class="text-pretty font-sans text-[1rem] leading-[1.8] text-muted-foreground"
              v-html="sanitizeHtml(paragraph)"
            />
          </div>
        </template>
      </UiContainer>
    </LayoutPageSection>
  </div>
</template>
