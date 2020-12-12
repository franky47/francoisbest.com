import React from 'react'
// @ts-ignore
import countAPI from 'countapi-js'
import { useRouter } from 'next/router'

export function formatPageViewsParams(path: string) {
  const key = path.slice('/posts/20'.length, 64).replace(/\//g, '_')
  const host =
    process.env.NEXT_PUBLIC_DEPLOYMENT_URL?.replace('https://', '') ??
    window.location.hostname
  const namespace = `views.${host}`
  return { namespace, key }
}

export function usePageParams(path?: string) {
  const router = useRouter()
  const pathname = path || router.pathname
  return formatPageViewsParams(pathname)
}

export interface CountAPIResult {
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
    // Read-only in development, count only in production
    const method =
      process.env.NODE_ENV === 'production' ? countAPI.hit : countAPI.get
    method
      .call(countAPI, namespace, key)
      .then((result: CountAPIResult) => setViews(result.value ?? undefined))
  }, [namespace, key])
  return views
}
