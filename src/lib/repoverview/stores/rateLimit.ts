import vegemite from 'vegemite'

export interface RateLimitingStateMap {
  reportRateLimit: {
    remaining: number
    limit: number
  }
}

export interface RateLimitState {
  remaining: number
  limit: number
}

export const rateLimitStore = vegemite<RateLimitingStateMap, RateLimitState>({
  remaining: 5000,
  limit: 5000
})

rateLimitStore.on('reportRateLimit', (state, { remaining, limit }) => {
  state.limit = limit
  state.remaining =
    remaining === limit ? remaining : Math.min(state.remaining, remaining)
})
