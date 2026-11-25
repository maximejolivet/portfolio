// Brand colour per technology, used to tint its bar in the hero terminal (`skills`).
// Only technologies listed here get a colour; the others keep the default text colour.
// Values are adjusted for the dark panel by utils/techColor.ts, so no need to pick
// shades that pass contrast here.
export const TECH_BRAND_COLORS: Record<string, string> = {
  'php': '#777bb4',
  'javascript': '#f7df1e',
  'typescript': '#3178c6',
  'sql': '#4479a1',
  'vue': '#42b883',
  'nuxt': '#00dc82',
  'react': '#61dafb',
  'angular': '#dd0031',
  'tailwind': '#38bdf8',
  'symfony': '#e5e7eb',
  'laravel': '#ff2d20',
  'drupal': '#0678be',
  'wordpress': '#21759b',
  'mysql': '#4479a1',
  'postgresql': '#4169e1',
  'redis': '#ff4438',
  'supabase': '#3ecf8e',
  'docker': '#2496ed',
  'vercel': '#e5e7eb',
  'ollama': '#e5e7eb',
  'python': '#3776ab',
  'django': '#44b78b',
  'java': '#ed8b00',
  'spring-boot': '#6db33f',
  'git': '#f05032',
  'figma': '#a259ff',
}
