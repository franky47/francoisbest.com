import * as npm from './npm'
import * as github from './github'
import * as spotify from './spotify'
import * as twitter from './twitter'
import * as unsplash from './unsplash'

export type Services = 'npm' | 'github' | 'spotify' | 'twitter' | 'unsplash'

export type ServiceFetchFn<T> = (contentIDs: string[]) => Promise<[string, T][]>

export type ServiceMap = {
  [key in Services]: {
    fetch: ServiceFetchFn<any>
    safeContentID?: (rawContentID: string) => string
  }
}

export const services: ServiceMap = {
  npm,
  github,
  spotify,
  twitter,
  unsplash
}
