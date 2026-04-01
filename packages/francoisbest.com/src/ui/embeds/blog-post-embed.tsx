import { getPost } from 'lib/blog'
import { FiBookmark } from 'react-icons/fi'
import { EmbedFrame, EmbedFrameProps } from 'ui/embeds/embed-frame'
import { BlogPostPreview } from '../../app/(pages)/posts/components/blog-post-preview'

type BlogPostEmbedProps = Omit<EmbedFrameProps, 'Icon' | 'children'> & {
  slug: string[]
}

export const BlogPostEmbed: React.FC<BlogPostEmbedProps> = async ({
  className = 'my-8',
  slug
}) => {
  const post = getPost(slug)
  if (!post) return null
  return (
    <EmbedFrame Icon={FiBookmark} className={className}>
      <BlogPostPreview Heading="h3" {...post} />
    </EmbedFrame>
  )
}
