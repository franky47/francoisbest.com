import { Octokit } from '@octokit/rest'
import { cache } from 'react'
import 'server-only'

export type GitHubRepositoryData = {
  url: string
  title?: string
  description?: string
  version?: string
  license?: string
  stars: number
  issues: number
  prs: number
}

const gh = new Octokit({
  auth: process.env.GITHUB_TOKEN,
})

export const fetchRepository = cache(async function fetchRepository(
  slug: string
): Promise<GitHubRepositoryData> {
  try {
    const [owner, repo] = slug.split('/')
    const res = await gh.repos.get({ owner, repo })
    const prs = await gh.pulls.list({ owner, repo })
    let version: string | undefined
    try {
      const releases = await gh.repos.getLatestRelease({ owner, repo })
      version = releases.data.tag_name.replace(/^v/, '')
    } catch {}
    const numPrs = prs.data.filter(pr => pr.state === 'open').length
    return {
      url: `https://github.com/${slug}`,
      title: res.data.name,
      description: res.data.description ?? undefined,
      issues: Math.max(0, res.data.open_issues_count - numPrs),
      prs: numPrs,
      stars: res.data.stargazers_count,
      license: res.data.license?.name,
      version,
    }
  } catch (error) {
    throw new Error(`Failed to retrieve repo data for ${slug}: ${error}`)
  }
})
