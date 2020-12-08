import { Object } from 'ts-toolbelt'
import readingTime from 'reading-time'
import type { ContainerProps } from '@chakra-ui/react'

/**
 * Basic frontmatter exposed by next-mdx-enhanced
 */
export interface MDXFrontMatter {
  __resourcePath: string
  __scans: object
  layout: string
}

/**
 * Injected by `extendFrontMatter` in next.config.js
 * */
export interface ExtendedMDXFrontMatter extends MDXFrontMatter {
  /** URL path to the document */
  path: string
  /** Full URL */
  url: string
  ogImage?: {
    url: string
    width: number
    height: number
  }
}

export interface PageFrontMatter extends ExtendedMDXFrontMatter {
  title: string
  description: string
  titleAppendSiteName?: boolean
  containerProps?: ContainerProps
}

export interface PostFrontMatter extends PageFrontMatter {
  publicationDate?: string
  tags?: string[]
}

/** Injected by `extendFrontMatter` in next.config.js */
export interface ExtendedPostFrontMatter extends PostFrontMatter {
  readingTime: ReturnType<typeof readingTime>
}

export type PostMetadata = Object.Diff<ExtendedPostFrontMatter, MDXFrontMatter>
