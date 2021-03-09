import { OutgoingLink, RouteLink } from '@47ng/chakra-next'
import {
  Divider,
  HStack,
  List,
  ListItem,
  Text,
  useColorModeValue
} from '@chakra-ui/react'
import dayjs from 'dayjs'
import React from 'react'
import { H2 } from 'src/components/primitives/Typography'
import { useUTMPathLink } from 'src/hooks/useUTMLink'
import { formatDate } from 'src/ui/format'
import { useLinkColor } from 'src/ui/theme'
import { useVisitedLinkColor } from 'src/ui/theme/foundations/colors'
import { Article, GroupedReadingList } from './defs'

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
              <H2
                fontSize="xs"
                fontWeight="normal"
                color={useColorModeValue('gray.500', 'gray.600')}
                mt={16}
                id={isoDate}
                display="flex"
                alignItems="center"
              >
                <Divider />
                {linkDayHeadings ? (
                  <RouteLink
                    to={`/reading-list/archives/${isoDate}`}
                    flexShrink={0}
                    ml={4}
                  >
                    {date}
                  </RouteLink>
                ) : (
                  <Text as="span" flexShrink={0} ml={4}>
                    {date}
                  </Text>
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
  const [utmLink, setUTMLink] = React.useState(url)
  React.useEffect(() => {
    setUTMLink(useUTMPathLink(url, '/reading-list'))
  }, [])
  return (
    <ListItem {...props}>
      <OutgoingLink
        href={utmLink}
        color={useLinkColor()}
        fontWeight="semibold"
        fontSize="xl"
        _visited={{
          color: useVisitedLinkColor()
        }}
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
