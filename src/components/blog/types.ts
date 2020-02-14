export interface AlsoPublishedOn {
  name: string
  url: string
}

export interface ArticleMeta {
  title: string
  publicationDate?: Date // null for drafts
  preview?: () => JSX.Element
  tags?: string[]
  alsoPublishedOn?: AlsoPublishedOn[]
}
