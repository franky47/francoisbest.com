import sanitizeHtml from 'sanitize-html'

const options: sanitizeHtml.IOptions = {
  allowedAttributes: {
    ...sanitizeHtml.defaults.allowedAttributes,
    a: [...(sanitizeHtml.defaults.allowedAttributes.a ?? []), 'rel']
  }
}

export function sanitizeHTML(unsafeHTML: string) {
  return sanitizeHtml(unsafeHTML, options)
}
