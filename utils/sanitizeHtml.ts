import DOMPurify from 'isomorphic-dompurify'

// Guards every v-html render of Supabase-authored content (blog articles,
// project case studies) - the anon key can only read that table, but a
// bad paste from an untrusted source shouldn't become live markup for
// every visitor.
const ALLOWED_TAGS = ['p', 'ul', 'li', 'strong', 'em', 'a', 'code', 'br']
const ALLOWED_ATTR = ['href', 'target', 'rel']

export function sanitizeHtml(html: string | null | undefined): string {
  if (!html) return ''
  return DOMPurify.sanitize(html, { ALLOWED_TAGS, ALLOWED_ATTR })
}
