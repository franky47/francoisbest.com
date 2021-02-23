import React from 'react'
import { Box, BoxProps, Table, Thead, Tbody, Tr, Th } from '@chakra-ui/react'
import {
  FiAlertCircle,
  FiPlayCircle,
  FiGitBranch,
  FiGithub,
  FiGitPullRequest,
  FiActivity,
  FiGitMerge
} from 'react-icons/fi'
import { LoadingIndicator } from '../components/LoadingIndicator'
import { RateLimitIndicator } from '../components/RateLimitIndicator'
import { RepoRow, showOnDesktop } from '../components/RepoRow'

export interface OverviewTableProps extends BoxProps {
  repos: string[]
}

export const OverviewTable: React.FC<OverviewTableProps> = ({
  repos = [],
  ...props
}) => {
  return (
    <Box position="relative" {...props}>
      <LoadingIndicator position="absolute" top={1} left={-1} size="xs" />
      <RateLimitIndicator position="absolute" top={-3} right={0} />
      <Table variant="simple" size="sm" mt={8}>
        <Thead>
          <Tr>
            <Th>
              <Box as={FiGithub} d="inline-block" mr={2} mt={-1} boxSize={4} />{' '}
              Repository
            </Th>
            <Th isNumeric>
              <Box
                as={FiAlertCircle}
                d="inline-block"
                mr={2}
                mt={-1}
                boxSize={4}
              />
              Issues
            </Th>
            <Th isNumeric>
              <Box
                as={FiGitPullRequest}
                d="inline-block"
                mr={1}
                mt={-1}
                boxSize={4}
              />{' '}
              PRs
            </Th>
            <Th isNumeric>
              <Box
                as={FiPlayCircle}
                d="inline-block"
                mr={1}
                mt={-1}
                boxSize={4}
              />{' '}
              Actions
            </Th>
            <Th isNumeric>
              <Box
                as={FiGitMerge}
                d="inline-block"
                mr={1}
                mt={-1}
                boxSize={4}
              />{' '}
              Merge
            </Th>
            <Th>
              <Box
                as={FiGitBranch}
                d="inline-block"
                mr={1}
                mt={-1}
                boxSize={4}
              />{' '}
              Branch
            </Th>

            <Th isNumeric display={showOnDesktop}>
              <Box
                as={FiActivity}
                d="inline-block"
                mr={1}
                mt={-1}
                boxSize={4}
              />{' '}
              Stats
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {repos.map(slug => (
            <RepoRow key={slug} slug={slug} />
          ))}
        </Tbody>
      </Table>
    </Box>
  )
}
