import React from 'react'
import { readTagsManifest } from '../cache'
import { EntryListItem } from '../components/entry-list-item'
import { Tag } from '../components/tag'
import { H2 } from '../components/typography'
import { spacing } from '../theme'

type TagPageProps = {
  mountPath: string
  tag: string
}

export default async function IndexPage({ mountPath, tag }: TagPageProps) {
  const manifest = await readTagsManifest()
  if (!manifest.success) {
    return <section style={{ padding: spacing[4] }}>No entries</section>
  }
  const { items } = manifest.data
  if (Object.keys(items).length === 0) {
    return <section style={{ padding: spacing[4] }}>No entries</section>
  }
  const entries = Array.from(
    new Set(
      Object.entries(items)
        .filter(([key]) => key === tag)
        .flatMap(([, v]) => v.keys),
    ),
  )

  return (
    <>
      <H2>
        Entries tagged <Tag>{tag}</Tag>
      </H2>
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
    </>
  )
}
