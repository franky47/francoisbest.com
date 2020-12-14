import React from 'react'
import { NextPage } from 'next'
import { NextSeo } from 'next-seo'
import { generateFeeds } from 'src/scripts/generateFeeds'
import { generateSiteMap } from 'src/scripts/generateSiteMap'
import { refreshPageViews } from 'src/scripts/refreshPageViews'
import { BlogIndex } from 'src/components/blog/BlogIndex'
import { PageLayout } from 'src/layouts/PageLayout'
import { useURL } from 'src/hooks/useURL'
// @ts-ignore
import { frontMatter as allPosts } from './**/*.mdx'
import { ExtendedPostFrontMatter } from 'src/types'
import { renderPackageOpenGraphImage } from 'src/scripts/renderPackageOpenGraphImage'

const posts: ExtendedPostFrontMatter[] = allPosts.filter(
  (post: ExtendedPostFrontMatter) =>
    process.env.NODE_ENV === 'development' || !!post.publicationDate
)

const PostsIndex: NextPage = () => {
  return (
    <>
      <NextSeo
        title="Articles"
        titleTemplate="%s | François Best"
        description="I write about TypeScript, Node.js, React, security and privacy."
        canonical={useURL('/posts')}
        openGraph={{
          title: 'Articles by François Best',
          images: [
            {
              url: useURL('/images/posts/og.jpg'),
              width: 1280,
              height: 720
            }
          ]
        }}
      />
      <PageLayout>
        <BlogIndex posts={posts} />
      </PageLayout>
    </>
  )
}

export async function getStaticProps() {
  await generateFeeds(posts)
  await generateSiteMap(posts)
  await refreshPageViews(posts)
  await renderPackageOpenGraphImage({
    slug: '47ng/chakra-next',
    packageName: '@47ng/chakra-next'
  })
  return {
    props: {}
  }
}

export default PostsIndex
