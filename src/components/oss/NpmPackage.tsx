import React from 'react'
import {
  Text,
  BoxProps,
  Image,
  Stack,
  Badge,
  useTheme,
  Box
} from '@chakra-ui/core'
import { NpmIcon } from '../icons/Npm'
import { OutgoingLink } from '@47ng/chakra-next'
import { useColor } from 'src/ui/colors'
import { FiGithub } from 'react-icons/fi'

export interface NpmPackageProps extends BoxProps {
  name: string
  repo: string
  description: string
  keywords?: string[]
}

const NpmPackage: React.FC<NpmPackageProps> = ({
  name,
  repo,
  description,
  keywords,
  ...props
}) => {
  const theme = useTheme()
  const labelColor = theme.colors.gray['700'].replace('#', '')
  const repoUrl = `https://github.com/${repo}`
  const packageUrl = `https://npmjs.com/package/${name}`

  return (
    <Stack {...props}>
      <Stack isInline alignItems="center">
        <NpmIcon mb={-1} />
        <OutgoingLink
          href={packageUrl}
          fontSize="md"
          fontWeight="medium"
          color={useColor('gray.800', 'gray.300')}
        >
          {name}
        </OutgoingLink>
        <Text color="gray.400" fontWeight="thin">
          |
        </Text>
        <Box as={FiGithub} size={4} role="img" aria-label="GitHub" />
        <OutgoingLink
          href={repoUrl}
          fontSize="md"
          fontWeight="medium"
          color={useColor('gray.800', 'gray.300')}
        >
          {repo}
        </OutgoingLink>
      </Stack>

      {keywords && (
        <Stack isInline flexWrap="wrap">
          {keywords.map(keyword => (
            <Badge
              key={keyword}
              variantColor="blue"
              textTransform="lowercase"
              fontWeight="medium"
              px={2}
              mb={2}
            >
              {keyword}
            </Badge>
          ))}
        </Stack>
      )}
      <Text as="p" pb={2}>
        {description}
      </Text>
      <Stack isInline flexWrap="wrap">
        <OutgoingLink href={repoUrl}>
          <Image
            fontSize="xs"
            src={`https://img.shields.io/github/stars/${repo}?color=${labelColor}&labelColor=${labelColor}&fontColor=red&labelFontColor=orange`}
            alt={`Repository stars for ${repo}`}
            mb={2}
          />
        </OutgoingLink>
        <OutgoingLink href={packageUrl}>
          <Image
            fontSize="xs"
            src={`https://img.shields.io/npm/v/${name}?color=red&labelColor=${labelColor}`}
            alt={`Latest version on NPM for ${name}`}
          />
        </OutgoingLink>
        <OutgoingLink href={`${repoUrl}/blob/master/LICENSE`}>
          <Image
            fontSize="xs"
            src={`https://img.shields.io/npm/l/${name}?color=blue&labelColor=${labelColor}`}
            alt={`License for ${name}`}
          />
        </OutgoingLink>
        <OutgoingLink href={packageUrl}>
          <Image
            fontSize="xs"
            src={`https://img.shields.io/bundlephobia/minzip/${name}?label=size&labelColor=${labelColor}`}
            alt={`NPM bundle size for ${name}`}
          />
        </OutgoingLink>
        <OutgoingLink href={packageUrl}>
          <Image
            fontSize="xs"
            src={`https://img.shields.io/npm/dt/${name}?labelColor=${labelColor}`}
            alt={`Total NPM downloads for ${name}`}
          />
        </OutgoingLink>
        <OutgoingLink
          href={`${repoUrl}/network/dependents?dependent_type=REPOSITORY`}
        >
          <Image
            fontSize="xs"
            src={`https://img.shields.io/librariesio/dependent-repos/npm/${name}?label=dependent&labelColor=${labelColor}`}
            alt={`Dependent repositories for ${name}`}
          />
        </OutgoingLink>
      </Stack>
    </Stack>
  )
}

export default NpmPackage
