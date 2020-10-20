export function injectQuery(base: string, query: object): string {
  const url = new URL(base)
  Object.entries(query).forEach(([key, value]) => {
    url.searchParams.set(key, value)
  })
  return url.toString()
}
