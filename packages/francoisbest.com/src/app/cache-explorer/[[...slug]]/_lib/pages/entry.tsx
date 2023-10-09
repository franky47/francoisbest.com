import Link from 'next/link'
import prettyBytes from 'pretty-bytes'
import prettyMs from 'pretty-ms'
import { twMerge } from 'tailwind-merge'
import { readCacheEntry } from '../cache'
import { Tag } from '../components/tag'

type EntryPageProps = {
  mountPath: string
  params: {
    id: string
  }
}

export default async function EntryPage({ mountPath, params }: EntryPageProps) {
  const entry = await readCacheEntry(params.id)
  return (
    <>
      <h2 className="my-4 text-xl font-bold">Cache Entry</h2>
      <section
        className="grid items-baseline gap-x-4 gap-y-1"
        style={{ gridTemplateColumns: '6rem 1fr' }}
      >
        <span>Key</span>
        <code className="text-sm text-gray-500">{params.id}</code>
        <span>URL</span>
        <span>
          <StatusTag status={entry.data.status} />{' '}
          <a href={entry.data.url}>{entry.data.url}</a>
        </span>
        <span>Size</span>
        <span>{prettyBytes(entry.data.body.length)}</span>
        {Boolean(entry.data.tags.length) && (
          <>
            <span>Tags</span>
            <div className="space-x-2 text-xs">
              {entry.data.tags.map(tag => (
                <Link
                  key={tag}
                  href={`${mountPath}/tag/${encodeURIComponent(tag)}`}
                >
                  <Tag>{tag}</Tag>
                </Link>
              ))}
            </div>
          </>
        )}
        {Boolean(entry.revalidate) && (
          <>
            <span>Revalidate</span>
            <span>{prettyMs(entry.revalidate! * 1000, { verbose: true })}</span>
          </>
        )}
        {Boolean(entry.data.headers.date) && (
          <>
            <span>Age</span>
            <span title={new Date(entry.data.headers.date).toISOString()}>
              {prettyMs(
                new Date().valueOf() -
                  new Date(entry.data.headers.date).valueOf(),
                { verbose: true },
              )}
            </span>
          </>
        )}
      </section>
      <details open>
        <summary>
          <h2 className="my-4 inline-block text-lg font-bold">Headers</h2>
        </summary>
        <table className="table-auto text-left">
          <thead>
            <tr>
              <th>Name</th>
              <th className="pl-4">Value</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(entry.data.headers).map(([key, value]) => (
              <tr
                key={key}
                className="border-b-[1px] border-b-gray-100 last:border-b-0 dark:border-b-gray-800"
              >
                <td className="whitespace-nowrap pb-1">
                  <code className="text-xs text-gray-500">{key}</code>
                </td>
                <td className="whitespace-break-spaces pb-1 pl-4">
                  <code className="text-xs">{value}</code>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </details>

      <details open>
        <summary>
          <h2 className="my-4 inline-block text-lg font-bold">Content</h2>
        </summary>
        {entry.data.headers['content-type']?.startsWith('application/json') ? (
          <JSONContent value={entry.data.body} />
        ) : entry.data.headers['content-type']?.startsWith('text/html') ? (
          <HTMLContent value={entry.data.body} />
        ) : (
          <pre className="text-xs">{entry.data.body}</pre>
        )}
      </details>
    </>
  )
}

function StatusTag({ status }: { status: number }) {
  const color =
    status >= 500
      ? 'text-red-500'
      : status >= 400
      ? 'text-yellow-500'
      : status > 300
      ? 'text-blue-500'
      : status >= 200
      ? 'text-green-500'
      : 'text-gray-500'
  const bg =
    status >= 500
      ? 'bg-red-500/10'
      : status >= 400
      ? 'bg-yellow-500/10'
      : status > 300
      ? 'bg-blue-500/10'
      : status >= 200
      ? 'bg-green-500/10'
      : 'bg-gray-500/10'
  return (
    <Tag className={twMerge('font-body text-sm font-semibold', color, bg)}>
      {status.toString()}
    </Tag>
  )
}

function JSONContent({ value }: { value: string }) {
  return (
    <pre className="text-xs">{JSON.stringify(JSON.parse(value), null, 2)}</pre>
  )
}

function HTMLContent({ value }: { value: string }) {
  return (
    <>
      <pre className="mb-4 text-xs">{value}</pre>
      <iframe srcDoc={value} className="h-96 w-full" />
    </>
  )
}
