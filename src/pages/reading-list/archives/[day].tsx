import React from 'react'
import { GetStaticPathsResult, GetStaticPropsContext, NextPage } from 'next'
import { GetStaticPropsReturn } from 'src/types'
import { ReadingListPageProps } from 'src/components/readingList/defs'
import { fetchArticles, filterArticles } from 'src/components/readingList/utils'
import PageLayoutWithSEO from 'src/layouts/PageLayout'
import { ButtonRouteLink, RouteLink } from '@47ng/chakra-next'
import { H1 } from 'src/components/primitives/Typography'
import { useURL } from 'src/hooks/useURL'
import { useLinkColor } from 'src/ui/theme'
import { ArticleList } from 'src/components/readingList/ArticleList'
import dayjs from 'dayjs'
import { formatDate } from 'src/ui/format'
import { ArchivesRouteLink } from '..'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  HStack,
  useColorModeValue
} from '@chakra-ui/react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

export interface ReadingListDayPageProps extends ReadingListPageProps {
  day: string
  nextDay?: string
  prevDay?: string
}

const ReadingListDayPage: NextPage<ReadingListDayPageProps> = ({
  day,
  nextDay,
  prevDay,
  articles
}) => {
  const humanDay = formatDate(day)
  const todaysArticles = articles[humanDay]
  return (
    <PageLayoutWithSEO
      frontMatter={{
        title: `${humanDay} Reading List`,
        description: `My reading list for ${humanDay}: ${
          todaysArticles.length
        } articles by ${todaysArticles
          .filter(article => !!article.author)
          .filter((_, i) => i < 5)
          .map(article => article.author)
          .join(', ')}${todaysArticles.length > 5 ? ' and more.' : '.'}`,
        url: useURL(`/reading-list/archives/${day}`),
        ogImage: {
          url: useURL(`/images/reading-list/og.jpg`),
          width: 1200,
          height: 630
        }
      }}
    >
      <H1>Reading List</H1>
      <Flex
        alignItems={['flex-start', 'center']}
        justifyContent="space-between"
        mb={16}
        flexDirection={['column', 'row']}
      >
        <Breadcrumb
          flexShrink={0}
          color={useColorModeValue('gray.500', 'gray.600')}
          fontSize="sm"
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
          <BreadcrumbItem>
            <BreadcrumbLink
              // @ts-ignore
              as={RouteLink}
              to="/reading-list/archives"
              color={useLinkColor()}
            >
              Archives
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink color={useColorModeValue('gray.800', 'gray.400')}>
              {humanDay}
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        <HStack
          as="nav"
          spacing={4}
          mt={[4, 0]}
          w={['100%', 'auto']}
          justifyContent="space-between"
        >
          {prevDay && (
            <ButtonRouteLink
              to={`/reading-list/archives/${prevDay}`}
              size="sm"
              variant="link"
              colorScheme="accent"
              color={useLinkColor()}
              fontWeight="normal"
              leftIcon={<FiChevronLeft />}
            >
              Previous
            </ButtonRouteLink>
          )}
          {nextDay && (
            <ButtonRouteLink
              to={`/reading-list/archives/${nextDay}`}
              size="sm"
              variant="link"
              colorScheme="accent"
              color={useLinkColor()}
              fontWeight="normal"
              rightIcon={<FiChevronRight />}
            >
              Next
            </ButtonRouteLink>
          )}
        </HStack>
      </Flex>
      <ArticleList showDayHeadings={false} articles={articles} />
      <ArchivesRouteLink>Show all articles</ArchivesRouteLink>
    </PageLayoutWithSEO>
  )
}

export default ReadingListDayPage

// --

export async function getStaticProps(
  ctx: GetStaticPropsContext
): GetStaticPropsReturn<ReadingListDayPageProps> {
  const { day } = ctx.params as { day?: string }
  if (!day) {
    return {
      props: {
        day: '',
        articles: {}
      }
    }
  }
  const pageDay = dayjs(day)
  const allArticles = await fetchArticles()
  const articles = filterArticles(allArticles, article =>
    pageDay.isSame(dayjs(article.timestamp), 'day')
  )
  const prevDay = pageDay.subtract(1, 'day').format('YYYY-MM-DD')
  const nextDay = pageDay.add(1, 'day').format('YYYY-MM-DD')
  const hasPrevDay = Object.keys(allArticles).includes(formatDate(prevDay))
  const hasNextDay = Object.keys(allArticles).includes(formatDate(nextDay))
  return {
    props: {
      day,
      ...(hasPrevDay ? { prevDay } : {}),
      ...(hasNextDay ? { nextDay } : {}),
      articles
    }
  }
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
  const articles = await fetchArticles()
  const paths = Object.keys(articles).map(day => ({
    params: {
      day: dayjs(day).format('YYYY-MM-DD')
    }
  }))
  return {
    paths,
    fallback: false
  }
}
