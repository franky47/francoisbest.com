import { split, combine } from '@stablelib/tss'
import { Encoding, encoders, decoders, utf8 } from '@47ng/codec'
import * as NodeCrypto from 'crypto'

let nodeCrypto: typeof NodeCrypto

if (typeof window === 'undefined') {
  nodeCrypto = require('crypto')
}

export function generateRandomBytes(length: number) {
  if (typeof window === 'undefined') {
    return nodeCrypto.randomBytes(length)
  } else {
    return window.crypto.getRandomValues(new Uint8Array(length))
  }
}

/**
 * Split a secret into a given amount of shards.
 * Will throw if anything goes wrong.
 *
 * @param secret The secret to split
 * @param numShards How many pieces to split into
 * @param threshold How many pieces are needed (min) to re-assemble the secret
 * @param outputEncoding Output encoding for the shards
 */
export function splitSecret(
  secret: string,
  numShards: number,
  threshold: number,
  outputEncoding: Encoding = 'base64'
) {
  console.dir({ _: 'splitSecret', numShards, threshold })
  const encode = encoders[outputEncoding]
  const identifier = generateRandomBytes(16)
  const shards = split(utf8.encode(secret), threshold, numShards, identifier)
  return shards.map(shard => encode(shard))
}

export function detectEncoding(text: string): Encoding {
  const hex = /^[\dabcdef]+$/
  const b64 = /^[\w-]+(?:[=]{0,2})?$/
  if (text.toLowerCase().match(hex)) {
    return 'hex'
  }
  if (text.match(b64)) {
    return 'base64'
  }
  return 'utf8'
}

/**
 * Try to re-assemble the original secret from shards.
 * Will throw if anything goes wrong.
 *
 * @param shards Any number of shards
 */
export function assembleSecret(shards: string[]) {
  const secret = combine(
    shards.map(shard => {
      const decode = decoders[detectEncoding(shard)]
      return decode(shard)
    })
  )
  return utf8.decode(secret)
}

/**
 * Remove all whitespace in a block of text
 * @param shard Text to cleanup
 */
export function cleanupShard(shard: string) {
  return shard.replace(/\s/g, '')
}
