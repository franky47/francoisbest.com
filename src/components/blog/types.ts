export interface AlsoPublishedOn {
  name: string
  url: string
}

export interface ArticleMeta {
  title: string
  publicationDate?: string
  preview?: () => JSX.Element
  tags?: string[]
  alsoPublishedOn?: AlsoPublishedOn[]
}
