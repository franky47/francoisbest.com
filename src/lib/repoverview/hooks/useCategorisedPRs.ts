import React from 'react'
import { PullRequestCategories } from '../defs'
import { categorisePRs } from '../engine/pulls'
import { prStore } from '../stores/pulls'

export function useCategorisedPRs(category: PullRequestCategories) {
  const [pulls, setPulls] = React.useState(prStore.state.pulls)
  React.useEffect(
    () =>
      prStore.listen(state => {
        const categories = categorisePRs(state.pulls)
        setPulls(categories[category])
      }),
    [category]
  )
  return pulls
}
