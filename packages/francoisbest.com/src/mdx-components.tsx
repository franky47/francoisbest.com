import type { MDXComponents } from 'mdx/types'
import Image from 'next/image'
import Link from 'next/link'
import { Note } from 'ui/components/note'
import { MdxPageFooter } from 'ui/layouts/mdx-page-footer'
import { MdxPageHeader } from 'ui/layouts/mdx-page-header'
import { WideContainer } from 'ui/layouts/wide-container'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    Note,
    MdxPageHeader,
    MdxPageFooter,
    WideContainer,
    Image,
    // @ts-expect-error - Required for remark-mdx-images to work
    img: Image,
    // Smart link (internal routes vs outgoing links)
    a: ({ href, ref: _, ...props }) => {
      if (href?.startsWith('/' || href?.startsWith('#'))) {
        return <Link href={href} {...props} />
      }
      return <a href={href} {...props} />
    },
  }
}
