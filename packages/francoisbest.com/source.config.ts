import {
  defineCollections,
  defineConfig,
  applyMdxPreset,
  frontmatterSchema
} from 'fumadocs-mdx/config'
import { z } from 'zod'
import { fromHtml } from 'hast-util-from-html'
import fs from 'node:fs'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePrettyCode, {
  type Options as PrettyCodeOptions
} from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'
import remarkSmartypants from 'remark-smartypants'

const codeHighlightingOptions: PrettyCodeOptions = {
  theme: JSON.parse(
    fs.readFileSync('./src/ui/theme/moonlight-ii.json', 'utf-8')
  ),
  onVisitTitle(element) {
    element.tagName = 'figcaption'
    if (!element.properties) {
      element.properties = {}
    }
    element.properties.className = ['font-mono']
    const fileIcon = fromHtml(
      `<svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        height="1em"
        width="1em"
        stroke="currentColor"
        fill="none"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="inline-block -mt-[2px] mr-2"
        aria-label="File name"
        role="presentation"
      >
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
        <polyline points="14 2 14 8 20 8"></polyline>
        <line x1="16" y1="13" x2="8" y2="13"></line>
        <line x1="16" y1="17" x2="8" y2="17"></line>
        <polyline points="10 9 9 9 8 9"></polyline>
      </svg>`,
      { fragment: true, space: 'svg' }
    )
    // @ts-expect-error - hast types don't expose children array
    element.children.unshift(fileIcon.children[0])
  },
  onVisitCaption(element) {
    element.tagName = 'figcaption'
    if (!element.properties) {
      element.properties = {}
    }
    element.properties.style = 'text-align:center;'
  }
}

export const blog = defineCollections({
  type: 'doc',
  dir: './content/blog',
  schema: frontmatterSchema.extend({
    publicationDate: z.coerce.date().optional(),
    tags: z.array(z.string()).optional(),
    canonical: z.string().optional()
  }),
  mdxOptions: applyMdxPreset({
    rehypeCodeOptions: false,
    remarkPlugins: [remarkGfm, remarkSmartypants],
    rehypePlugins: (v: any[]) => [
      [rehypePrettyCode, codeHighlightingOptions],
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: 'append' }],
      ...v
    ]
  })
})

export default defineConfig({})
