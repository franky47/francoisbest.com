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

export type GroupedReadingList = {
  [date: string]: Article[]
}

export interface ReadingListPageProps {
  articles: GroupedReadingList
}
