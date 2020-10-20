import path from 'path'
import { Services } from './services'

export type ServicePaths = { [k in Services]: string }

export const STORAGE_DIR = path.resolve(process.cwd(), '.storage')

export const SERVICE_DIRS: ServicePaths = {
  npm: path.resolve(STORAGE_DIR, 'npm'),
  github: path.resolve(STORAGE_DIR, 'github'),
  spotify: path.resolve(STORAGE_DIR, 'spotify'),
  twitter: path.resolve(STORAGE_DIR, 'twitter'),
  unsplash: path.resolve(STORAGE_DIR, 'unsplash')
}

export const FETCHLISTS_DIR = path.resolve(
  process.cwd(),
  './src/data/fetchlists'
)

export const FETCHLIST_PATHS: ServicePaths = {
  npm: path.resolve(FETCHLISTS_DIR, 'npm.txt'),
  github: path.resolve(FETCHLISTS_DIR, 'github.txt'),
  spotify: path.resolve(FETCHLISTS_DIR, 'spotify.txt'),
  twitter: path.resolve(FETCHLISTS_DIR, 'twitter.txt'),
  unsplash: path.resolve(FETCHLISTS_DIR, 'unsplash.txt')
}
