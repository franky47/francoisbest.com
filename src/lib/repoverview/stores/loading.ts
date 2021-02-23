import vegemite from 'vegemite'

export interface LoadingStateMap {
  'loading:update': {
    slug: string
    loading: boolean
  }
}

export interface LoadingState {
  [slug: string]: boolean
}

export const loadingStore = vegemite<LoadingStateMap, LoadingState>({})

loadingStore.on('loading:update', (state, { slug, loading }) => {
  state[slug] = loading
})
