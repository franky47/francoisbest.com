import { describe, expect, test } from 'vitest'
import { computeReadingTime } from './reading-time'

describe('reading time', () => {
  test('computes realistic reading time for a long blog post', () => {
    // "The Security of GitHub Actions" is a 9 min read on production
    const result = computeReadingTime(['2020', 'the-security-of-github-actions'])
    expect(result).toMatch(/\d+ min read/)
    const minutes = parseInt(result)
    expect(minutes).toBeGreaterThan(1)
  })

  test('computes realistic reading time for a short blog post', () => {
    // "NPM download stats are down" is a 2 min read on production
    const result = computeReadingTime(['2023', 'npm-download-stats-are-down'])
    expect(result).toMatch(/\d+ min read/)
    const minutes = parseInt(result)
    expect(minutes).toBeGreaterThanOrEqual(1)
  })

  test('strips frontmatter before computing reading time', () => {
    // If frontmatter wasn't stripped, the reading time would be inflated
    // by the YAML keys and values. Verify the result is reasonable.
    const result = computeReadingTime(['2023', 'dotenv-is-dead'])
    const minutes = parseInt(result)
    expect(minutes).toBeLessThan(20) // sanity check
    expect(minutes).toBeGreaterThanOrEqual(1)
  })

  test('does not return 1 min for every post', () => {
    const slugs = [
      ['2020', 'the-security-of-github-actions'],
      ['2023', 'storing-react-state-in-the-url-with-nextjs'],
      ['2021', 'hashvatars'],
      ['2019', 'strava-auth-cli-in-rust'],
    ]
    const times = slugs.map(s => parseInt(computeReadingTime(s)))
    // These posts have varying lengths - they shouldn't all be the same
    const unique = new Set(times)
    expect(unique.size).toBeGreaterThan(1)
  })
})
