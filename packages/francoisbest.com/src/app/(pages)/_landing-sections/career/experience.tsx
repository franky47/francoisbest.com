import React from 'react'
import { StaticTag } from 'ui/components/tag'

type ExperienceProps = {
  title: string
  url: string
  description: React.ReactNode
  Icon: React.ElementType
  years?: string
  tags?: string[]
}

const tagClassName =
  'bg-gray-50 text-gray-800 dark:bg-gray-800 dark:text-gray-300 flex-shrink-0'

export const Experience: React.FC<
  React.ComponentProps<'section'> & ExperienceProps
> = ({ title, url, description, Icon, years, tags = [], ...props }) => {
  return (
    <section className="not-prose flex flex-col space-y-4 mb-12" {...props}>
      <div className="flex items-center">
        <Icon alt={title} className="w-8 h-8 mr-2" />
        <a href={url} className="mr-auto">
          <h3 className="text-xl font-bold my-0">{title}</h3>
        </a>
        {years && <span className="text-sm text-gray-500">{years}</span>}
      </div>
      <div className="my-0">{description}</div>
      <div className="empty:hidden flex flex-wrap gap-2">
        {tags.map(tag => (
          <StaticTag key={tag} className={tagClassName}>
            {tag}
          </StaticTag>
        ))}
      </div>
    </section>
  )
}

type ClientProps = React.ComponentProps<'li'> & {
  title: string
  url?: string
  description: React.ReactNode
  Icon?: React.ElementType
  tags?: string[]
}

export const Client: React.FC<ClientProps> = ({
  title,
  url,
  description,
  Icon = null,
  tags = [],
  ...props
}) => {
  return (
    <li className="ml-4" {...props}>
      <div className="flex flex-col space-y-2 mb-8">
        <div className="flex items-center">
          {Icon && <Icon alt={title} className="w-6 h-6 mr-2" />}
          {url ? (
            <a href={url}>
              <h4 className="my-0 font-bold">{title}</h4>
            </a>
          ) : (
            <h4 className="my-0 font-bold">{title}</h4>
          )}
        </div>
        <div className="my-0">{description}</div>
        <div className="empty:hidden flex flex-wrap gap-2">
          {tags.map(tag => (
            <StaticTag key={tag} className={tagClassName}>
              {tag}
            </StaticTag>
          ))}
        </div>
      </div>
    </li>
  )
}
