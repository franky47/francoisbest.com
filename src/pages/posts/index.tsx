import path from 'path'
import React from 'react'
import { NextPage } from 'next'
import { Box, Text, Stack, Divider, Icon } from '@chakra-ui/core'
import Nav from '../../components/Nav'
import { ArticleMeta } from '../../components/blog/types'
import { H3, H4, Paragraph, H1 } from '../../components/primitives/Typography'
import { RouteLink, OutgoingLink } from '../../components/primitives/Links'
import Tags, { Tag } from '../../components/blog/Tags'
import { useRouter } from 'next/dist/client/router'
import { NextSeo } from 'next-seo'
import { FaRss } from 'react-icons/fa'
import { listBlogPosts, generateSyndicationFeeds } from '../../utility/blog'
import generateSiteMap from '../../scripts/generateSiteMap'

interface Post {
  slug: string
  year: string
  meta: ArticleMeta
}

type YearPostsMap = {
  [year: string]: Post[]
}

export interface IndexProps {
  posts: YearPostsMap
}
const PostsIndex: NextPage<IndexProps> = ({ posts }) => {
  const router = useRouter()
  const tag = router?.query.tag as string

  const filteredPosts = React.useMemo(() => {
    if (!tag) {
      return posts
    }
    return Object.keys(posts)
      .map(year => {
        return [
          year,

          posts[year].filter((p: Post) => p.meta.tags?.includes(tag))
        ] as const
      })
      .reduce((obj, [year, posts]) => {
        if (posts.length === 0) {
          return obj
        }
        return { ...obj, [year]: posts }
      }, {})
  }, [posts, tag])

  return (
    <>
      <NextSeo
        title="Articles | François Best"
        description="I write articles about TypeScript, Node.js, React, security and privacy."
        canonical="https://francoisbest.com/posts"
        additionalMetaTags={[{ property: 'author', content: 'François Best' }]}
        twitter={{
          cardType: 'summary',
          handle: 'fortysevenfx',
          site: 'fortysevenfx'
        }}
        openGraph={{
          type: 'website',
          profile: {
            firstName: 'François',
            lastName: 'Best'
          }
        }}
      />
      <Nav />
      <Box as="main" maxW="xl" mx="auto" px={[3, 3, 1]} mt={12}>
        <H1>Articles</H1>
        <Stack isInline alignItems="center" spacing={[2, 4]} mt={-12} mb={8}>
          <Text color="orange.500" ml="auto">
            <FaRss role="img" aria-label="RSS/Atom feed icon" />
          </Text>
          <OutgoingLink href="/posts/feed/rss.xml">RSS</OutgoingLink>
          <OutgoingLink href="/posts/feed/atom.xml">Atom</OutgoingLink>
          <OutgoingLink href="/posts/feed/articles.json">JSON</OutgoingLink>
        </Stack>
        <Paragraph>
          I write about TypeScript, Node.js, React, security and privacy.
        </Paragraph>
        {tag && (
          <Stack isInline alignItems="center">
            <Text>Showing posts tagged</Text>
            <Tag name={tag} mt="-3px" />
            <Divider orientation="vertical" mx={0} h={4} />
            <RouteLink
              to="/posts"
              fontSize="sm"
              fontWeight="medium"
              color="gray.600"
            >
              <Icon name="small-close" mr={1} />
              Clear
            </RouteLink>
          </Stack>
        )}

        {Object.keys(filteredPosts)
          .sort((a, b) => (a < b ? 1 : -1))
          .map(year => (
            <React.Fragment key={year}>
              <H3>{year}</H3>
              {filteredPosts[year].map((post, i, a) => (
                <React.Fragment key={post.slug}>
                  <PostPreview {...post} key={post.slug} />
                  {i !== a.length - 1 && <Divider my={8} />}
                </React.Fragment>
              ))}
            </React.Fragment>
          ))}
      </Box>
    </>
  )
}

export async function getStaticProps(): Promise<{
  props: IndexProps
}> {
  const postsDir = path.resolve(process.cwd(), 'src/pages/posts')
  const posts = await listBlogPosts(postsDir)
  const postsList = Object.values(posts).flat()
  await generateSyndicationFeeds(postsList)
  await generateSiteMap(postsList)

  return {
    props: {
      posts
    }
  }
}

export default PostsIndex

// --

const PostPreview: React.FC<Post> = ({ year, slug, meta }) => {
  return (
    <Box>
      <H4 fontSize="lg" fontWeight="medium" mb={1}>
        <RouteLink to={`/posts/${year}/${slug}`} color="blue.600">
          {meta.title}
        </RouteLink>
      </H4>
      <Stack isInline alignItems="center">
        <Text
          fontSize="sm"
          color={meta.publicationDate ? 'gray.600' : 'orange.500'}
          fontWeight="medium"
        >
          {meta.publicationDate || 'DRAFT'}
        </Text>
        {meta.tags?.length > 0 && (
          <Divider orientation="vertical" h={4} mx={0} />
        )}
        {meta.tags?.length > 0 && <Tags tags={meta.tags} mt="-3px" />}
      </Stack>
      <Paragraph mt={4} color="gray.600">
        {meta.summary}
      </Paragraph>
    </Box>
  )
}
