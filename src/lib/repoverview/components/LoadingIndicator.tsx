import React from 'react'
import { Spinner, SpinnerProps, useColorModeValue } from '@chakra-ui/react'
import { loadingStore } from '../stores/loading'

export function useIsAnyRepoLoading() {
  const [state, setState] = React.useState(loadingStore.state)
  React.useEffect(() => loadingStore.listen(setState), [])
  return React.useMemo(() => Object.values(state).some(loading => loading), [
    state
  ])
}

export const LoadingIndicator: React.FC<SpinnerProps> = ({ ...props }) => {
  const isLoading = useIsAnyRepoLoading()
  return isLoading ? (
    <Spinner color={useColorModeValue('gray.400', 'gray.700')} {...props} />
  ) : null
}
