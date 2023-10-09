import Link from 'next/link'
import { readTagsManifest } from '../cache'
import { EntryListItem } from '../components/entry-list-item'
import { Tag } from '../components/tag'

type IndexPageProps = {
  mountPath: string
}

export default async function IndexPage({ mountPath }: IndexPageProps) {
  const manifest = await readTagsManifest()
  if (!manifest.success) {
    return <main className="p-4">Empty cache</main>
  }
  const { items } = manifest.data
  if (Object.keys(items).length === 0) {
    return <main className="p-4">Empty cache</main>
  }
  const tags = Object.entries(items).filter(([key]) => !key.startsWith('/'))
  const pages = Object.entries(items).filter(([key]) => key.startsWith('/'))
  const entries = Array.from(
    new Set(Object.values(items).flatMap(({ keys }) => keys)),
  )

  return (
    <>
      <h2 className="my-4 text-xl font-bold">Tags</h2>
      <ul>
        {tags.map(([key, { keys }]) => (
          <li key={key}>
            <Link href={`${mountPath}/tag/${encodeURIComponent(key)}`}>
              <Tag className="text-xs">{key}</Tag>
            </Link>{' '}
            <span className="text-xs italic text-gray-500">
              ({keys.length} {keys.length > 1 ? 'entries' : 'entry'})
            </span>
          </li>
        ))}
      </ul>
      <h2 className="my-4 text-xl font-bold">Pages</h2>
      <ul>
        {pages.map(([key, { keys }]) => (
          <li key={key}>
            <Link href={`${mountPath}/tag/${encodeURIComponent(key)}`}>
              <code className="text-xs">{key}</code>
            </Link>{' '}
            <span className="text-xs italic text-gray-500">
              ({keys.length} {keys.length > 1 ? 'entries' : 'entry'})
            </span>
          </li>
        ))}
      </ul>
      <h2 className="my-4 text-xl font-bold">All Entries</h2>
      <ul className="overflow-auto">
        {entries.map(id => (
          <EntryListItem key={id} id={id} mountPath={mountPath} />
        ))}
      </ul>
    </>
  )
}
