import React from 'react'
import { NextPage } from 'next'
import { H1, Paragraph } from 'src/components/primitives/Typography'

import { useURL } from 'src/hooks/useURL'
import PageLayoutWithSEO from 'src/layouts/PageLayout'
import { GetStaticPropsReturn } from 'src/types'
import { Article } from 'src/components/readingList/defs'
import { fetchArticles } from 'src/components/readingList/utils'
import { TimeGraph } from 'src/components/timeGraph/TimeGraph'
import { WideContainer } from 'src/components/WideContainer'
import { NoSSR, RouteLink } from '@47ng/chakra-next'
import {
  AspectRatio,
  Box,
  Skeleton,
  Kbd,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  useColorModeValue
} from '@chakra-ui/react'
import { useLinkColor } from 'src/ui/theme'

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
      <Breadcrumb
        flexShrink={0}
        color={useColorModeValue('gray.500', 'gray.600')}
        fontSize="sm"
        mb={12}
        sx={{
          '& ol': {
            mb: 0
          }
        }}
      >
        <BreadcrumbItem>
          <BreadcrumbLink
            // @ts-ignore
            as={RouteLink}
            to="/reading-list"
            color={useLinkColor()}
          >
            Reading List
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink color={useColorModeValue('gray.800', 'gray.400')}>
            Stats
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
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
      <Paragraph mt={8}>
        Click on the graph to zoom in, or use keyboard shortcuts:
        <Table variant="simple" size="sm" mt={8}>
          <Thead>
            <Tr>
              <Th>Key</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>
                <Kbd>D</Kbd>
              </Td>
              <Td>Today</Td>
            </Tr>
            <Tr>
              <Td>
                <Kbd>W</Kbd>
              </Td>
              <Td>This week</Td>
            </Tr>
            <Tr>
              <Td>
                <Kbd>M</Kbd>
              </Td>
              <Td>This month</Td>
            </Tr>
            <Tr>
              <Td>
                <Kbd>↑</Kbd>
              </Td>
              <Td>Zoom out</Td>
            </Tr>
            <Tr>
              <Td>
                <Kbd>←</Kbd>
              </Td>
              <Td>Previous period</Td>
            </Tr>
            <Tr>
              <Td>
                <Kbd>→</Kbd>
              </Td>
              <Td>Next period</Td>
            </Tr>
            <Tr>
              <Td>
                <Kbd>Shift</Kbd> + <Kbd>←</Kbd>
              </Td>
              <Td>Previous period (fine)</Td>
            </Tr>
            <Tr>
              <Td>
                <Kbd>Shift</Kbd> + <Kbd>→</Kbd>
              </Td>
              <Td>Next period (fine)</Td>
            </Tr>
          </Tbody>
        </Table>
      </Paragraph>
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
