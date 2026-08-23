import type { MDXComponents } from 'mdx/types'
import Image from 'next/image'
import Link from 'next/link'
import { Note } from 'ui/components/note'
import { GitHubRepo } from 'ui/embeds/github-repo'
import { HackerNewsComment } from 'ui/embeds/hacker-news'
import { NpmPackage } from 'ui/embeds/npm-package'
import { WideContainer } from 'ui/layouts/wide-container'

export function getMdxComponents(): MDXComponents {
  return {
    Note,
    WideContainer,
    NpmPackage,
    GitHubRepo,
    Image,
    HackerNewsComment,
    // SAFETY: Next Image accepts the image props emitted by the MDX compiler.
    img: Image as MDXComponents['img'],
    a: ({ href, ref, ...props }) => {
      void ref
      if (href?.startsWith('/') || href?.startsWith('#')) {
        return <Link href={href} {...props} />
      }
      return <a href={href} {...props} />
    }
  }
}
