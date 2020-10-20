import type { Services } from 'src/data/services'

export function useStaticData<T>(service: Services, contentID: string) {
  const json = require(`../../.storage/${service}/${contentID}.json`)
  return json as T
}
