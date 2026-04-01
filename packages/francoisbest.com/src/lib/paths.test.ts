import { describe, expect, test } from 'vitest'
import { url } from './paths'

describe('paths', () => {
  test('url generates correct URLs', () => {
    const original = process.env.DEPLOYMENT_URL
    process.env.DEPLOYMENT_URL = 'example.com'
    expect(url('/posts')).toEqual('https://example.com/posts')
    process.env.DEPLOYMENT_URL = original
  })
})
