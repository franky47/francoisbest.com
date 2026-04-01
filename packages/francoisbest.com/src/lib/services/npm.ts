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

async function getAllTime(pkg: string): Promise<number> {
  let downloads: number = 0
  const now = Temporal.Now.plainDateISO()
  let start = Temporal.PlainDate.from('2015-01-10') // NPM stats epoch
  let end = start.add({ months: 18 })
  while (Temporal.PlainDate.compare(start, now) < 0) {
    const url = `${NPM_API_URL}/downloads/range/${start.toString()}:${end.toString()}/${pkg}`
    const res = await get<RangeResponse>(url)
    downloads += res.downloads.reduce((sum, d) => sum + d.downloads, 0)
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

async function get<T = unknown>(url: string): Promise<T> {
  let responseText = ''
  try {
    const res = await fetch(url, {
      next: {
        revalidate: 86_400,
        tags: ['npm']
      }
    })
    responseText = await res.text()
    return JSON.parse(responseText) as T
  } catch (error) {
    throw new Error(
      `Failed to fetch ${url}: ${String(error)}\n\n${responseText}`,
      {
        cause: error
      }
    )
  }
}
