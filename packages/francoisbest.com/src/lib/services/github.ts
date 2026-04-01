import 'server-only'
import { z } from 'zod'

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
  updatedAt: Date
}

const repositoryQuerySchema = z.object({
  data: z.object({
    repository: z.object({
      name: z.string(),
      description: z.string().nullish(),
      licenseInfo: z
        .object({
          spdxId: z.string().nullish()
        })
        .nullish(),
      latestRelease: z
        .object({
          tagName: z.string().nullish()
        })
        .nullish(),
      owner: z.object({
        avatarUrl: z.string().url()
      }),
      issues: z.object({
        totalCount: z.number()
      }),
      pullRequests: z.object({
        totalCount: z.number()
      }),
      stargazerCount: z.number()
    })
  })
})

export async function fetchRepository(
  slug: string
): Promise<GitHubRepositoryData> {
  const [owner, repo] = slug.split('/')
  const query = `query {
  repository(owner: "${owner}", name: "${repo}") {
    name
    description
    licenseInfo {
      spdxId
    }
    latestRelease {
      tagName
    }
    owner {
      avatarUrl
    }
    issues(states: OPEN) {
      totalCount
    }
    pullRequests(states: OPEN) {
      totalCount
    }
    stargazerCount
  }
}`.replace(/\s+/g, ' ') // Minify
  const res = await fetch(`https://api.github.com/graphql`, {
    method: 'POST',
    headers: {
      Authorization: `bearer ${process.env.GITHUB_TOKEN}`
    },
    body: JSON.stringify({ query }),
    next: {
      tags: ['github'],
      revalidate: 3600 // 1h
    }
  })
  const {
    data: { repository }
  } = repositoryQuerySchema.parse(await res.json())
  return {
    url: `https://github.com/${slug}`,
    avatarUrl: repository.owner.avatarUrl,
    title: repository.name,
    description: repository.description ?? undefined,
    issues: repository.issues.totalCount,
    prs: repository.pullRequests.totalCount,
    stars: repository.stargazerCount,
    license: repository.licenseInfo?.spdxId ?? undefined,
    version: repository.latestRelease?.tagName?.replace(/^v/, '') ?? undefined,
    updatedAt: new Date()
  }
}
