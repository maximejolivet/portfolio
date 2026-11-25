import DOMPurify from 'isomorphic-dompurify'

// Guards every v-html render of Supabase-authored content (blog articles,
// project case studies) - the anon key can only read that table, but a
// bad paste from an untrusted source shouldn't become live markup for
// every visitor.
const ALLOWED_TAGS = ['p', 'ul', 'li', 'strong', 'em', 'a', 'code', 'br', 'pre']
const ALLOWED_ATTR = ['href', 'target', 'rel']

// Force rel="noopener noreferrer" on new-tab links, so the opened page cannot
// reach back into window.opener even on browsers that don't default to it.
DOMPurify.addHook('afterSanitizeAttributes', (node) => {
  if (node.tagName === 'A' && node.getAttribute('target') === '_blank') {
    node.setAttribute('rel', 'noopener noreferrer')
  }
})

export function sanitizeHtml(html: string | null | undefined): string {
  if (!html) return ''
  return DOMPurify.sanitize(html, { ALLOWED_TAGS, ALLOWED_ATTR })
}
