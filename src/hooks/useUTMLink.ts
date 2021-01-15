import { useURL } from './useURL'
import { useDNT } from './useDNT'

export interface UTMParams {
  source: string
}

export function useUTMLink(url: string, params: UTMParams) {
  const urlObj = new URL(url)
  if (!useDNT()) {
    urlObj.searchParams.set('utm_source', params.source)
  }
  return urlObj.toString()
}

export function useUTMPathLink(url: string, path: string = '/') {
  return useUTMLink(url, { source: useURL(path) })
}
