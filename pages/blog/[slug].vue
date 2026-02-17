<script setup>
import { supabase } from '~/utils/supabase'

const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()
const route = useRoute()

const availableLocales = computed(() => {
  return locales.value.filter((i) => i.code !== locale.value)
})

const post = ref(null)
const loading = ref(true)
const error = ref(null)

// Récupérer l'article de blog par slug
const fetchPost = async () => {
  try {
    loading.value = true
    const { data, error: fetchError } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', route.params.slug)
      .single()

    if (fetchError) throw fetchError

    post.value = data
  } catch (err) {
    console.error('Erreur lors du chargement du post:', err)
    error.value = err.message || "Erreur lors du chargement de l'article"
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchPost()
})
</script>

<template>
  <div class="bg-black text-white min-h-screen p-8">
    <div class="flex gap-4 mb-8">
      <NuxtLink
        v-for="loc in availableLocales"
        :key="loc.code"
        class="text-white hover:text-gray-300"
        :to="switchLocalePath(loc.code)"
      >
        {{ loc.name }}
      </NuxtLink>
    </div>

    <NuxtLink to="/blog" class="text-blue-400 hover:text-blue-300 mb-6 inline-block"> ← {{ $t('error.return') }}</NuxtLink>

    <div v-if="loading" class="text-center">
      <p>Chargement...</p>
    </div>

    <div v-else-if="error" class="text-red-400 text-center">
      <p>{{ error }}</p>
    </div>

    <article v-else-if="post" class="max-w-3xl mx-auto">
      <h1 class="text-4xl font-bold mb-4">{{ post.title }}</h1>
      <div class="text-gray-400 mb-8">
        {{ new Date(post.created_at).toLocaleDateString() }}
      </div>
      <div class="prose prose-invert max-w-none">
        {{ post.content }}
      </div>
    </article>

    <div v-else class="text-center">
      <p>Article non trouvé</p>
    </div>
  </div>
</template>

<style scoped></style>
