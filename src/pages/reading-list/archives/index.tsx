import React from 'react'
import { NextPage } from 'next'
import { GetStaticPropsReturn } from 'src/types'
import { ReadingListPageProps } from 'src/components/readingList/defs'
import {
  computeStats,
  fetchArticles,
  getOpenGraphImageHash
} from 'src/components/readingList/utils'
import PageLayoutWithSEO from 'src/layouts/PageLayout'
import { OutgoingLink } from '@47ng/chakra-next'
import { H1, Paragraph } from 'src/components/primitives/Typography'
import {
  ReadingListStats,
  ReadingListStatsData
} from 'src/components/readingList/Stats'
import { useURL } from 'src/hooks/useURL'
import { useLinkColor } from 'src/ui/theme'
import { Search, useSearch } from 'src/components/readingList/Search'
import { ArticleList } from 'src/components/readingList/ArticleList'
import { renderReadingListOpenGraphImage } from 'src/scripts/renderReadingListOpenGraphImage'

export interface ReadingListArchivesPageProps extends ReadingListPageProps {
  stats: ReadingListStatsData
  cacheBustingID: string
}

const ReadingListArchivesPage: NextPage<ReadingListArchivesPageProps> = ({
  stats,
  articles,
  cacheBustingID
}) => {
  const [search, setSearch] = React.useState('')
  const filteredArticles = useSearch(articles, search)
  return (
    <PageLayoutWithSEO
      frontMatter={{
        title: 'Reading List',
        description: "All the blog posts I've read in 2021",
        url: useURL('/reading-list/archives'),
        ogImage: {
          url: useURL(`/images/reading-list/og.jpg?${cacheBustingID}`),
          width: 1200,
          height: 630
        }
      }}
    >
      <H1>Reading List Archives</H1>
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
      <ReadingListStats
        {...stats}
        borderWidth="1px"
        p={4}
        rounded="md"
        my={8}
      />
      <Search mb={search ? 16 : 0} search={search} setSearch={setSearch} />
      <ArticleList
        showDayHeadings={!search}
        linkDayHeadings
        articles={filteredArticles}
      />
    </PageLayoutWithSEO>
  )
}

export default ReadingListArchivesPage

// --

export async function getStaticProps(): GetStaticPropsReturn<ReadingListArchivesPageProps> {
  const articles = await fetchArticles()
  const stats = computeStats(articles)
  const cacheBustingID = getOpenGraphImageHash(stats)
  await renderReadingListOpenGraphImage({ stats })
  return {
    props: {
      articles,
      stats,
      cacheBustingID
    }
  }
}
