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
  HStack
} from '@chakra-ui/react'
import { scaleThreshold } from '@visx/scale'
import { Octokit, RestEndpointMethodTypes } from '@octokit/rest'
import useSWR from 'swr'
import {
  FiAlertCircle,
  FiCheckSquare,
  FiGitBranch,
  FiGithub,
  FiGitPullRequest,
  FiStar
} from 'react-icons/fi'

const REPOS = [
  'franky47/francoisbest.com',
  'franky47/slack-cleaner',
  'franky47/foggy',
  'franky47/post.francoisbest.com',
  'franky47/how-far-along',
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

const ReadingListStatsPage: NextPage = () => {
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
      <Box mt={8}>
        <Table variant="simple" size="sm" mt={8}>
          <Thead>
            <Tr>
              <Th>
                <Box
                  as={FiGithub}
                  d="inline-block"
                  mr={2}
                  mt={-1}
                  boxSize={4}
                />{' '}
                Repo
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
                  as={FiCheckSquare}
                  d="inline-block"
                  mr={1}
                  mt={-1}
                  boxSize={4}
                />{' '}
                Actions
              </Th>
              <Th isNumeric>
                <Box as={FiStar} d="inline-block" mr={1} mt={-1} boxSize={4} />{' '}
                Stars
              </Th>
              <Th isNumeric>
                <Box
                  as={FiGitBranch}
                  d="inline-block"
                  mr={1}
                  mt={-1}
                  boxSize={4}
                />{' '}
                Forks
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {REPOS.map(slug => (
              <RepoRow key={slug} slug={slug} />
            ))}
          </Tbody>
        </Table>
      </Box>
    </PageLayoutWithSEO>
  )
}

export default ReadingListStatsPage

// --

export interface RepoRowProps extends TableRowProps {
  slug: string
}

async function fetchRepoInfo(slug: string) {
  const [owner, repo] = slug.split('/')
  const octokit = new Octokit({
    auth:
      (typeof window !== 'undefined' &&
        window.localStorage.getItem('githubToken')) ??
      undefined
  })
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
    issues: repository.data.open_issues_count - openPRs.data.length,
    prs: openPRs.data.length,
    stars: repository.data.stargazers_count,
    forks: repository.data.forks_count,
    actions: actions.data.workflow_runs.reverse()
  }
}

const RepoRow: React.FC<RepoRowProps> = ({ slug, ...props }) => {
  const info = useSWR(slug, fetchRepoInfo, {
    refreshInterval: 10 * 60 * 1000,
    revalidateOnFocus: true
  })
  return (
    <Tr {...props}>
      <Td>
        <OutgoingLink href={`https://github.com/${slug}`}>{slug}</OutgoingLink>
      </Td>
      <Td isNumeric>
        <OutgoingLink href={`https://github.com/${slug}/issues`}>
          <NumericView value={info.data?.issues} />
        </OutgoingLink>
      </Td>
      <Td isNumeric>
        <OutgoingLink href={`https://github.com/${slug}/pulls`}>
          <NumericView value={info.data?.prs} thresholds={[1, 3, 7]} />
        </OutgoingLink>
      </Td>
      <Td isNumeric position="relative">
        <ActionsView runs={info.data?.actions ?? []} float="right" />
      </Td>
      <Td isNumeric>
        <OutgoingLink href={`https://github.com/${slug}/stargazers`}>
          {info.data?.stars ?? '--'}
        </OutgoingLink>
      </Td>
      <Td isNumeric>
        <OutgoingLink href={`https://github.com/${slug}/network/members`}>
          {info.data?.forks ?? '--'}
        </OutgoingLink>
      </Td>
    </Tr>
  )
}

export interface ActionsViewProps extends BoxProps {
  runs: RestEndpointMethodTypes['actions']['listWorkflowRunsForRepo']['response']['data']['workflow_runs']
}

const ActionsView: React.FC<ActionsViewProps> = ({ runs, ...props }) => {
  return (
    <HStack size="sm" spacing={-1} {...props} opacity={0.75}>
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
            run.status === 'in_progress'
              ? 'yellow.500'
              : run.conclusion === 'success'
              ? useColorModeValue('green.300', 'green.800')
              : run.conclusion === 'failure'
              ? 'red.500'
              : 'gray.500'
          }
          borderColor={useColorModeValue('white', 'gray.900')}
          borderWidth="1px"
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
  thresholds = [1, 5, 10]
}) => {
  const { colorScale, weightScale } = React.useMemo(() => {
    return {
      colorScale: scaleThreshold({
        domain: thresholds,
        range: [
          useColorModeValue('gray.300', 'gray.800'),
          useColorModeValue('gray.700', 'gray.400'),
          useColorModeValue('orange.500', 'orange.300'),
          useColorModeValue('red.500', 'red.400')
        ]
      }),
      weightScale: scaleThreshold({
        domain: thresholds,
        range: ['normal', 'normal', 'medium', 'bold']
      })
    }
  }, [thresholds])

  return (
    <Text
      as="span"
      color={value !== undefined ? colorScale(value) : 'gray.500'}
      fontWeight={value !== undefined ? weightScale(value) : 'normal'}
    >
      {value ?? '--'}
    </Text>
  )
}
