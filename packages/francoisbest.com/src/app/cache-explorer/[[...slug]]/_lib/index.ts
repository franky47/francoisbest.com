import DisabledPage from './pages/disabled'
import CacheExplorerRouter, { CacheExplorerCatchAllPageProps } from './router'

type Options = {
  mountPath?: string
  enabled?: boolean
}

export function createCacheExplorerPage({
  enabled = process.env.NODE_ENV !== 'production' ||
    process.env.CACHE_EXPLORER === 'true',
  mountPath = '/cache-explorer',
}: Options = {}) {
  if (!enabled) {
    return DisabledPage
  }
  return (props: Omit<CacheExplorerCatchAllPageProps, 'mountPath'>) =>
    CacheExplorerRouter({ mountPath, ...props })
}
