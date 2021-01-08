import crypto from 'crypto'
import { b64 } from '@47ng/codec'
import dayjs from 'dayjs'
import isoWeek from 'dayjs/plugin/isoWeek'
import { formatDate } from 'src/ui/format'
import { Article, GroupedReadingList } from './defs'
import { ReadingListStatsData } from './Stats'

export function decodeArticle(article: Article): Article {
  for (const key of Object.keys(article) as (keyof Article)[]) {
    if (typeof article[key] !== 'string') {
      continue
    }
    // @ts-ignore
    article[key] = decodeURIComponent(article[key])
  }
  return article
}

// --

export async function fetchArticles(): Promise<GroupedReadingList> {
  const Gitrows = require('gitrows')
  const gitrows = new Gitrows()
  const allArticles: Article[] = (
    (await gitrows.get(process.env.READING_LIST_CSV_URL)) ?? []
  )
    .map(decodeArticle)
    .reverse()
  const articles = allArticles.reduce(
    (list: GroupedReadingList, article: Article) => {
      const date = formatDate(article.timestamp)
      return {
        ...list,
        [date]: [...(list[date] ?? []), article]
      }
    },
    {}
  )
  return articles
}

// --

export function filterArticles(
  articles: GroupedReadingList,
  filterFn: (article: Article) => boolean
): GroupedReadingList {
  return Object.fromEntries(
    Object.entries(articles)
      .map(([day, articles]) => {
        return [day, articles.filter(filterFn)]
      })
      .filter(([_, articles]) => articles.length > 0)
  )
}

// --

export function computeStats(
  readingList: GroupedReadingList,
  now = dayjs()
): ReadingListStatsData {
  dayjs.extend(isoWeek)
  const articles = Object.values(readingList).flat()
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

  const stats = {
    oldest: formatDate(articles[articles.length - 1].timestamp),
    week: thisWeek,
    month: thisMonth,
    total: articles.length,
    lastWeekPct: lastWeek === 0 ? 0 : (100 * (thisWeek - lastWeek)) / lastWeek,
    lastMonthPct:
      lastMonth === 0 ? 0 : (100 * (thisMonth - lastMonth)) / lastMonth
  }
  return stats
}

// --

export function getOpenGraphImageHash(stats: ReadingListStatsData) {
  const hash = crypto.createHash('sha256')
  hash.update(JSON.stringify(stats))
  return b64.urlSafe(hash.digest('base64')).replace(/=/g, '')
}
