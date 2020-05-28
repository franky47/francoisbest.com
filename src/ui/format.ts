/**
 * Format a date-ish object to a locale-friendly string
 */
export function formatDate(date?: Date | string, defaultValue: string = '') {
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
