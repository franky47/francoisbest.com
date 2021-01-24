import React from 'react'
import { NextPage } from 'next'
import { H1 } from 'src/components/primitives/Typography'

import { useURL } from 'src/hooks/useURL'
import PageLayoutWithSEO from 'src/layouts/PageLayout'
import { GetStaticPropsReturn } from 'src/types'
import { Article } from 'src/components/readingList/defs'
import { fetchArticles } from 'src/components/readingList/utils'
import { TimeGraph } from 'src/components/timeGraph/TimeGraph'
import { WideContainer } from 'src/components/WideContainer'
import { NoSSR } from '@47ng/chakra-next'
import { AspectRatio, Box, Skeleton } from '@chakra-ui/react'

export interface ReadingListStatsPageProps {
  articles: Article[]
}

const ReadingListStatsPage: NextPage<ReadingListStatsPageProps> = ({
  articles
}) => {
  return (
    <PageLayoutWithSEO
      frontMatter={{
        title: 'Reading List Stats',
        description: "All the blog posts I've read in 2021",
        url: useURL('/reading-list/stats'),
        ogImage: {
          url: useURL(`/images/reading-list/og.jpg`),
          width: 1200,
          height: 630
        }
      }}
    >
      <H1>Reading List Stats</H1>
      <WideContainer>
        <NoSSR
          fallback={
            <Skeleton>
              <AspectRatio ratio={800 / 400}>
                <Box />
              </AspectRatio>
            </Skeleton>
          }
        >
          <TimeGraph
            data={articles}
            getTimestamp={article => article.timestamp}
          />
        </NoSSR>
      </WideContainer>
    </PageLayoutWithSEO>
  )
}

export default ReadingListStatsPage

// --

export async function getStaticProps(): GetStaticPropsReturn<ReadingListStatsPageProps> {
  const articles = Object.values(await fetchArticles()).flat()
  return {
    props: {
      articles
    }
  }
}
