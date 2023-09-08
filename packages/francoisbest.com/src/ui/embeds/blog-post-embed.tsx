import { getPost } from 'lib/blog'
import { FiBookmark } from 'react-icons/fi'
import { EmbedFrame, EmbedFrameProps } from 'ui/embeds/embed-frame'
import { BlogPostPreview } from '../../app/(pages)/posts/components/blog-post-preview'

type BlogPostEmbedProps = Omit<EmbedFrameProps, 'Icon' | 'children'> & {
  filePath: string
}

export const BlogPostEmbed: React.FC<BlogPostEmbedProps> = async ({
  className = 'my-8',
  filePath,
}) => {
  const post = await getPost(filePath)
  return (
    <EmbedFrame Icon={FiBookmark} className={className}>
      <BlogPostPreview Heading="h3" {...post} />
    </EmbedFrame>
  )
}
