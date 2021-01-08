import { useURL } from './useURL'
import { useDNT } from './useDNT'

export function useUTMLink(url: string, path: string = '/') {
  const urlObj = new URL(url)
  if (!useDNT()) {
    urlObj.searchParams.set('utm_source', useURL(path))
  }
  return urlObj.toString()
}
