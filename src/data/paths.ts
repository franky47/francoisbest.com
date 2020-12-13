import path from 'path'
import { Services } from './services'

export type ServicePaths = { [k in Services]: string }

const STORAGE_DIR = path.resolve(process.cwd(), './src/data/.storage')
const FETCHLISTS_DIR = path.resolve(process.cwd(), './src/data/fetchlists')
export const MANIFESTS_DIR = path.resolve(STORAGE_DIR, 'manifests')

export const SERVICE_DIRS: ServicePaths = {
  npm: path.resolve(STORAGE_DIR, 'npm'),
  github: path.resolve(STORAGE_DIR, 'github'),
  spotify: path.resolve(STORAGE_DIR, 'spotify'),
  twitter: path.resolve(STORAGE_DIR, 'twitter'),
  unsplash: path.resolve(STORAGE_DIR, 'unsplash')
}

export const FETCHLIST_PATHS: ServicePaths = {
  npm: path.resolve(FETCHLISTS_DIR, 'npm.txt'),
  github: path.resolve(FETCHLISTS_DIR, 'github.txt'),
  spotify: path.resolve(FETCHLISTS_DIR, 'spotify.txt'),
  twitter: path.resolve(FETCHLISTS_DIR, 'twitter.txt'),
  unsplash: path.resolve(FETCHLISTS_DIR, 'unsplash.txt')
}

export const MANIFEST_PATHS: ServicePaths = {
  npm: path.resolve(MANIFESTS_DIR, 'npm'),
  github: path.resolve(MANIFESTS_DIR, 'github'),
  spotify: path.resolve(MANIFESTS_DIR, 'spotify'),
  twitter: path.resolve(MANIFESTS_DIR, 'twitter'),
  unsplash: path.resolve(MANIFESTS_DIR, 'unsplash')
}
