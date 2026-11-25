// Single source for "should this animation run?": the visitor's in-app choice wins over the
// operating system setting. The CSS rules read the same attribute (see assets/css/main.css).
export function prefersReducedMotion(): boolean {
  const forced = globalThis.document?.documentElement?.dataset.motion
  if (forced === 'reduce') return true
  if (forced === 'full') return false
  return globalThis.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false
}
