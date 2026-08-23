import { describe, expect, test } from 'vitest'
import { sanitizeHTML } from './html-sanitizer'

describe('sanitizeHTML', () => {
  test('preserves the markup used by Hacker News comments', () => {
    expect(
      sanitizeHTML(
        '<p>Hello <a href="https://example.com" rel="nofollow">link</a> <i>world</i></p><pre><code>const x = 1</code></pre>'
      )
    ).toBe(
      '<p>Hello <a href="https://example.com" rel="nofollow">link</a> <i>world</i></p><pre><code>const x = 1</code></pre>'
    )
  })

  test('removes executable elements', () => {
    expect(sanitizeHTML('<p>safe</p><script>alert(1)</script>')).toBe(
      '<p>safe</p>'
    )
  })

  test('removes event handlers', () => {
    expect(
      sanitizeHTML('<a href="https://example.com" onclick="alert(1)">link</a>')
    ).toBe('<a href="https://example.com">link</a>')
  })

  test('removes unsafe URL schemes', () => {
    expect(sanitizeHTML('<a href="javascript:alert(1)">link</a>')).toBe(
      '<a>link</a>'
    )
  })
})
