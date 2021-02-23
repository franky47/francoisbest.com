import React from 'react'
import { HStack, Box, BoxProps, useColorModeValue } from '@chakra-ui/react'
import { RestEndpointMethodTypes } from '@octokit/rest'
import { OutgoingLink } from '@47ng/chakra-next'

export interface ActionsViewProps extends BoxProps {
  runs: RestEndpointMethodTypes['actions']['listWorkflowRunsForRepo']['response']['data']['workflow_runs']
}

export const ActionsView: React.FC<ActionsViewProps> = ({ runs, ...props }) => {
  return (
    <HStack size="sm" spacing={-1} {...props} opacity={0.75}>
      {Array(5 - runs.length)
        .fill(undefined)
        .map((_, i) => (
          <Box
            key={i}
            rounded="full"
            boxSize={3}
            bg={useColorModeValue('gray.300', 'gray.800')}
            borderColor={useColorModeValue('white', 'gray.1000')}
            borderWidth="1.5px"
          />
        ))}
      {runs.map(run => (
        <OutgoingLink
          href={run.html_url}
          key={run.id}
          rounded="full"
          boxSize={3}
          _hover={{
            boxSize: 4
          }}
          bg={
            ['queued', 'in_progress'].includes(run.status)
              ? 'yellow.500'
              : run.conclusion === 'success'
              ? 'green.500'
              : run.conclusion === 'failure'
              ? 'red.500'
              : 'gray.500'
          }
          borderColor={useColorModeValue('white', 'gray.1000')}
          borderWidth="1.5px"
        />
      ))}
    </HStack>
  )
}
