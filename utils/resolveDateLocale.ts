export function resolveDateLocale(locale: string): string {
  if (locale === 'en') return 'en-US'
  if (locale === 'br') return 'br-FR'
  return 'fr-FR'
}
