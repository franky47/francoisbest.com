import vegemite from 'vegemite'
import type { RestEndpointMethodTypes } from '@octokit/rest'
import _uniqBy from 'lodash/uniqBy'

export type PullRequest = RestEndpointMethodTypes['pulls']['list']['response']['data'][0]

export interface PRStateMap {
  addForRepo: {
    slug: string
    pulls: PullRequest[]
  }
}

export interface PRState {
  pulls: PullRequest[]
}

export const prStore = vegemite<PRStateMap, PRState>({ pulls: [] })

prStore.on('addForRepo', (state, { pulls, slug }) => {
  // Replace the list of pull requests for the given repo in the state.
  // This will ensure that closed/merged PRs are flushed out.
  const others = state.pulls.filter(pr => pr.base.repo.full_name !== slug)
  state.pulls = _uniqBy(others.concat(pulls), 'id')
})
