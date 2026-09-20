// Splits a "typed so far" character budget across consecutive lines, in order.
export function revealLines(texts: string[], visibleChars: number) {
  let start = 0
  return texts.map((text) => {
    const visible = Math.max(0, Math.min(text.length, visibleChars - start))
    start += text.length
    return { text: text.slice(0, visible), isStarted: visible > 0, isDone: visible >= text.length }
  })
}
