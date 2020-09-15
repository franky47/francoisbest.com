import React from 'react'
import Stack from '@chakra-ui/core/dist/Stack'
import { NextSeo } from 'next-seo'
import { ExtendedPostFrontMatter, PostMetadata } from 'src/types'
import { PageLayout, PageLayoutProps } from './PageLayout'
import { PostHeader } from 'src/components/blog/PostHeader'
import { PostLinks } from 'src/components/blog/PostLinks'
import { Author } from 'src/components/blog/Author'
import { useURL } from 'src/hooks/useURL'
import { mdxComponents } from 'src/components/blog/Mdx'

export interface PostLayoutProps extends Omit<PageLayoutProps, 'title'> {
  postMetadata: PostMetadata
}

export const PostLayout: React.FC<PostLayoutProps> = ({
  postMetadata,
  children,
  ...props
}) => {
  return (
    <>
      <PageLayout as="article" maxW="2xl" {...props} lineHeight={1.7}>
        <PostHeader {...postMetadata} mb={12} />
        {children}
        <Stack as="footer" spacing={8} mt={8}>
          <mdxComponents.hr my={0} w="100%" />
          <Author />
          <PostLinks {...postMetadata} mx="auto" />
        </Stack>
      </PageLayout>
    </>
  )
}

export default function PostLayoutWithSEO({
  children,
  frontMatter: {
    title,
    url,
    publicationDate,
    description,
    tags,
    path,
    ...frontMatter
  }
}: React.PropsWithChildren<{ frontMatter: ExtendedPostFrontMatter }>) {
  return (
    <>
      <NextSeo
        title={title}
        description={description}
        additionalMetaTags={[
          { property: 'author', content: 'François Best' },
          ...(tags
            ? [
                {
                  property: 'keywords',
                  content: tags.join(',')
                }
              ]
            : [])
        ]}
        canonical={url}
        openGraph={{
          type: 'article',
          title,
          description,
          url,
          article: {
            publishedTime:
              publicationDate &&
              new Date(publicationDate)?.toISOString().slice(0, 10),
            authors: [useURL()],
            tags
          },
          images: frontMatter.ogImage ? [frontMatter.ogImage] : undefined
        }}
      />
      <PostLayout
        postMetadata={{
          title,
          url,
          path,
          publicationDate,
          description,
          tags,
          ...frontMatter
        }}
      >
        {children}
      </PostLayout>
    </>
  )
}
