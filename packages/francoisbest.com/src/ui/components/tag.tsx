import Link, { LinkProps } from 'next/link'
import { twMerge } from 'tailwind-merge'

const tagClassName =
  'flex h-5 items-center px-2 bg-indigo-50 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-200 rounded-md text-xs font-semibold'

type StaticTagProps = React.ComponentProps<'span'> & {
  children: React.ReactNode
}
type LinkedTagProps = LinkProps & {
  className?: string
  children: React.ReactNode
}

export const StaticTag: React.FC<StaticTagProps> = ({
  className,
  ...props
}) => <span className={twMerge(tagClassName, className)} {...props} />

export const LinkedTag: React.FC<LinkedTagProps> = ({
  className,
  ...props
}) => <Link className={twMerge(tagClassName, className)} {...props} />

// --

type TagsNavProps = React.ComponentProps<'nav'> & {
  tags: string[]
}

export const TagsNav: React.FC<TagsNavProps> = ({ tags, className }) => {
  return (
    <nav aria-label="Tagged" className={twMerge('flex gap-2', className)}>
      {tags.map(tag => (
        <LinkedTag key={tag} href={`/posts?tag=${tag}`}>
          {tag}
        </LinkedTag>
      ))}
    </nav>
  )
}
