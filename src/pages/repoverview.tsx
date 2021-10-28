import React from 'react'
import { NextPage } from 'next'
import { H1 } from 'src/components/primitives/Typography'
import { useURL } from 'src/hooks/useURL'
import PageLayoutWithSEO from 'src/layouts/PageLayout'
import {
  VisuallyHidden,
  Input,
  FormLabel,
  Container,
  Button
} from '@chakra-ui/react'
import _uniqBy from 'lodash/uniqBy'
import _groupBy from 'lodash/groupBy'
import { useLocalSetting } from 'src/hooks/useLocalSetting'
import { prStore } from 'src/lib/repoverview/stores/pulls'
import { OverviewTable } from 'src/lib/repoverview/views/OverviewTable'
import { PRView } from 'src/lib/repoverview/views/PRView'

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

// --

const RepoverviewPage: NextPage = () => {
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
      <OverviewTable repos={REPOS} />
      <PRView />
      <Container as="section" mt={12}>
        <FormLabel>GitHub Personal Token</FormLabel>
        <Input
          fontFamily="mono"
          value={githubToken}
          onChange={e => setGitHubToken(e.target.value)}
        />
      </Container>
      <Button
        onClick={() => {
          console.dir(prStore.state.pulls)
          const pullsByCategory = _groupBy(prStore.state.pulls, pr => {
            if (pr.labels.some(label => label.name === 'security')) {
              return 'security'
            } else if (pr.labels.some(label => label.name === 'dependencies')) {
              return 'dependencies'
            } else {
              return 'other'
            }
          })

          const transformObjectValues = (obj: any, transform: any) =>
            Object.fromEntries(
              Object.entries(obj).map(([key, value]) => [key, transform(value)])
            )

          const groupedPrs = transformObjectValues(
            pullsByCategory,
            (pulls: any) => {
              const grouped = _groupBy(pulls, pr => pr.head.ref)
              console.dir(grouped)
              return transformObjectValues(
                grouped,
                (pulls: any) => pulls.length
              )
            }
          )

          console.log(JSON.stringify(groupedPrs))
        }}
      >
        Dump PRs
      </Button>
    </PageLayoutWithSEO>
  )
}

export default RepoverviewPage
