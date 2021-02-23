import type { RestEndpointMethodTypes } from '@octokit/rest'

export type PullRequest = RestEndpointMethodTypes['pulls']['list']['response']['data'][0]

// https://www.notion.so/47ng/86e675a7ba874cf0a542c634c456a113?v=10c70ed31263441abf6217225289302d
export const robotIDs = [
  49699333, // Dependabot
  27856297, // Dependabot (preview)
  23717796, // Depfu
  19733683, // Snyk
  29139614, // Renovate
  31301654, // ImgBot
  46447321 // AllContributors
]

export type PullRequestCategories = 'user' | 'bot' | 'dependency' | 'security'

export type CategorisedPRs = {
  [category in PullRequestCategories]: PullRequest[]
}
