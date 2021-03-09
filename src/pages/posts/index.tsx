import { NextPage } from 'next'
import { NextSeo } from 'next-seo'
import React from 'react'
import { BlogIndex } from 'src/components/blog/BlogIndex'
import { useURL } from 'src/hooks/useURL'
import { PageLayout } from 'src/layouts/PageLayout'
import { generateBlogPostsFeeds } from 'src/scripts/generateFeeds'
import { generateSiteMap } from 'src/scripts/generateSiteMap'
import { refreshPageViews } from 'src/scripts/refreshPageViews'
import { renderPackageOpenGraphImage } from 'src/scripts/renderPackageOpenGraphImage'
import { ExtendedPostFrontMatter } from 'src/types'
// @ts-ignore
import { frontMatter as allPosts } from './**/*.mdx'

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
  await generateBlogPostsFeeds(posts)
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
