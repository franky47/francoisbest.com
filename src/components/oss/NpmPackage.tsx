import React from 'react'
import {
  Text,
  BoxProps,
  Image,
  Stack,
  Link,
  Badge,
  useTheme
} from '@chakra-ui/core'
import NpmIcon from '../icons/Npm'
import GitHubIcon from '../icons/GitHub'

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
        <Link
          href={packageUrl}
          isExternal
          fontSize="md"
          fontWeight="medium"
          color="gray.800"
        >
          {name}
        </Link>
        <Text color="gray.400" fontWeight="thin">
          |
        </Text>
        <GitHubIcon size={4} />
        <Link
          href={repoUrl}
          isExternal
          fontSize="md"
          fontWeight="medium"
          color="gray.800"
        >
          {repo}
        </Link>
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
        <Link href={repoUrl} isExternal>
          <Image
            fontSize="xs"
            src={`https://img.shields.io/github/stars/${repo}?color=${labelColor}&labelColor=${labelColor}&fontColor=red&labelFontColor=orange`}
            alt={`Repository stars for ${repo}`}
            mb={2}
          />
        </Link>
        <Link href={packageUrl} isExternal>
          <Image
            fontSize="xs"
            src={`https://img.shields.io/npm/v/${name}?color=red&labelColor=${labelColor}`}
            alt={`Latest version on NPM for ${name}`}
          />
        </Link>
        <Link href={`${repoUrl}/blob/master/LICENSE`} isExternal>
          <Image
            fontSize="xs"
            src={`https://img.shields.io/npm/l/${name}?color=blue&labelColor=${labelColor}`}
            alt={`License for ${name}`}
          />
        </Link>
        <Link href={packageUrl} isExternal>
          <Image
            fontSize="xs"
            src={`https://img.shields.io/bundlephobia/minzip/${name}?label=size&labelColor=${labelColor}`}
            alt={`NPM bundle size for ${name}`}
          />
        </Link>
        <Link href={packageUrl} isExternal>
          <Image
            fontSize="xs"
            src={`https://img.shields.io/npm/dt/${name}?labelColor=${labelColor}`}
            alt={`Total NPM downloads for ${name}`}
          />
        </Link>
        <Link
          href={`${repoUrl}/network/dependents?dependent_type=REPOSITORY`}
          isExternal
        >
          <Image
            fontSize="xs"
            src={`https://img.shields.io/librariesio/dependent-repos/npm/${name}?label=dependent&labelColor=${labelColor}`}
            alt={`Dependent repositories for ${name}`}
          />
        </Link>
      </Stack>
    </Stack>
  )
}

export default NpmPackage
