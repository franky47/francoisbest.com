import Link from 'next/link'
import React from 'react'
import { readTagsManifest } from '../cache'
import { EntryListItem } from '../components/entry-list-item'
import { Tag } from '../components/tag'
import { H2 } from '../components/typography'
import { colors, font, spacing } from '../theme'

type IndexPageProps = {
  mountPath: string
}

export default async function IndexPage({ mountPath }: IndexPageProps) {
  const manifest = await readTagsManifest()
  if (!manifest.success) {
    return <section style={{ padding: spacing[4] }}>Empty cache</section>
  }
  const { items } = manifest.data
  if (Object.keys(items).length === 0) {
    return <section style={{ padding: spacing[4] }}>Empty cache</section>
  }
  const tags = Object.entries(items).filter(([key]) => !key.startsWith('/'))
  const pages = Object.entries(items).filter(([key]) => key.startsWith('/'))
  const entries = Array.from(
    new Set(Object.values(items).flatMap(({ keys }) => keys)),
  )

  return (
    <section>
      <H2>Tags</H2>
      <ul>
        {tags.map(([key, { keys }]) => (
          <li key={key}>
            <Link href={`${mountPath}/tag/${encodeURIComponent(key)}`}>
              <Tag style={{ fontSize: font.xs }}>{key}</Tag>
            </Link>{' '}
            <span
              style={{
                fontSize: font.xs,
                fontStyle: 'italic',
                color: colors.gray[500],
              }}
            >
              ({keys.length} {keys.length > 1 ? 'entries' : 'entry'})
            </span>
          </li>
        ))}
      </ul>
      <H2>Pages</H2>
      <ul>
        {pages.map(([key, { keys }]) => (
          <li key={key}>
            <Link href={`${mountPath}/tag/${encodeURIComponent(key)}`}>
              <code style={{ fontSize: font.xs }}>{key}</code>
            </Link>{' '}
            <span
              style={{
                fontSize: font.xs,
                fontStyle: 'italic',
                color: colors.gray[500],
              }}
            >
              ({keys.length} {keys.length > 1 ? 'entries' : 'entry'})
            </span>
          </li>
        ))}
      </ul>
      <H2>All Entries</H2>
      <ul style={{ overflowX: 'auto', paddingBlock: spacing[1] }}>
        {entries.map(id => (
          <EntryListItem
            key={id}
            id={id}
            mountPath={mountPath}
            style={{ marginBottom: spacing[1] }}
          />
        ))}
      </ul>
    </section>
  )
}
