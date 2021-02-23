import { CategorisedPRs, PullRequest, robotIDs } from '../defs'

export function categorisePRs(pulls: PullRequest[]): CategorisedPRs {
  const security = pulls.filter(pr =>
    pr.labels.some(label => label.name === 'security')
  )
  const dependency = pulls.filter(
    pr =>
      pr.labels.some(label => label.name === 'dependencies') &&
      !security.includes(pr)
  )
  const bot = pulls.filter(
    pr =>
      robotIDs.includes(pr.user?.id ?? 0) &&
      !security.includes(pr) &&
      !dependency.includes(pr)
  )
  const user = pulls.filter(
    pr =>
      !security.includes(pr) && !dependency.includes(pr) && !bot.includes(pr)
  )
  return {
    security,
    dependency,
    bot,
    user
  }
}
