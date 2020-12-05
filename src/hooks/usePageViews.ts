import React from 'react'
// @ts-ignore
import countAPI from 'countapi-js'
import { useRouter } from 'next/router'

export function usePageParams(path?: string) {
  const router = useRouter()
  const pathname = path || router.pathname
  const key = pathname.slice('/posts/20'.length, 64).replace(/\//g, '_')
  const host =
    process.env.NEXT_PUBLIC_DEPLOYMENT_URL?.replace('https://', '') ??
    window.location.hostname
  const namespace = `views.${host}`
  console.dir({ namespace, key })
  return { namespace, key }
}

interface CountAPIResult {
  value: number | null
}

export function usePageViews(path?: string): number | undefined {
  const [views, setViews] = React.useState<number | undefined>(0)
  const { namespace, key } = usePageParams(path)
  React.useEffect(() => {
    if (path?.startsWith('/posts/drafts')) {
      return
    }
    countAPI
      .get(namespace, key)
      .then((result: CountAPIResult) => setViews(result.value ?? undefined))
  }, [namespace, key])
  return views
}

export function useCountPageView(path?: string) {
  const [views, setViews] = React.useState<number | undefined>(0)
  const { namespace, key } = usePageParams(path)
  React.useEffect(() => {
    if (path?.startsWith('/posts/drafts')) {
      return
    }
    if (process.env.NODE_ENV !== 'production') {
      // Read-only
      countAPI
        .get(namespace, key)
        .then((result: CountAPIResult) => setViews(result.value ?? undefined))
      return
    }
    countAPI
      .hit(namespace, key)
      .then((result: CountAPIResult) => setViews(result.value ?? undefined))
  }, [namespace, key])
  return views
}
