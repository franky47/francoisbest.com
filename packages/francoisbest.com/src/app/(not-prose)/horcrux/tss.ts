import { Encoding, decoders, detectEncoding, encoders, utf8 } from '@47ng/codec'
import { combine, split } from '@stablelib/tss'

export function generateRandomBytes(length: number) {
  return crypto.getRandomValues(new Uint8Array(length))
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
  const encode = encoders[outputEncoding]
  const identifier = generateRandomBytes(16)
  const shards = split(utf8.encode(secret), threshold, numShards, identifier)
  return shards.map(shard => encode(shard))
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
