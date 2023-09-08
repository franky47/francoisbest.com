import { describe, expect, test } from 'vitest'
import { filePathToUrlPath } from './paths'

describe('paths', () => {
  test('filePathToUrlPath', () => {
    expect(filePathToUrlPath('/a/(b)/c/(d)/e/page.mdx')).toEqual('/a/c/e')
    expect(filePathToUrlPath('a/(b)/c/(d)/e/page.mdx')).toEqual('/a/c/e')
  })
})
