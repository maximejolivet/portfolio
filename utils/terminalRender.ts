// Text rendering for the hero terminal's `skills` and `timeline` commands.
// Output stays plain text, so screen readers and copy-paste keep working.

export interface BarRow {
  label: string
  count: number
}

// One line per row: an aligned label, a bar scaled to the largest count, then the count.
// A zero count gets no bar.
export function renderBars(rows: BarRow[], maxBar = 12, scaleMax?: number): string[] {
  const max = Math.max(1, scaleMax ?? 0, ...rows.map((row) => row.count))
  const labelWidth = Math.max(0, ...rows.map((row) => row.label.length))
  return rows.map((row) => {
    const length = row.count > 0 ? Math.max(1, Math.round((row.count / max) * maxBar)) : 0
    return `${row.label.padEnd(labelWidth)}  ${'█'.repeat(length).padEnd(maxBar)}  ${row.count}`
  })
}

export interface TimelineRow {
  period: string
  title: string
  organization: string
}

// A vertical line linking the entries, read top to bottom.
export function renderTimeline(rows: TimelineRow[]): string[] {
  return rows.flatMap((row, index) => {
    const entry = `● ${row.period}  ${row.title} @ ${row.organization}`
    return index < rows.length - 1 ? [entry, '│'] : [entry]
  })
}
