import dotenv from 'dotenv'
import { services, Services } from './services'
import { readServiceFetchlist, store } from './storage'

dotenv.config()

const padWidth = Object.keys(services).reduce(
  (max, name) => Math.max(max, name.length),
  0
)

// ---

async function processService(service: Services) {
  const contentIDs = readServiceFetchlist(service)
  if (contentIDs.length === 0) {
    return
  }
  const content = await services[service].fetch(contentIDs)
  content.forEach(([contentID, data]) => store(service, contentID, data))
  console.info(`${service.padEnd(padWidth)}  Loaded ${contentIDs.length} items`)
}

// ---

async function main() {
  const specificService = Object.keys(services).includes(process.argv[2])
    ? (process.argv[2] as Services)
    : undefined

  if (specificService) {
    return await processService(specificService)
  }

  await Promise.all(
    (Object.keys(services) as Services[]).map(service =>
      processService(service)
    )
  )
}

main()
