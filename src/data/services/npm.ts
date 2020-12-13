import dayjs from 'dayjs'
import axios from 'axios'
import type { NpmPackageStatsData } from 'src/components/embeds/npm/NpmPackageStats'

export type DataType = NpmPackageStatsData

async function getStatPoint(
  pkg: string,
  point: 'last-week' | 'last-month' | 'last-year'
): Promise<number> {
  const url = `https://api.npmjs.org/downloads/point/${point}/${pkg}`
  const res = await axios.get(url)
  return res.data.downloads
}

interface RangeResponse {
  downloads: Array<{
    downloads: number
    day: string
  }>
}

async function getLastNDays(
  pkg: string,
  n: number
): Promise<{ downloads: number[]; date: string }> {
  const start = dayjs().subtract(n, 'day').format('YYYY-MM-DD')
  const end = dayjs().subtract(1, 'day').endOf('day').format('YYYY-MM-DD')
  const url = `https://api.npmjs.org/downloads/range/${start}:${end}/${pkg}`
  const res = await axios.get<RangeResponse>(url)
  return {
    downloads: res.data.downloads.map(d => d.downloads),
    date: end
  }
}

async function getAllTime(pkg: string): Promise<number> {
  let downloads: number = 0
  const now = dayjs()
  let start = dayjs('2015-01-10') // NPM stats epoch
  let end = start.add(18, 'month')
  while (start.isBefore(now)) {
    const url = `https://api.npmjs.org/downloads/range/${start.format(
      'YYYY-MM-DD'
    )}:${end.format('YYYY-MM-DD')}/${pkg}`
    const res = await axios.get<RangeResponse>(url)
    downloads += res.data.downloads.reduce((sum, d) => sum + d.downloads, 0)
    start = end
    end = start.add(18, 'month')
  }
  return downloads
}

async function fetchPackage(pkg: string): Promise<NpmPackageStatsData> {
  const { downloads: last30Days, date: lastDate } = await getLastNDays(pkg, 30)
  return {
    packageName: pkg,
    lastWeek: await getStatPoint(pkg, 'last-week'),
    lastMonth: await getStatPoint(pkg, 'last-month'),
    lastYear: await getStatPoint(pkg, 'last-year'),
    allTime: await getAllTime(pkg),
    lastDate,
    last30Days
  }
}

export async function fetch(
  packages: string[]
): Promise<[string, NpmPackageStatsData][]> {
  const data = await Promise.all(packages.map(pkg => fetchPackage(pkg)))
  return packages.map((pkg, i) => [pkg, data[i]])
}
