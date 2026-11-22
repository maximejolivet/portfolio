import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest'

type Handler = (event: unknown) => unknown

let handler: Handler
let currentUrl = new URL('http://localhost/')
let redirects: Array<{ target: string } & { status: number }> = []

beforeAll(async () => {
  vi.stubGlobal('defineEventHandler', (fn: Handler) => fn)
  vi.stubGlobal('getRequestURL', () => currentUrl)
  vi.stubGlobal('sendRedirect', (_event: unknown, target: string, status: number) => {
    redirects.push({ target, status })
    return 'redirected'
  })
  handler = (await import('../server/middleware/locale-redirect')).default as unknown as Handler
})

afterAll(() => {
  vi.unstubAllGlobals()
})

// Runs the middleware for a path and returns its result and the redirect it sent, if any.
function run(path: string) {
  currentUrl = new URL(`http://localhost${path}`)
  redirects = []
  const result = handler({})
  return { result, redirect: redirects[0] }
}

describe('locale-redirect middleware', () => {
  it('sends a bare path to /fr with a 302', () => {
    expect(run('/cv').redirect).toEqual({ target: '/fr/cv', status: 302 })
  })

  it('translates an English segment to its French slug', () => {
    expect(run('/projects').redirect?.target).toBe('/fr/projets')
    expect(run('/projects/foo').redirect?.target).toBe('/fr/projets/foo')
  })

  it('keeps the query string', () => {
    expect(run('/projects?x=1').redirect?.target).toBe('/fr/projets?x=1')
  })

  it('translates uppercase segments like lowercase ones', () => {
    expect(run('/Projects').redirect?.target).toBe('/fr/projets')
    expect(run('/CV').redirect?.target).toBe('/fr/cv')
  })

  it('leaves locale-prefixed paths alone', () => {
    expect(run('/fr/cv').redirect).toBeUndefined()
    expect(run('/en/projects').redirect).toBeUndefined()
  })

  it('ignores the home page, API routes, Nuxt internals and files', () => {
    expect(run('/').redirect).toBeUndefined()
    expect(run('/api/x').redirect).toBeUndefined()
    expect(run('/_nuxt/a.js').redirect).toBeUndefined()
    expect(run('/__nuxt_error').redirect).toBeUndefined()
    expect(run('/.well-known/change-password').redirect).toBeUndefined()
    expect(run('/logo.svg').redirect).toBeUndefined()
  })

  it('redirects paths that only start like a skipped prefix', () => {
    expect(run('/apiary').redirect?.target).toBe('/fr/apiary')
  })

  it('never produces a protocol-relative target', () => {
    // "//evil.com" ends in an extension, so it is skipped outright.
    expect(run('//evil.com').redirect).toBeUndefined()
    // Without an extension, the leading empty segment is dropped and the target stays local.
    const target = run('//evil/x').redirect?.target
    expect(target).toBe('/fr/evil/x')
    expect(target?.startsWith('//')).toBe(false)
  })
})
