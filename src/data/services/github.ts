import { Octokit } from '@octokit/rest'
import type { GitHubRepositoryData } from 'src/components/embeds/GitHubRepository'

async function fetchRepository(
  slug: string,
  gh: Octokit
): Promise<GitHubRepositoryData | null> {
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
      slug,
      title: res.data.name,
      description: res.data.description ?? undefined,
      issues: Math.max(0, res.data.open_issues_count - numPrs),
      prs: numPrs,
      stars: res.data.stargazers_count,
      license: res.data.license?.name,
      version
    }
  } catch (error) {
    console.error(`Failed to retrieve repo data for ${slug}`)
    return null
  }
}

export async function fetch(repoSlugs: string[]) {
  const gh = new Octokit({
    auth: process.env.GITHUB_TOKEN
  })

  const data = await Promise.all(
    repoSlugs.map(slug => fetchRepository(slug, gh))
  )
  return repoSlugs
    .map((slug, i) => [slug, data[i]])
    .filter(([_, data]) => data !== null) as [string, GitHubRepositoryData][]
}
