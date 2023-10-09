import { readTagsManifest } from '../cache'
import { EntryListItem } from '../components/entry-list-item'
import { Tag } from '../components/tag'

type TagPageProps = {
  mountPath: string
  tag: string
}

export default async function IndexPage({ mountPath, tag }: TagPageProps) {
  const manifest = await readTagsManifest()
  if (!manifest.success) {
    return <main className="p-4">No entries</main>
  }
  const { items } = manifest.data
  if (Object.keys(items).length === 0) {
    return <main className="p-4">No entries</main>
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
      <h2 className="my-4 text-xl font-bold">
        Entries tagged <Tag>{tag}</Tag>
      </h2>
      <ul className="space-y-0.5 overflow-auto">
        {entries.map(id => (
          <EntryListItem key={id} id={id} mountPath={mountPath} />
        ))}
      </ul>
    </>
  )
}
