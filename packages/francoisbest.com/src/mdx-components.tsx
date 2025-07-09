import type { MDXComponents } from 'mdx/types'
import Image from 'next/image'
import Link from 'next/link'
import { Note } from 'ui/components/note'
import { GitHubRepo } from 'ui/embeds/github-repo'
import { HackerNewsComment } from 'ui/embeds/hacker-news'
import { NpmPackage } from 'ui/embeds/npm-package'
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
    NpmPackage,
    GitHubRepo,
    Image,
    HackerNewsComment,
    img: Image,
    // Smart link (internal routes vs outgoing links)
    a: ({ href, ref: _, ...props }) => {
      if (href?.startsWith('/') || href?.startsWith('#')) {
        return <Link href={href} {...props} />
      }
      return <a href={href} {...props} />
    }
  }
}
