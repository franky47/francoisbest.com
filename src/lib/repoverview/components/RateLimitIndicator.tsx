import {
  HStack,
  Progress,
  StackProps,
  Text,
  useColorModeValue
} from '@chakra-ui/react'
import React from 'react'
import { rateLimitStore } from '../stores/rateLimit'
import { useIsAnyRepoLoading } from './LoadingIndicator'

export function useRateLimitIndicator() {
  const [state, setState] = React.useState(rateLimitStore.state)
  React.useEffect(() => rateLimitStore.listen(setState), [])
  return React.useMemo(
    () => ({
      pct: Math.round((100 * (state.limit - state.remaining)) / state.limit),
      used: state.limit - state.remaining,
      limit: state.limit
    }),
    [state]
  )
}

export const RateLimitIndicator: React.FC<StackProps> = ({ ...props }) => {
  const { pct, used, limit } = useRateLimitIndicator()
  const isLoading = useIsAnyRepoLoading()
  const color = pct > 75 ? 'red' : pct > 50 ? 'yellow' : 'green'
  return (
    <HStack justifyContent="flex-end" {...props}>
      <Text
        fontSize="xs"
        color={useColorModeValue('gray.400', 'gray.700')}
        flexShrink={0}
      >
        API Usage {used}/{limit}
      </Text>
      <Progress
        value={pct}
        isIndeterminate={isLoading}
        colorScheme={color}
        flex={1}
        rounded="md"
        size="xs"
        w={24}
      />
    </HStack>
  )
}
