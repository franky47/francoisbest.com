import Link from 'next/link'
import { notFound } from 'next/navigation'

export type CacheExplorerCatchAllPageProps = {
  mountPath: string
  params: {
    slug: string[]
  }
}

export default async function CacheExplorerRouter({
  mountPath,
  params,
}: CacheExplorerCatchAllPageProps) {
  const path = (params.slug ?? []).join('/')
  if (path === '') {
    const IndexPage = (await import('./pages/index')).default
    return (
      <Layout mountPath={mountPath}>
        <IndexPage mountPath={mountPath} />
      </Layout>
    )
  }
  if (path.startsWith('entry/')) {
    const EntryPage = (await import('./pages/entry')).default
    return (
      <Layout mountPath={mountPath}>
        <EntryPage
          mountPath={mountPath}
          params={{ id: path.slice('entry/'.length) }}
        />
      </Layout>
    )
  }
  if (path.startsWith('tag/')) {
    const TagPage = (await import('./pages/tag')).default
    return (
      <Layout mountPath={mountPath}>
        <TagPage
          mountPath={mountPath}
          tag={decodeURIComponent(path.slice('tag/'.length))}
        />
      </Layout>
    )
  }
  if (path === 'disabled') {
    const DisabledPage = (await import('./pages/disabled')).default
    return <DisabledPage />
  }
  return notFound()
}

type LayoutProps = {
  mountPath: string
  children: React.ReactNode
}

function Layout({ children, mountPath }: LayoutProps) {
  return (
    <main className="p-4">
      <h1 className="mb-4 text-2xl font-bold">
        <Link href={mountPath}>Next.js Cache Explorer</Link>{' '}
        <span className="font-mono text-xs font-normal text-gray-500">
          v0.0.1
        </span>
      </h1>
      {children}
    </main>
  )
}
