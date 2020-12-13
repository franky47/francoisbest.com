import fs from 'fs'
import path from 'path'
import mkdirp from 'make-dir'
import { services, Services } from './services'
import {
  FETCHLIST_PATHS,
  SERVICE_DIRS,
  MANIFEST_PATHS,
  MANIFESTS_DIR
} from './paths'

export function readServiceFetchlist(service: Services) {
  const fetchlistPath = FETCHLIST_PATHS[service]
  try {
    const buffer = fs.readFileSync(fetchlistPath, 'utf-8')
    const contentIDs = buffer.split('\n').filter(line => line.length > 0)
    return contentIDs
  } catch (error) {
    // File not found is an expected error.
    if (error.code !== 'ENOENT') {
      console.error(error)
    }
    return []
  }
}

export function store<T>(service: Services, contentID: string, data: T) {
  const json = JSON.stringify(data, null, 2)
  const body = `export const contentID = "${contentID}"
module.exports = ${json}`
  const serviceDir = SERVICE_DIRS[service]
  const filePath = path.resolve(serviceDir, `${contentID}.ts`)
  mkdirp.sync(path.dirname(filePath))
  fs.writeFileSync(filePath, body)
}

export function generateServiceManifest(
  service: Services,
  contentIDs: string[]
) {
  const manifestPath = MANIFEST_PATHS[service] + '.ts'
  const safeContentID = services[service].safeContentID ?? ((x: string) => x)
  const body = `// Auto-generated, do not edit.
import type { DataType } from '../../services/${service}'
${contentIDs
  .map(
    (cid, i) =>
      `import * as ${service}Content${i} from '../${service}/${safeContentID(
        cid
      )}'`
  )
  .join('\n')}

export type { DataType }

export type ContentIDs =
${contentIDs.map(cid => `  | '${safeContentID(cid)}'`).join('\n')}

export type Manifest = {
  [key in ContentIDs]: DataType
}

export const manifest: Manifest = {
${contentIDs
  .map(
    (cid, i) =>
      `  '${safeContentID(
        cid
      )}': (${service}Content${i} as unknown) as DataType,`
  )
  .join('\n')}
}
`
  mkdirp.sync(path.dirname(manifestPath))
  fs.writeFileSync(manifestPath, body)
}

export function generateManifest() {
  const manifestPath = path.resolve(MANIFESTS_DIR, 'index.ts')
  const body = `
${Object.keys(services)
  .map(service => `export * as ${service} from './${service}'`)
  .join('\n')}
`
  mkdirp.sync(path.dirname(manifestPath))
  fs.writeFileSync(manifestPath, body)
}
