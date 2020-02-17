import fs from 'fs'
import path from 'path'
import walk from 'walkdir'
import React from 'react'
import { NextPage } from 'next'
import { Box, Text, Stack, Divider, Button, Icon } from '@chakra-ui/core'
import Nav from '../../components/Nav'
import { ArticleMeta } from '../../components/blog/types'
import { H3, H4 } from '../../components/primitives/Typography'
import { RouteLink } from '../../components/primitives/Links'
import Tags, { Tag } from '../../components/blog/Tags'
import { useRouter } from 'next/dist/client/router'

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
      <Nav />
      <Box as="main" maxW="xl" mx="auto" px={[3, 3, 1]} mt={12}>
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
              {filteredPosts[year].map(post => (
                <PostPreview {...post} key={post.slug} />
              ))}
            </React.Fragment>
          ))}
      </Box>
    </>
  )
}

export async function unstable_getStaticProps(): Promise<{
  props: IndexProps
}> {
  const metaRegex = /export\s+const\s+meta\s+=\s+({[\s\S]*?\n})/
  const postsDir = path.resolve(process.cwd(), 'src/pages/posts')
  const paths = (await walk.async(postsDir))
    .filter(p => p.endsWith('.mdx'))
    .sort((a, b) => (a < b ? 1 : -1))
  const posts: YearPostsMap = {}
  for (const postPath of paths) {
    const [slug, year] = postPath.split('/').reverse()
    const contents = fs.readFileSync(postPath, 'utf-8')
    const match = metaRegex.exec(contents)
    if (!match || typeof match[1] !== 'string') {
      throw new Error(`Article ${slug} needs to export const meta = {}`)
    }
    // eslint-disable-next-line no-eval
    const meta: ArticleMeta = eval('(' + match[1] + ')')
    if (!meta.publicationDate) {
      continue // Don't list drafts
    }

    // todo: Find last modification date from Git
    posts[year] = [
      ...(posts[year] || []),
      {
        slug: slug.replace(/\.mdx$/, ''), // Remove extension
        year,
        meta
      }
    ].sort((a, b) => (a.meta.publicationDate < b.meta.publicationDate ? 1 : -1))
  }
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
      <RouteLink to={`/posts/${year}/${slug}`} color="blue.600">
        <H4 fontSize="lg" fontWeight="medium" mb={1}>
          {meta.title}
        </H4>
      </RouteLink>
      <Stack isInline alignItems="center">
        <Text fontSize="sm" color="gray.600" fontWeight="medium">
          {meta.publicationDate}
        </Text>
        {meta.tags?.length > 0 && (
          <Divider orientation="vertical" h={4} mx={0} />
        )}
        {meta.tags?.length > 0 && <Tags tags={meta.tags} mt="-3px" />}
      </Stack>
    </Box>
  )
}
