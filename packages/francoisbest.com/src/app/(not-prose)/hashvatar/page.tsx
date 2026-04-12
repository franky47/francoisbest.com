import { BlogPostEmbed } from 'ui/embeds/blog-post-embed'
import HashvatarDemoPage from './demo'

export const metadata = {
  title: 'Hashvatar',
  description: 'Generate your own SHA-256 based avatar'
}

export default function HashvatarPage() {
  return (
    <>
      <HashvatarDemoPage />
      <BlogPostEmbed slug={['2021', 'hashvatars']} />
    </>
  )
}
