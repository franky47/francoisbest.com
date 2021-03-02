import { OutgoingLink } from '@47ng/chakra-next'
import {
  Box,
  Tr,
  Td,
  useColorModeValue,
  Text,
  TableRowProps,
  Avatar,
  Icon,
  SimpleGrid,
  Code
} from '@chakra-ui/react'
import { Octokit } from '@octokit/rest'
import React from 'react'
import {
  FiCornerLeftDown,
  FiEye,
  FiGitBranch,
  FiGitCommit,
  FiGitMerge,
  FiPackage,
  FiShieldOff,
  FiStar,
  FiUser
} from 'react-icons/fi'
import { BiBot } from 'react-icons/bi'
import { readLocalSetting } from 'src/hooks/useLocalSetting'
import useSWR from 'swr'
import { categorisePRs } from '../engine/pulls'
import { prStore } from '../stores/pulls'
import { rateLimitStore } from '../stores/rateLimit'
import { ActionsView } from './ActionsView'
import { NumericView } from './NumericView'
import { loadingStore } from '../stores/loading'

export const showOnDesktop = ['none', null, null, 'table-cell']

export interface RepoRowProps extends TableRowProps {
  slug: string
}

async function fetchRepoInfo(slug: string) {
  const auth = readLocalSetting<string>('githubToken')
  const [owner, repo] = slug.split('/')
  const octokit = new Octokit({ auth })
  const repository = await octokit.repos.get({
    owner,
    repo
  })
  const openPRs = await octokit.pulls.list({
    owner,
    repo,
    state: 'open'
  })
  const actions = await octokit.actions.listWorkflowRunsForRepo({
    owner,
    repo,
    per_page: 5
  })
  prStore.dispatch('addForRepo', {
    slug,
    pulls: openPRs.data
  })

  const rateLimit = {
    limit: parseInt(actions.headers['x-ratelimit-limit'] ?? '0'),
    remaining: parseInt(actions.headers['x-ratelimit-remaining'] ?? '0')
  }
  rateLimitStore.dispatch('reportRateLimit', rateLimit)

  const prCategories = categorisePRs(openPRs.data)

  return {
    avatar: repository.data.owner?.avatar_url,
    issues: repository.data.open_issues_count - openPRs.data.length,
    prs: {
      security: prCategories.security.length,
      user: prCategories.user.length,
      dependency: prCategories.dependency.length,
      bot: prCategories.bot.length
    },
    stars: repository.data.stargazers_count,
    forks: repository.data.forks_count,
    watchers: repository.data.subscribers_count,
    actions: actions.data.workflow_runs.reverse(),
    defaultBranch: repository.data.default_branch,
    mergeOptions: {
      merge: repository.data.allow_merge_commit,
      squash: repository.data.allow_squash_merge,
      rebase: repository.data.allow_rebase_merge
    }
  }
}

export const RepoRow: React.FC<RepoRowProps> = ({ slug, ...props }) => {
  const { data, isValidating } = useSWR(slug, fetchRepoInfo, {
    refreshInterval: 10 * 60 * 1000
  })
  const [owner, repo] = slug.split('/')
  const textDimmed = useColorModeValue('gray.500', 'gray.700')
  const numSecurityPRs = data?.prs.security ?? 0

  React.useEffect(() => {
    loadingStore.dispatch('loading:update', { slug, loading: isValidating })
  }, [isValidating, slug])

  return (
    <Tr position="relative" {...props}>
      <Td>
        <Avatar size="2xs" src={data?.avatar} mr={2} />
        <OutgoingLink href={`https://github.com/${slug}`}>
          <Text as="span" color={textDimmed}>
            {owner} /{' '}
          </Text>
          <Text as="span">{repo}</Text>
        </OutgoingLink>
      </Td>
      <Td isNumeric>
        <OutgoingLink href={`https://github.com/${slug}/issues`}>
          <NumericView value={data?.issues} />
        </OutgoingLink>
      </Td>
      <Td isNumeric>
        <SimpleGrid columns={4} color={textDimmed}>
          <OutgoingLink
            href={`https://github.com/${slug}/pulls?q=is%3Apr+is%3Aopen+-label%3Adependencies`}
          >
            <NumericView value={data?.prs.user} thresholds={[1, 3, 7]}>
              <Box as={FiUser} boxSize={4} d="inline-block" ml={1} mt={-1} />
            </NumericView>
          </OutgoingLink>
          <OutgoingLink
            href={`https://github.com/${slug}/pulls?q=is%3Apr+is%3Aopen+-label%3Adependencies`}
          >
            <NumericView value={data?.prs.bot} thresholds={[1, 3, 7]}>
              <Box as={BiBot} boxSize={4} d="inline-block" ml={1} mt={-1} />
            </NumericView>
          </OutgoingLink>
          <OutgoingLink
            href={`https://github.com/${slug}/pulls?q=is%3Apr+is%3Aopen+label%3Asecurity`}
          >
            <NumericView value={data?.prs.security} thresholds={[1, 1, 1]}>
              <Icon
                as={FiShieldOff}
                boxSize={4}
                d="inline-block"
                aria-label={
                  numSecurityPRs === 0
                    ? 'No vulnerability detected'
                    : numSecurityPRs === 1
                    ? 'This PR fixes a security vulnerability'
                    : 'These PRs fix security vulnerabilities'
                }
                ml={1}
                mt={-1}
              />
            </NumericView>
          </OutgoingLink>
          <OutgoingLink
            href={`https://github.com/${slug}/pulls?q=is%3Apr+is%3Aopen+label%3Adependencies`}
          >
            <NumericView value={data?.prs.dependency} thresholds={[1, 3, 7]}>
              <Box as={FiPackage} boxSize={4} d="inline-block" ml={1} mt={-1} />
            </NumericView>
          </OutgoingLink>
        </SimpleGrid>
      </Td>
      <Td isNumeric position="relative">
        <ActionsView runs={data?.actions ?? []} float="right" />
      </Td>

      <Td isNumeric display={showOnDesktop}>
        <OutgoingLink
          href={`https://github.com/${slug}/settings#merge-button-settings`}
        >
          {data?.mergeOptions.merge && (
            <Icon as={FiGitMerge} aria-label="Merge" title="Merge" />
          )}
          {data?.mergeOptions.squash && (
            <Icon
              as={FiGitCommit}
              transform="rotateZ(90deg)"
              aria-label="Squash"
              title="Squash"
            />
          )}
          {data?.mergeOptions.rebase && (
            <Icon as={FiCornerLeftDown} aria-label="Rebase" title="Rebase" />
          )}
        </OutgoingLink>
      </Td>
      <Td>
        <OutgoingLink
          href={`https://github.com/${slug}/tree/${data?.defaultBranch}`}
        >
          <Code fontSize="xs" colorScheme="accent">
            {data?.defaultBranch ?? '--'}
          </Code>
        </OutgoingLink>
      </Td>
      <Td isNumeric display={showOnDesktop}>
        <SimpleGrid columns={3} fontSize="xs" color={textDimmed}>
          <OutgoingLink href={`https://github.com/${slug}/watchers`}>
            {data?.watchers ?? '--'}
            <Icon as={FiEye} ml={1} mt={-1} />
          </OutgoingLink>
          <OutgoingLink href={`https://github.com/${slug}/stargazers`}>
            {data?.stars ?? '--'}
            <Icon as={FiStar} ml={1} mt={-1} />
          </OutgoingLink>
          <OutgoingLink href={`https://github.com/${slug}/network/members`}>
            {data?.forks ?? '--'}
            <Icon as={FiGitBranch} ml={1} mt={-1} />
          </OutgoingLink>
        </SimpleGrid>
      </Td>
    </Tr>
  )
}
