import Link from 'next/link'
import prettyBytes from 'pretty-bytes'
import prettyMs from 'pretty-ms'
import React from 'react'
import { readCacheEntry } from '../cache'
import { Tag } from '../components/tag'
import { H2 } from '../components/typography'
import { colors, font, spacing } from '../theme'

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
      <H2>Cache Entry</H2>
      <section
        style={{
          display: 'grid',
          alignItems: 'baseline',
          gap: '0.25rem 1rem',
          gridTemplateColumns: '6rem 1fr',
        }}
      >
        <span>Key</span>
        <code
          style={{
            fontSize: font.sm,
            color: colors.gray[500],
          }}
        >
          {params.id}
        </code>
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
            <div style={{ fontSize: font.xs, display: 'flex', gap: '0.5rem' }}>
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
            <span title={`${entry.revalidate} seconds`}>
              {prettyMs(entry.revalidate! * 1000, { verbose: true })}
            </span>
          </>
        )}
        {entry.data.headers.date && (
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
          <H2
            style={{
              display: 'inline-block',
            }}
          >
            Headers
          </H2>
        </summary>
        <table
          style={{
            display: 'table',
            tableLayout: 'auto',
            textAlign: 'left',
          }}
        >
          <thead>
            <tr>
              <th>Name</th>
              <th style={{ paddingLeft: spacing[4] }}>Value</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(entry.data.headers).map(([key, value]) => (
              <tr
                key={key}
                style={{
                  borderTop: `1px solid ${colors.border}`,
                }}
              >
                <td
                  style={{
                    whiteSpace: 'nowrap',
                    paddingBottom: spacing[1],
                  }}
                >
                  <code
                    style={{
                      fontSize: font.xs,
                      color: colors.gray[500],
                    }}
                  >
                    {key}
                  </code>
                </td>
                <td
                  style={{
                    paddingLeft: spacing[4],
                    paddingBottom: spacing[1],
                    whiteSpace: 'break-spaces',
                  }}
                >
                  <code style={{ fontSize: font.xs }}>{value}</code>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </details>
      <details open>
        <summary>
          <H2
            style={{
              display: 'inline-block',
            }}
          >
            Content
          </H2>
        </summary>
        {entry.data.headers['content-type']?.startsWith('application/json') ? (
          <JSONContent value={entry.data.body} />
        ) : entry.data.headers['content-type']?.startsWith('text/html') ? (
          <HTMLContent value={entry.data.body} />
        ) : (
          <pre style={{ fontSize: font.xs }}>{entry.data.body}</pre>
        )}
      </details>
    </>
  )
}

function StatusTag({ status }: { status: number }) {
  const fixedHash =
    status >= 500
      ? 0x05
      : status >= 400
      ? 0x0c
      : status > 300
      ? 0x01
      : status >= 200
      ? 0x03
      : 0xff
  return (
    <Tag style={{ fontSize: font.sm, fontWeight: 600 }} fixedHash={fixedHash}>
      {status.toString()}
    </Tag>
  )
}

function JSONContent({ value }: { value: string }) {
  return (
    <pre style={{ fontSize: font.xs }}>
      {JSON.stringify(JSON.parse(value), null, 2)}
    </pre>
  )
}

function HTMLContent({ value }: { value: string }) {
  return (
    <>
      <pre style={{ marginBottom: spacing[4], fontSize: font.xs }}>{value}</pre>
      <iframe srcDoc={value} style={{ width: '100%', height: '24rem' }} />
    </>
  )
}
