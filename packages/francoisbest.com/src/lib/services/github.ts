import { Octokit } from '@octokit/rest'
import 'server-only'

export type GitHubRepositoryData = {
  url: string
  avatarUrl: string
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

const fetchWithTags: typeof fetch = async function fetchWithTags(...args) {
  args[1] = {
    ...(args[1] ?? {}),
    next: {
      tags: ['github'],
      revalidate: 86_400, // 24h
    },
  }
  return fetch(...args)
}

export const fetchRepository = async function fetchRepository(
  slug: string
): Promise<GitHubRepositoryData> {
  const request = {
    fetch: fetchWithTags,
  }
  try {
    const [owner, repo] = slug.split('/')
    const [{ data: repository }, prs] = await Promise.all([
      gh.repos.get({
        owner,
        repo,
        request,
      }),
      gh.pulls.list({
        owner,
        repo,
        request,
      }),
    ])
    let version: string | undefined
    try {
      const releases = await gh.repos.getLatestRelease({ owner, repo, request })
      version = releases.data.tag_name.replace(/^v/, '')
    } catch {}
    const numPrs = prs.data.filter(pr => pr.state === 'open').length
    return {
      url: `https://github.com/${slug}`,
      avatarUrl: repository.owner.avatar_url,
      title: repository.name,
      description: repository.description ?? undefined,
      issues: Math.max(0, repository.open_issues_count - numPrs),
      prs: numPrs,
      stars: repository.stargazers_count,
      license: repository.license?.name,
      version,
    }
  } catch (error) {
    throw new Error(`Failed to retrieve repo data for ${slug}: ${error}`)
  }
}
