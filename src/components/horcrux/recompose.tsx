import React from 'react'
import {
  chakra,
  Text,
  FormControl,
  FormLabel,
  SimpleGrid,
  Box,
  BoxProps,
  Button,
  Heading,
  Textarea,
  Flex,
  useColorModeValue
} from '@chakra-ui/react'
import { assembleSecret, cleanupShard } from './tss'
import { FiPlusCircle, FiTrash2 } from 'react-icons/fi'
import { H2 } from '../primitives/Typography'
import { WideContainer } from '../WideContainer'
import vegemite from 'vegemite'

export interface HorcruxRecomposeProps extends BoxProps {}

export interface ShardStateMap {
  set: { index: number; shard: string }
  add: null
  remove: null
}

export interface ShardState {
  shards: string[]
}

const store = vegemite<ShardStateMap, ShardState>({ shards: Array(2).fill('') })

store.on('add', state => {
  state.shards.push('')
})

store.on('remove', state => {
  state.shards.length = Math.max(state.shards.length - 1, 2)
})

store.on('set', (state, { index, shard }) => {
  state.shards[index] = cleanupShard(shard)
})

function useShards() {
  const [state, setState] = React.useState(store.state)
  React.useEffect(() => store.listen(setState), [])
  return state.shards
}

function useSecret(shards: string[]) {
  const [secret, setSecret] = React.useState('')
  const [error, setError] = React.useState<Error | undefined>()
  React.useEffect(() => {
    try {
      const validShards = shards.filter(Boolean)
      if (validShards.length < 2) {
        // Not enough data, no need to display an error
        setError(new Error('Not enough data to recompose the secret.'))
        return
      }
      const secret = assembleSecret(validShards)
      setSecret(secret)
      setError(undefined)
    } catch (error) {
      setError(error)
    }
  }, [shards])
  return { secret, error }
}

export const HorcruxRecompose: React.FC<HorcruxRecomposeProps> = ({
  ...props
}) => {
  const shards = useShards()
  const { secret, error } = useSecret(shards)
  return (
    <Box as="section" {...props} mt={24}>
      <H2 linkable id="recompose">
        Recompose
      </H2>
      {!error && (
        <>
          <Heading as="h3" fontSize="md" fontWeight="semibold" mb={2} mt={8}>
            Your secret:
          </Heading>
          <chakra.pre
            mt={0}
            fontSize="sm"
            overflowWrap="anywhere"
            wordBreak="break-all"
            whiteSpace="pre-wrap"
          >
            {secret}
          </chakra.pre>
        </>
      )}
      {error && (
        <Text
          fontSize="sm"
          color={useColorModeValue('red.600', 'red.300')}
          mt={8}
        >
          {error.message}
        </Text>
      )}
      <WideContainer>
        <Flex justifyContent="flex-end" mb={2}>
          <Button
            size="xs"
            variant="ghost"
            mr={2}
            colorScheme="green"
            leftIcon={<FiPlusCircle />}
            onClick={() => store.dispatch('add', null)}
            isDisabled={shards.length >= 8}
          >
            Add Shard
          </Button>
          <Button
            size="xs"
            variant="ghost"
            colorScheme="red"
            leftIcon={<FiTrash2 />}
            onClick={() => store.dispatch('remove', null)}
            isDisabled={shards.length <= 2}
          >
            Remove
          </Button>
        </Flex>
        <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
          {shards.map((shard, i) => (
            <FormControl>
              <FormLabel fontSize="sm">Shard {i + 1}</FormLabel>
              <Textarea
                value={shard}
                minHeight={48}
                fontSize="sm"
                fontFamily="mono"
                onChange={e =>
                  store.dispatch('set', { index: i, shard: e.target.value })
                }
              />
            </FormControl>
          ))}
        </SimpleGrid>
      </WideContainer>
    </Box>
  )
}
