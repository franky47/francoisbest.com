import dayjs from 'dayjs'

export type NpmPackageStatsData = {
  packageName: string
  url: string
  lastWeek: number
  lastMonth: number
  lastYear: number
  allTime: number
  last30Days: number[]
  lastDate: string
}

// const regexp = /https:\/\/npmjs\.com\/package\/([\w.-]+|@[\w.-]+\/[\w.-]+)/gm

async function getStatPoint(
  pkg: string,
  point: 'last-week' | 'last-month' | 'last-year'
): Promise<number> {
  const url = `https://api.npmjs.org/downloads/point/${point}/${pkg}`
  const data = await get(url)
  return data.downloads
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
  const start = dayjs().subtract(n, 'day').format('YYYY-MM-DD')
  const end = dayjs().subtract(1, 'day').endOf('day').format('YYYY-MM-DD')
  const url = `https://api.npmjs.org/downloads/range/${start}:${end}/${pkg}`
  const { downloads } = await get<RangeResponse>(url)
  return {
    downloads: downloads.map(d => d.downloads),
    date: end,
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
    const res = await get<RangeResponse>(url)
    downloads += res.downloads.reduce((sum, d) => sum + d.downloads, 0)
    start = end
    end = start.add(18, 'month')
  }
  return downloads
}

export async function fetchNpmPackage(
  pkg: string
): Promise<NpmPackageStatsData> {
  const { downloads: last30Days, date: lastDate } = await getLastNDays(pkg, 30)
  return {
    packageName: pkg,
    url: `https://npmjs.com/package/${pkg}`,
    lastWeek: await getStatPoint(pkg, 'last-week'),
    lastMonth: await getStatPoint(pkg, 'last-month'),
    lastYear: await getStatPoint(pkg, 'last-year'),
    allTime: await getAllTime(pkg),
    lastDate,
    last30Days,
  }
}

// export async function fetch(urls: string[]): Promise<DataRecord<DataType>> {
//   const data = await Promise.all(
//     urls.map(url => fetchPackage(getPackageName(url)))
//   )
//   console.dir(data, { depth: null })
//   return urls.reduce((record, url) => {
//     const packageName = getPackageName(url)
//     const packageData = data.find(pkg => pkg.packageName === packageName)
//     console.dir({ url, packageName, packageData })
//     return {
//       ...record,
//       [url]: safetifyData(packageData),
//     }
//   }, {})
// }

// function getPackageName(url: string) {
//   return url.replace('https://npmjs.com/package/', '')
// }

async function get<T = any>(url: string) {
  const res = await fetch(url)
  return (await res.json()) as T
}
