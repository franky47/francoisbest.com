import {
  CategorisedPRs,
  PullRequest,
  PullRequestCategories,
  robotIDs
} from '../defs'
import _groupBy from 'lodash/groupBy'

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

export function groupPRs(
  pulls: PullRequest[],
  category: PullRequestCategories
) {
  if (category === 'user') {
    return pulls // Not grouped
  }
  return _groupBy(pulls, pr => {
    const isDependabot = [49699333, 27856297].includes(pr.user?.id ?? 0)
    if (isDependabot) {
      const regex = /^dependabot\/([\w]+)\/([\w\/-]+)-([\d]+\.[\d]+\.[\d]+)$/
      const match = pr.head.ref.match(regex)
      return match ? match[2] : pr.head.ref
    }
    return [pr.user?.id, pr.head.ref].join(',')
  })
}
