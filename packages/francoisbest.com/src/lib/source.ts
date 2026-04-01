import { blog } from 'collections/server'
import { loader } from 'fumadocs-core/source'
import { toFumadocsSource } from 'fumadocs-mdx/runtime/server'

export const blogSource = loader({
  baseUrl: '/posts',
  source: toFumadocsSource(blog, [])
})
