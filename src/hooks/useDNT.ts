export function useDNT() {
  if (typeof navigator === 'undefined') {
    // SSG
    return false
  }
  return navigator.doNotTrack === '1'
}
