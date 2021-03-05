// @ts-ignore
import countAPI from 'countapi-js'
import { formatPageViewsParams } from 'src/hooks/usePageViews'
import { ExtendedPostFrontMatter } from 'src/types'

interface CountAPIInfoResult {
  status: number
  path: string
  namespace: string
  key: string
  ttl: number
  created: number
  update_lowerbound: number
  update_upperbound: number
  enable_reset: boolean
  value: number
}

async function isTTLGoingToExpire(
  namespace: string,
  key: string,
  deadlineMs: number = 2 * 24 * 60 * 60 * 1000 // next 2 days
) {
  const info: CountAPIInfoResult = await countAPI.info(namespace, key)
  return info.status === 200 && info.ttl < deadlineMs
}

async function refreshPostViews(path: string) {
  const { namespace, key } = formatPageViewsParams(path)
  if (await isTTLGoingToExpire(namespace, key)) {
    await countAPI.hit(namespace, key)
  }
}

export async function refreshPageViews(posts: ExtendedPostFrontMatter[]) {
  await Promise.all(
    posts
      .filter(post => post.publicationDate)
      .map(post => refreshPostViews(post.path))
  ).catch(console.error)
}
