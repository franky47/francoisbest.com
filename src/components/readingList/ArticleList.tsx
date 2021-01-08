import React from 'react'
import { H2 } from 'src/components/primitives/Typography'
import { OutgoingLink, RouteLink } from '@47ng/chakra-next'
import {
  Text,
  List,
  ListItem,
  useColorModeValue,
  HStack
} from '@chakra-ui/react'
import { useLinkColor } from 'src/ui/theme'
import { formatDate } from 'src/ui/format'
import { useUTMLink } from 'src/hooks/useUTMLink'
import { Article, GroupedReadingList } from './defs'
import dayjs from 'dayjs'

export interface ArticleListProps {
  showDayHeadings?: boolean
  linkDayHeadings?: boolean
  articles: GroupedReadingList
}

export const ArticleList: React.FC<ArticleListProps> = ({
  articles,
  showDayHeadings = true,
  linkDayHeadings = false
}) => {
  return (
    <>
      {Object.keys(articles).map(date => {
        const isoDate = dayjs(date).format('YYYY-MM-DD')
        return (
          <React.Fragment key={date}>
            {showDayHeadings && (
              <H2 mt={16} id={isoDate}>
                {linkDayHeadings ? (
                  <RouteLink to={`/reading-list/archives/${isoDate}`}>
                    {date}
                  </RouteLink>
                ) : (
                  date
                )}
              </H2>
            )}
            <List spacing={10}>
              {articles[date].map(article => (
                <ArticleItem key={article.timestamp} {...article} />
              ))}
            </List>
          </React.Fragment>
        )
      })}
    </>
  )
}

// --

export const ArticleItem: React.FC<Article> = ({
  url,
  title,
  author,
  twitter,
  date,
  description,
  ...props
}) => {
  return (
    <ListItem {...props}>
      <OutgoingLink
        href={useUTMLink(url)}
        color={useLinkColor()}
        fontWeight="semibold"
        fontSize="xl"
      >
        {title}
      </OutgoingLink>
      <HStack
        fontSize="sm"
        color={useColorModeValue('gray.600', 'gray.500')}
        divider={<Text>&nbsp;•&nbsp;</Text>}
        mb={2}
      >
        {author && <Text>{author}</Text>}
        {twitter && (
          <OutgoingLink href={`https://twitter.com/${twitter}`}>
            @{twitter}
          </OutgoingLink>
        )}
        {date && <Text>{formatDate(date, '', { month: 'short' })}</Text>}
      </HStack>
      <Text>{description}</Text>
    </ListItem>
  )
}
