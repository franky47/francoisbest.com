import React from 'react'
import { NextPage } from 'next'
import { H1 } from 'src/components/primitives/Typography'
import { useURL } from 'src/hooks/useURL'
import PageLayoutWithSEO from 'src/layouts/PageLayout'
import { OutgoingLink } from '@47ng/chakra-next'
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useColorModeValue,
  Text,
  VisuallyHidden,
  TableRowProps,
  BoxProps,
  HStack,
  Spinner,
  Input,
  FormLabel,
  Container,
  Avatar,
  Icon,
  SimpleGrid,
  Badge,
  Code
} from '@chakra-ui/react'
import { scaleThreshold } from '@visx/scale'
import { Octokit, RestEndpointMethodTypes } from '@octokit/rest'
import useSWR from 'swr'
import {
  FiAlertCircle,
  FiPlayCircle,
  FiEye,
  FiGitBranch,
  FiGithub,
  FiGitPullRequest,
  FiPackage,
  FiStar,
  FiUser,
  FiActivity,
  FiGitMerge,
  FiGitCommit,
  FiCornerLeftDown
} from 'react-icons/fi'
import { readLocalSetting, useLocalSetting } from 'src/hooks/useLocalSetting'

const REPOS = [
  'franky47/francoisbest.com',
  'franky47/slack-cleaner',
  'franky47/foggy',
  'franky47/post.francoisbest.com',
  '47ng/chakra-next',
  '47ng/next-usequerystate',
  '47ng/fastify-micro',
  '47ng/fastify-cron',
  '47ng/check-env',
  '47ng/env-alias',
  '47ng/redact-env',
  '47ng/codec',
  '47ng/cloak',
  '47ng/cloak-ui',
  '47ng/session-keystore',
  '47ng/simple-e2ee',
  '47ng/actions-clever-cloud',
  '47ng/actions-slack-notify',
  '47ng/tapers',
  '47ng/47ng.com',
  '47ng/typescript-library-starter',
  'chiffre-io/push',
  'chiffre-io/crypto',
  'chiffre-io/crypto-box',
  'chiffre-io/crypto-sign',
  'chiffre-io/analytics-core',
  'chiffre-io/analytics-faker',
  'chiffre-io/analytics-processing',
  'chiffre-io/design-system',
  'chiffre-io/template-website',
  'chiffre-io/template-library',
  'chiffre-io/nextjs-chiffre'
]

const showOnDesktop = ['none', null, null, 'table-cell']

const ReadingListStatsPage: NextPage = () => {
  const [githubToken, setGitHubToken] = useLocalSetting('githubToken', '')
  return (
    <PageLayoutWithSEO
      frontMatter={{
        title: 'Repoverview',
        description: 'Overview of my open-source repositories',
        url: useURL('/repoverview'),
        ogImage: {
          url: useURL(`/images/open-source/og.jpg`),
          width: 1200,
          height: 630
        },
        containerProps: {
          maxW: '6xl'
        }
      }}
    >
      <VisuallyHidden>
        <H1>Repoverview</H1>
      </VisuallyHidden>
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
            <Th isNumeric colSpan={2}>
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
          {REPOS.map(slug => (
            <RepoRow key={slug} slug={slug} />
          ))}
        </Tbody>
      </Table>
      <Container as="section" mt={12}>
        <FormLabel>GitHub Personal Token</FormLabel>
        <Input
          fontFamily="mono"
          value={githubToken}
          onChange={e => setGitHubToken(e.target.value)}
        />
      </Container>
    </PageLayoutWithSEO>
  )
}

export default ReadingListStatsPage

// --

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
  return {
    avatar: repository.data.owner?.avatar_url,
    issues: repository.data.open_issues_count - openPRs.data.length,
    prs: {
      user: openPRs.data.filter(pr =>
        pr.labels.every(label => label.name !== 'dependencies')
      ).length,
      deps: openPRs.data.filter(pr =>
        pr.labels.some(label => label.name === 'dependencies')
      ).length
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

const RepoRow: React.FC<RepoRowProps> = ({ slug, ...props }) => {
  const info = useSWR(slug, fetchRepoInfo, {
    refreshInterval: 10 * 60 * 1000,
    revalidateOnFocus: true
  })
  const [owner, repo] = slug.split('/')
  const textDimmed = useColorModeValue('gray.500', 'gray.700')
  return (
    <Tr position="relative" {...props}>
      <Td>
        <Avatar size="2xs" src={info.data?.avatar} mr={2} />
        <OutgoingLink href={`https://github.com/${slug}`}>
          <Text as="span" color={textDimmed}>
            {owner} /{' '}
          </Text>
          <Text as="span">{repo}</Text>
        </OutgoingLink>
      </Td>
      <Td isNumeric>
        <OutgoingLink href={`https://github.com/${slug}/issues`}>
          <NumericView value={info.data?.issues} />
        </OutgoingLink>
      </Td>
      <Td isNumeric pr={0}>
        <OutgoingLink
          href={`https://github.com/${slug}/pulls?q=is%3Apr+is%3Aopen+-label%3Adependencies`}
        >
          <NumericView value={info.data?.prs.user} thresholds={[1, 3, 7]}>
            <Box as={FiUser} boxSize={4} d="inline-block" ml={2} mt={-1} />
          </NumericView>
        </OutgoingLink>
      </Td>
      <Td isNumeric pl={0}>
        <OutgoingLink
          href={`https://github.com/${slug}/pulls?q=is%3Apr+is%3Aopen+label%3Adependencies`}
        >
          <NumericView value={info.data?.prs.deps} thresholds={[1, 3, 7]}>
            <Box as={FiPackage} boxSize={4} d="inline-block" ml={2} mt={-1} />
          </NumericView>
        </OutgoingLink>
      </Td>
      <Td isNumeric position="relative">
        <ActionsView runs={info.data?.actions ?? []} float="right" />
      </Td>

      <Td isNumeric display={showOnDesktop}>
        <OutgoingLink
          href={`https://github.com/${slug}/settings#merge-button-settings`}
        >
          {info.data?.mergeOptions.merge && (
            <Icon as={FiGitMerge} aria-label="Merge" title="Merge" />
          )}
          {info.data?.mergeOptions.squash && (
            <Icon
              as={FiGitCommit}
              transform="rotateZ(90deg)"
              aria-label="Squash"
              title="Squash"
            />
          )}
          {info.data?.mergeOptions.rebase && (
            <Icon as={FiCornerLeftDown} aria-label="Rebase" title="Rebase" />
          )}
        </OutgoingLink>
      </Td>
      <Td>
        <OutgoingLink
          href={`https://github.com/${slug}/tree/${info.data?.defaultBranch}`}
        >
          <Code fontSize="xs" colorScheme="accent">
            {info.data?.defaultBranch ?? '--'}
          </Code>
        </OutgoingLink>
      </Td>
      <Td isNumeric display={showOnDesktop}>
        <SimpleGrid columns={3} fontSize="xs" color={textDimmed}>
          <OutgoingLink href={`https://github.com/${slug}/watchers`}>
            {info.data?.watchers ?? '--'}
            <Icon as={FiEye} ml={1} mt={-1} />
          </OutgoingLink>
          <OutgoingLink href={`https://github.com/${slug}/stargazers`}>
            {info.data?.stars ?? '--'}
            <Icon as={FiStar} ml={1} mt={-1} />
          </OutgoingLink>
          <OutgoingLink href={`https://github.com/${slug}/network/members`}>
            {info.data?.forks ?? '--'}
            <Icon as={FiGitBranch} ml={1} mt={-1} />
          </OutgoingLink>
        </SimpleGrid>
      </Td>
      {info.isValidating && (
        <Td
          position="absolute"
          left={-1}
          top={0}
          bottom={0}
          pt={2}
          px={0}
          borderBottomWidth={0}
        >
          <Spinner
            size="xs"
            color={useColorModeValue('gray.400', 'gray.700')}
          />
        </Td>
      )}
    </Tr>
  )
}

export interface ActionsViewProps extends BoxProps {
  runs: RestEndpointMethodTypes['actions']['listWorkflowRunsForRepo']['response']['data']['workflow_runs']
}

const ActionsView: React.FC<ActionsViewProps> = ({ runs, ...props }) => {
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

export interface NumericViewProps {
  value?: number
  thresholds?: number[]
}

export const NumericView: React.FC<NumericViewProps> = ({
  value,
  thresholds = [1, 5, 10],
  children
}) => {
  const colors = [
    useColorModeValue('gray.300', 'gray.800'),
    useColorModeValue('gray.700', 'gray.400'),
    useColorModeValue('orange.500', 'orange.300'),
    useColorModeValue('red.500', 'red.400')
  ]
  const { colorScale, weightScale } = React.useMemo(() => {
    return {
      colorScale: scaleThreshold({
        domain: thresholds,
        range: colors
      }),
      weightScale: scaleThreshold({
        domain: thresholds,
        range: ['normal', 'normal', 'medium', 'bold']
      })
    }
  }, [thresholds, colors])

  return (
    <Text
      as="span"
      color={value !== undefined ? colorScale(value) : 'gray.500'}
      fontWeight={value !== undefined ? weightScale(value) : 'normal'}
    >
      {value ?? '--'}
      {children}
    </Text>
  )
}
