import { Temporal } from '@js-temporal/polyfill'
import 'server-only'

const NPM_API_URL = process.env.NPM_API_URL || 'https://api.npmjs.org'

export type NpmPackageStatsData = {
  packageName: string
  url: string
  allTime: number
  last30Days: number[]
  versions: Record<string, number>
  lastDate: Date
  updatedAt: Date
}

type RangeResponse = {
  downloads: Array<{
    downloads: number
    day: string
  }>
}

async function getLastNDays(
  pkg: string,
  n: number
): Promise<{ downloads: number[]; date: string }> {
  const today = Temporal.Now.plainDateISO()
  const start = today.subtract({ days: n }).toString()
  const end = today.subtract({ days: 1 }).toString()
  const url = `${NPM_API_URL}/downloads/range/${start}:${end}/${pkg}`
  const { downloads } = await get<RangeResponse>(url)
  return {
    downloads: downloads.map(d => d.downloads),
    date: end
  }
}

type PointResponse = {
  downloads: number
}

async function getAllTime(pkg: string): Promise<number> {
  let downloads: number = 0
  const now = Temporal.Now.plainDateISO()
  let start = Temporal.PlainDate.from('2015-01-10') // NPM stats epoch
  let end = start.add({ months: 18 })
  while (Temporal.PlainDate.compare(start, now) < 0) {
    const clampedEnd = Temporal.PlainDate.compare(end, now) > 0 ? now : end
    const url = `${NPM_API_URL}/downloads/point/${start.toString()}:${clampedEnd.toString()}/${pkg}`
    const res = await get<PointResponse | null>(url, 3, [404])
    downloads += res?.downloads ?? 0
    start = end
    end = start.add({ months: 18 })
  }
  return downloads
}

async function getVersions(pkg: string): Promise<Record<string, number>> {
  type VersionsReponse = {
    downloads: Record<string, number>
  }
  const url = `${NPM_API_URL}/versions/${encodeURIComponent(pkg)}/last-week`
  const { downloads } = await get<VersionsReponse>(url)
  return Object.fromEntries(
    Object.entries(downloads).sort(([, a], [, b]) => (a < b ? 1 : -1))
  )
}

export async function fetchNpmPackage(
  pkg: string
): Promise<NpmPackageStatsData> {
  const [allTime, { downloads: last30Days, date: lastDate }, versions] =
    await Promise.all([getAllTime(pkg), getLastNDays(pkg, 30), getVersions(pkg)])
  return {
    packageName: pkg,
    url: `https://npmjs.com/package/${pkg}`,
    versions,
    allTime,
    lastDate: new Date(lastDate),
    last30Days,
    updatedAt: new Date()
  }
}

// Bulk API types
type BulkPointResponse = Record<string, PointResponse>
type BulkRangeResponse = Record<string, RangeResponse>

async function getAllTimeBulk(
  packages: string[]
): Promise<Record<string, number>> {
  const totals: Record<string, number> = Object.fromEntries(
    packages.map(pkg => [pkg, 0])
  )
  const now = Temporal.Now.plainDateISO()
  let start = Temporal.PlainDate.from('2015-01-10')
  let end = start.add({ days: 365 })
  const slug = packages.join(',')
  while (Temporal.PlainDate.compare(start, now) < 0) {
    const clampedEnd = Temporal.PlainDate.compare(end, now) > 0 ? now : end
    const url = `${NPM_API_URL}/downloads/point/${start.toString()}:${clampedEnd.toString()}/${slug}`
    const res = await get<BulkPointResponse | null>(url, 3, [404])
    if (res) {
      for (const pkg of packages) {
        totals[pkg] += res[pkg]?.downloads ?? 0
      }
    }
    start = end
    end = start.add({ days: 365 })
  }
  return totals
}

async function getLastNDaysBulk(
  packages: string[],
  n: number
): Promise<Record<string, { downloads: number[]; date: string }>> {
  const today = Temporal.Now.plainDateISO()
  const start = today.subtract({ days: n }).toString()
  const end = today.subtract({ days: 1 }).toString()
  const slug = packages.join(',')
  const url = `${NPM_API_URL}/downloads/range/${start}:${end}/${slug}`
  const res = await get<BulkRangeResponse>(url)
  const result: Record<string, { downloads: number[]; date: string }> = {}
  for (const pkg of packages) {
    const data = res[pkg]
    result[pkg] = {
      downloads: data?.downloads.map(d => d.downloads) ?? [],
      date: end
    }
  }
  return result
}

export async function fetchAllNpmPackages(
  packages: string[]
): Promise<Record<string, NpmPackageStatsData>> {
  // NPM bulk API doesn't support scoped packages — split them out
  const unscoped = packages.filter(p => !p.startsWith('@'))
  const scoped = packages.filter(p => p.startsWith('@'))

  const [
    bulkAllTime,
    bulkLast30Days,
    scopedResults,
    versionsEntries
  ] = await Promise.all([
    unscoped.length > 0
      ? getAllTimeBulk(unscoped)
      : Promise.resolve({} as Record<string, number>),
    unscoped.length > 0
      ? getLastNDaysBulk(unscoped, 30)
      : Promise.resolve(
          {} as Record<string, { downloads: number[]; date: string }>
        ),
    Promise.all(
      scoped.map(async pkg => {
        const [allTime, last30Days] = await Promise.all([
          getAllTime(pkg),
          getLastNDays(pkg, 30)
        ])
        return [pkg, { allTime, last30Days }] as const
      })
    ),
    Promise.all(
      packages.map(pkg => getVersions(pkg).then(v => [pkg, v] as const))
    )
  ])

  const scopedMap = Object.fromEntries(scopedResults)
  const versionsMap = Object.fromEntries(versionsEntries)
  const result: Record<string, NpmPackageStatsData> = {}
  for (const pkg of packages) {
    let allTime: number
    let last30Days: number[]
    let lastDate: string
    if (pkg.startsWith('@')) {
      allTime = scopedMap[pkg].allTime
      last30Days = scopedMap[pkg].last30Days.downloads
      lastDate = scopedMap[pkg].last30Days.date
    } else {
      allTime = bulkAllTime[pkg]
      const data = bulkLast30Days[pkg]
      last30Days = data.downloads
      lastDate = data.date
    }
    result[pkg] = {
      packageName: pkg,
      url: `https://npmjs.com/package/${pkg}`,
      allTime,
      last30Days,
      versions: versionsMap[pkg],
      lastDate: new Date(lastDate),
      updatedAt: new Date()
    }
  }
  return result
}

async function get<T = unknown>(
  url: string,
  retries = 3,
  nullOnStatus: number[] = []
): Promise<T> {
  let lastError: unknown
  for (let attempt = 0; attempt < retries; attempt++) {
    let responseText = ''
    try {
      const res = await fetch(url, {
        next: { revalidate: 86_400, tags: ['npm'] }
      })
      responseText = await res.text()
      if (!res.ok) {
        if (nullOnStatus.includes(res.status)) {
          return null as T
        }
        const isRetryable = res.status === 429 || res.status >= 500
        if (isRetryable && attempt < retries - 1) {
          const delay = 500 * Math.pow(2, attempt)
          await new Promise(resolve => setTimeout(resolve, delay))
          continue
        }
        throw new Error(
          `NPM API ${res.status} for ${url}\n\n${responseText}`
        )
      }
      return JSON.parse(responseText) as T
    } catch (error) {
      lastError = error
      if (error instanceof Error && error.message.startsWith('NPM API')) {
        throw error
      }
      if (attempt < retries - 1) {
        const delay = 500 * Math.pow(2, attempt)
        await new Promise(resolve => setTimeout(resolve, delay))
        continue
      }
      throw new Error(
        `Failed to fetch ${url}: ${String(error)}\n\n${responseText}`,
        { cause: error }
      )
    }
  }
  throw lastError
}
