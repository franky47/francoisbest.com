'use client'

import React from 'react'
import { FiPlusCircle, FiTrash2 } from 'react-icons/fi'
import { Button } from 'ui/components/buttons/button'
import { Textarea } from 'ui/components/forms/inputs'
import vegemite from 'vegemite'
import { assembleSecret, cleanupShard } from './tss'

type ShardStateMap = {
  set: { index: number; shard: string }
  add: null
  remove: null
}

type ShardState = {
  shards: string[]
}

const store = vegemite<ShardStateMap, ShardState>({ shards: Array(2).fill('') })

store.on('add', state => {
  state.shards.push('')
})

store.on('remove', state => {
  state.shards.length = Math.max(state.shards.length - 1, 2)
})

store.on('set', (state, { index, shard }) => {
  state.shards[index] = cleanupShard(shard)
})

function useShards() {
  const [state, setState] = React.useState(store.state)
  React.useEffect(() => store.listen(setState), [])
  return state.shards
}

function useSecret(shards: string[]) {
  const [secret, setSecret] = React.useState('')
  const [error, setError] = React.useState<Error | undefined>()
  React.useEffect(() => {
    try {
      const validShards = shards.filter(Boolean)
      if (validShards.length < 2) {
        // Not enough data, no need to display an error
        setError(new Error('Not enough data to recompose the secret.'))
        return
      }
      const secret = assembleSecret(validShards)
      setSecret(secret)
      setError(undefined)
    } catch (error) {
      setError(error as any)
    }
  }, [shards])
  return { secret, error }
}

export const HorcruxRecompose: React.FC = () => {
  const shards = useShards()
  const { secret, error } = useSecret(shards)
  return (
    <section className="mt-24">
      <h2 id="recompose" className="my-4 text-3xl font-bold">
        Recompose
        <a href="#recompose" aria-hidden tabIndex={-1}>
          <span className="icon icon-link font-medium" />
        </a>
      </h2>
      {!error && (
        <>
          <h3 className="text-md my-4 mb-2 font-semibold">Your secret:</h3>
          <code
            className="relative my-4 block break-all rounded-sm border border-gray-200 bg-gray-50/30 px-4 py-4 text-sm dark:border-gray-800 dark:bg-gray-900 dark:shadow-inner"
            style={{ overflowWrap: 'anywhere' }}
          >
            {secret}
          </code>
        </>
      )}
      {error && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-300">
          {error.message}
        </p>
      )}
      <div className="container mx-auto">
        <div className="mb-2 flex justify-end">
          <Button
            size="xs"
            variant="ghost"
            color="green"
            leftIcon={<FiPlusCircle />}
            onClick={() => store.dispatch('add', null)}
            disabled={shards.length >= 8}
          >
            Add Shard
          </Button>
          <Button
            size="xs"
            variant="ghost"
            color="red"
            leftIcon={<FiTrash2 />}
            onClick={() => store.dispatch('remove', null)}
            disabled={shards.length <= 2}
          >
            Remove
          </Button>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {shards.map((shard, i) => (
            <div key={i}>
              <label className="text-sm">Shard {i + 1}</label>
              <Textarea
                value={shard}
                className="min-h-[6rem] font-mono text-sm"
                onChange={e =>
                  store.dispatch('set', { index: i, shard: e.target.value })
                }
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
