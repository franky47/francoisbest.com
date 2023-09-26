import DOMPurify from 'dompurify'
import { JSDOM } from 'jsdom'

const window = new JSDOM('').window
const purify = DOMPurify(window)

export function sanitizeHTML(unsafeHTML: string) {
  return purify.sanitize(unsafeHTML)
}
