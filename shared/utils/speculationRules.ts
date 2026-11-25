// Speculation Rules (https://developer.chrome.com/docs/web-platform/prerender-pages).
// When a visitor hovers a project card link, Chromium prerenders the case study so the
// click feels instant. Other browsers ignore the block, so it is a progressive enhancement.
//
// Links marked rel="nofollow" are excluded: that covers client (pro) projects, which are
// noindex and must not be prerendered before the visitor asks for them.
export function buildSpeculationRules() {
  return {
    prerender: [
      {
        where: {
          and: [
            {
              or: [
                { href_matches: '/fr/projets/*' },
                { href_matches: '/en/projects/*' },
              ],
            },
            { not: { selector_matches: '[rel~=nofollow]' } },
          ],
        },
        eagerness: 'moderate',
      },
    ],
  }
}
