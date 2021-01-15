import React from 'react'
import { NextPage } from 'next'
import { OutgoingLink, RouteLink } from '@47ng/chakra-next'
import { Box } from '@chakra-ui/react'
import { FiArchive } from 'react-icons/fi'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { H1, Paragraph } from 'src/components/primitives/Typography'
import { ArticleList } from 'src/components/readingList/ArticleList'
import { useURL } from 'src/hooks/useURL'
import PageLayoutWithSEO from 'src/layouts/PageLayout'
import { useLinkColor } from 'src/ui/theme'
import { GetStaticPropsReturn } from 'src/types'
import { ReadingListPageProps } from 'src/components/readingList/defs'
import { fetchArticles, filterArticles } from 'src/components/readingList/utils'
import { ReadingListDailyRSSHeadLinks } from 'src/components/readingList/rss'
import { generateReadingListDailyFeed } from 'src/scripts/generateFeeds'

export const ArchivesRouteLink: React.FC = ({
  children = 'Show all',
  ...props
}) => (
  <RouteLink
    to="/reading-list/archives"
    textAlign="center"
    display="block"
    color={useLinkColor()}
    fontSize="sm"
    mt={12}
    {...props}
  >
    <Box as={FiArchive} display="inline-block" mt={-1} mr={2} />
    {children}
  </RouteLink>
)

const ReadingListPage: NextPage<ReadingListPageProps> = ({ articles }) => {
  return (
    <PageLayoutWithSEO
      frontMatter={{
        title: 'Reading List',
        description: "All the blog posts I've read in 2021",
        url: useURL('/reading-list/archives'),
        ogImage: {
          url: useURL(`/images/reading-list/og.jpg`),
          width: 1200,
          height: 630
        }
      }}
    >
      <ReadingListDailyRSSHeadLinks />
      <H1>Reading List</H1>
      <Paragraph>
        I{' '}
        <OutgoingLink
          href="https://twitter.com/fortysevenfx/status/1343587407799738368"
          color={useLinkColor()}
        >
          keep track
        </OutgoingLink>{' '}
        of all the blog posts I have read in 2021.
      </Paragraph>
      <ArticleList showDayHeadings articles={articles} />
      <ArchivesRouteLink />
    </PageLayoutWithSEO>
  )
}

export default ReadingListPage

// --

export async function getStaticProps(): GetStaticPropsReturn<ReadingListPageProps> {
  dayjs.extend(utc)
  const allArticles = await fetchArticles()
  const articles = filterArticles(
    allArticles,
    article =>
      article.timestamp < dayjs().utc().startOf('day').valueOf() &&
      article.timestamp >=
        dayjs().utc().startOf('day').subtract(3, 'day').valueOf()
  )
  await generateReadingListDailyFeed(allArticles)
  return {
    props: {
      articles
    }
  }
}
