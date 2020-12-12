/**
 * Format a date-ish object to a locale-friendly string
 */
export function formatDate(
  date?: Date | string | number,
  defaultValue: string = ''
) {
  if (!date) {
    return defaultValue
  }
  // https://css-tricks.com/how-to-convert-a-date-string-into-a-human-readable-format/
  return new Date(date).toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

export function formatTime(date: Date | string | number) {
  return new Date(date).toLocaleTimeString('en-GB', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit'
  })
}

const numberFormat = Intl.NumberFormat('en-GB')

export function formatPageViews(views: number) {
  return numberFormat.format(views)
}

export function formatSEOKeyValues(dict: Record<string, string>) {
  return Object.keys(dict).flatMap((key, index) => [
    { name: `twitter:label${index + 1}`, content: key },
    { name: `twitter:data${index + 1}`, content: dict[key] }
  ])
}
