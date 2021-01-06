import React from 'react'
import { NextPage } from 'next'
import { H1, H2, Paragraph } from 'src/components/primitives/Typography'
import { OutgoingLink } from '@47ng/chakra-next'
import {
  Text,
  List,
  ListItem,
  useColorModeValue,
  HStack,
  StatGroup,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  BoxProps,
  InputGroup,
  InputLeftElement,
  Input,
  InputRightElement,
  CloseButton
} from '@chakra-ui/react'
import { useLinkColor } from 'src/ui/theme'
import { formatDate, formatStatNumber } from 'src/ui/format'
import PageLayoutWithSEO from 'src/layouts/PageLayout'
import { useURL } from 'src/hooks/useURL'
import dayjs from 'dayjs'
import isoWeek from 'dayjs/plugin/isoWeek'
import { renderReadingListOpenGraphImage } from 'src/scripts/renderReadingListOpenGraphImage'
import crypto from 'crypto'
import { b64 } from '@47ng/codec'
import { FiSearch } from 'react-icons/fi'

export interface Article {
  url: string
  title: string
  timestamp: number
  author?: string
  date?: string
  description?: string
  image?: string
  logo?: string
  lang?: string
  twitter?: string
}

type GroupedReadingList = {
  [date: string]: Article[]
}

export interface ReadingListPageProps {
  stats: {
    oldest: string
    week: number
    month: number
    total: number
    lastWeekPct: number
    lastMonthPct: number
  }
  readList: GroupedReadingList
  cacheBustingID: string
}

function useDNT() {
  if (typeof navigator === 'undefined') {
    // SSG
    return false
  }
  return navigator.doNotTrack === '1'
}

function useUTMLink(url: string) {
  const urlObj = new URL(url)
  if (!useDNT()) {
    urlObj.searchParams.set('utm_source', useURL('/reading-list'))
  }
  return urlObj.toString()
}

const ReadingListPage: NextPage<ReadingListPageProps> = ({
  readList,
  stats,
  cacheBustingID
}) => {
  const [search, setSearch] = React.useState('')
  const filteredArticles = React.useMemo(() => {
    return Object.fromEntries(
      Object.entries(readList).map(([day, articles]) => {
        return [
          day,
          articles.filter(
            article =>
              (article.description ?? '')
                .toLowerCase()
                .includes(search.toLowerCase()) ||
              (article.title ?? '').toLowerCase().includes(search.toLowerCase())
          )
        ]
      })
    )
  }, [search])

  return (
    <PageLayoutWithSEO
      frontMatter={{
        title: 'Reading List',
        description: "All the blog posts I've read in 2021",
        url: useURL('/reading-list'),
        ogImage: {
          url: useURL(`/images/reading-list/og.jpg?${cacheBustingID}`),
          width: 1200,
          height: 630
        }
      }}
    >
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
      <ReadingListStats
        stats={stats}
        readList={readList}
        borderWidth="1px"
        p={4}
        rounded="md"
        my={8}
      />
      <InputGroup mb={search ? 16 : 0}>
        <InputLeftElement
          pointerEvents="none"
          fontSize="1.2em"
          px={0}
          children={<FiSearch />}
          color={
            search.length > 0
              ? useColorModeValue('gray.600', 'gray.400')
              : useColorModeValue('gray.400', 'gray.600')
          }
        />
        <Input
          value={search}
          onChange={(e: any) => setSearch(e.target.value)}
          placeholder="Search articles"
        />
        {search.length > 1 && (
          <InputRightElement
            children={
              <CloseButton
                rounded="full"
                size="sm"
                onClick={() => setSearch('')}
              />
            }
          />
        )}
      </InputGroup>
      {Object.keys(filteredArticles).map(date => (
        <React.Fragment key={date}>
          {!search && (
            <H2 mt={16} linkable id={date.toLowerCase().replace(/ /g, '-')}>
              {date}
            </H2>
          )}
          <List spacing={8}>
            {filteredArticles[date].map(article => (
              <ListItem key={article.timestamp}>
                <OutgoingLink
                  href={useUTMLink(article.url)}
                  color={useLinkColor()}
                  fontWeight="semibold"
                >
                  {article.title}
                </OutgoingLink>
                <HStack
                  fontSize="sm"
                  color={useColorModeValue('gray.600', 'gray.500')}
                  divider={<Text>&nbsp;•&nbsp;</Text>}
                  mb={2}
                >
                  {article.author && <Text>{article.author}</Text>}
                  {article.twitter && (
                    <OutgoingLink
                      href={`https://twitter.com/${article.twitter}`}
                    >
                      @{article.twitter}
                    </OutgoingLink>
                  )}
                  {article.date && (
                    <Text>
                      {formatDate(article.date, '', { month: 'short' })}
                    </Text>
                  )}
                </HStack>
                <Text fontSize="sm">{article.description}</Text>
              </ListItem>
            ))}
          </List>
        </React.Fragment>
      ))}
    </PageLayoutWithSEO>
  )
}

function decodeArticle(article: Article): Article {
  for (const key of Object.keys(article) as (keyof Article)[]) {
    if (typeof article[key] !== 'string') {
      continue
    }
    // @ts-ignore
    article[key] = decodeURIComponent(article[key])
  }
  return article
}

export async function getStaticProps() {
  dayjs.extend(isoWeek)

  const Gitrows = require('gitrows')
  const gitrows = new Gitrows()
  const articles: Article[] = (
    (await gitrows.get(process.env.READING_LIST_CSV_URL)) ?? []
  )
    .map(decodeArticle)
    .reverse()
  const readList = articles.reduce(
    (list: GroupedReadingList, article: Article) => {
      const date = formatDate(article.timestamp)
      return {
        ...list,
        [date]: [...(list[date] ?? []), article]
      }
    },
    {}
  )
  // Debug: show the number of articles for the last 3 days
  Object.keys(readList)
    .slice(0, 3)
    .forEach(date =>
      console.log(`${date}: ${readList[date].length} article(s)`)
    )

  const now = dayjs()

  const thisWeek = articles.filter(
    article => article.timestamp > now.startOf('isoWeek').valueOf()
  ).length
  const lastWeek = articles.filter(
    article =>
      article.timestamp >
        now.subtract(1, 'week').startOf('isoWeek').valueOf() &&
      article.timestamp <= now.subtract(1, 'week').valueOf()
  ).length

  const thisMonth = articles.filter(
    article => article.timestamp > now.startOf('month').valueOf()
  ).length
  const lastMonth = articles.filter(
    article =>
      article.timestamp > now.subtract(1, 'month').startOf('month').valueOf() &&
      article.timestamp <= now.subtract(1, 'month').valueOf()
  ).length

  const stats: ReadingListPageProps['stats'] = {
    oldest: formatDate(articles[articles.length - 1].timestamp),
    week: thisWeek,
    month: thisMonth,
    total: articles.length,
    lastWeekPct: lastWeek === 0 ? 0 : (100 * (thisWeek - lastWeek)) / lastWeek,
    lastMonthPct:
      lastMonth === 0 ? 0 : (100 * (thisMonth - lastMonth)) / lastMonth
  }
  const hash = crypto.createHash('sha256')
  hash.update(JSON.stringify(stats))
  const cacheBustingID = b64.urlSafe(hash.digest('base64')).replace(/=/g, '')
  await renderReadingListOpenGraphImage({
    stats,
    readList
  })
  return {
    props: {
      stats,
      readList,
      cacheBustingID
    }
  }
}

export default ReadingListPage

// --

export interface ReadingListStatsProps extends BoxProps {
  stats: ReadingListPageProps['stats']
  readList: GroupedReadingList
}

export const ReadingListStats: React.FC<ReadingListStatsProps> = ({
  stats,
  // readList,
  ...props
}) => {
  // const calendarData = Object.keys(readList).map(day => {
  //   return {
  //     day: dayjs(day).format('YYYY-MM-DD'),
  //     value: readList[day].length
  //   }
  // })
  // const bgColor = useColorModeValue('white', theme.colors.gray[900])
  // const calendarColors = useColorModeValue(
  //   [
  //     theme.colors.accent[100],
  //     theme.colors.accent[200],
  //     theme.colors.accent[300],
  //     theme.colors.accent[400],
  //     theme.colors.accent[500],
  //     theme.colors.accent[600]
  //   ],
  //   [
  //     // theme.colors.accent[900],
  //     theme.colors.accent[800],
  //     theme.colors.accent[700],
  //     theme.colors.accent[600],
  //     theme.colors.accent[500],
  //     theme.colors.accent[400]
  //   ]
  // )
  return (
    <StatGroup {...props}>
      <Stat flex={2} ml={2}>
        <StatLabel>Articles Read</StatLabel>
        <StatNumber fontSize="4xl">{formatStatNumber(stats.total)}</StatNumber>
        <StatHelpText fontSize="xs">Since {stats.oldest}</StatHelpText>
      </Stat>
      <Stat textAlign="center">
        <StatLabel>This Week</StatLabel>
        <StatNumber>{stats.week}</StatNumber>
        {stats.lastWeekPct !== 0 && (
          <StatHelpText
            fontSize="xs"
            color={useColorModeValue(
              stats.lastWeekPct > 0 ? 'green.500' : 'red.500',
              stats.lastWeekPct > 0 ? 'green.400' : 'red.400'
            )}
          >
            <StatArrow type={stats.lastWeekPct > 0 ? 'increase' : 'decrease'} />
            {formatStatNumber(stats.lastWeekPct, {
              signDisplay: 'exceptZero'
            })}
            %
          </StatHelpText>
        )}
      </Stat>
      <Stat textAlign="center">
        <StatLabel>This Month</StatLabel>
        <StatNumber>{stats.month}</StatNumber>
        {stats.lastMonthPct !== 0 && (
          <StatHelpText
            fontSize="xs"
            color={useColorModeValue(
              stats.lastMonthPct > 0 ? 'green.600' : 'red.600',
              stats.lastMonthPct > 0 ? 'green.400' : 'red.400'
            )}
          >
            <StatArrow
              type={stats.lastMonthPct > 0 ? 'increase' : 'decrease'}
            />
            {formatStatNumber(stats.lastMonthPct, {
              signDisplay: 'exceptZero'
            })}
            %
          </StatHelpText>
        )}
      </Stat>
    </StatGroup>
  )
}
