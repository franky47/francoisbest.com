import { resolve } from 'lib/paths'
import { BlogPostEmbed } from 'ui/embeds/blog-post-embed'
import HashvatarDemoPage from './demo'

export const metadata = {
  title: 'Hashvatar',
  description: 'Generate your own SHA-256 based avatar',
}

export default async function HashvatarPage() {
  return (
    <>
      <HashvatarDemoPage />
      <BlogPostEmbed
        filePath={resolve(
          import.meta.url,
          '../../(pages)/posts/(content)/2021/hashvatars/page.mdx'
        )}
      />
    </>
  )
}
