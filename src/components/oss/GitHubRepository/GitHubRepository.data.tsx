import React from 'react'
import {
  GitHubRepositoryView,
  GitHubRepositoryProps
} from './GitHubRepository.view'
import { GitHubMeta } from './types'
import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then(r => r.json())

export const GitHubRepository: React.FC<GitHubRepositoryProps> = ({
  name,
  ...props
}) => {
  const apiUrl = `https://api.github.com/repos/${name}`
  const { data } = useSWR(apiUrl, fetcher, {
    refreshInterval: 0,
    shouldRetryOnError: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false
  })
  const meta: GitHubMeta | undefined = React.useMemo(() => {
    if (!data) {
      return undefined
    }
    return {
      stars: data.stargazers_count,
      license: data.license.spdx_id,
      version: '1.2.3',
      description: data.description,
      lastCommit: '2 days ago'
    }
  }, [data])

  return <GitHubRepositoryView name={name} {...props} meta={meta} />
}
