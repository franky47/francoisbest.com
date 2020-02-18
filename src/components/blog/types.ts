export interface AlsoPublishedOn {
  name: string
  url: string
}

export interface ArticleMeta {
  title: string
  summary: string
  publicationDate?: string
  tags?: string[]
  alsoPublishedOn?: AlsoPublishedOn[]
}
