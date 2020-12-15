import React from 'react'
import {
  Box,
  BoxProps,
  Flex,
  chakra,
  Center,
  HStack,
  SimpleGrid,
  Text,
  DarkMode,
  useColorModeValue
} from '@chakra-ui/react'
import { H1 } from '../../primitives/Typography'
import { NpmPackageStatsData } from './NpmPackageStats'
import { GitHubRepositoryData } from '../GitHubRepository'
import { FiStar, FiDownload, FiFileText, FiGithub, FiTag } from 'react-icons/fi'
import { Logo } from '../../Logo'
import { OutgoingLink } from '@47ng/chakra-next'
import { accentKeys, ColorKeys, useLinkColor } from 'src/ui/theme'
import { useAccentStyles } from '../../Accent'
import { formatDate, formatStatNumber } from 'src/ui/format'
import { SimplerGraph } from './SimplerGraph'

export interface NpmPackageOGImageProps extends BoxProps {
  npm: NpmPackageStatsData
  github: GitHubRepositoryData
  accentKey?: ColorKeys
}

const randomAccentKey = () =>
  accentKeys[Math.round(Math.random() * (accentKeys.length - 1))]

export const NpmPackageOGImage: React.FC<NpmPackageOGImageProps> = ({
  npm,
  github,
  accentKey = randomAccentKey(),
  ...props
}) => {
  return (
    <Center
      w="600px"
      h="315px"
      overflow="hidden"
      sx={useAccentStyles(accentKey)}
      {...props}
    >
      <Box pos="relative">
        <Box px={6} mb={-2}>
          <Flex alignItems="center" justifyContent="space-between" mb={2}>
            <H1
              textStyle="h3"
              fontWeight="semibold"
              my={0}
              d="flex"
              alignItems="center"
            >
              <Box
                as={FiGithub}
                display="inline-block"
                mr={2}
                color="gray.500"
              />
              {github.slug}
            </H1>
            <HStack
              spacing={4}
              mt={1}
              fontSize="sm"
              color={useColorModeValue('gray.600', 'gray.500')}
            >
              <HStack>
                <FiStar />
                <Center>{formatStatNumber(github.stars)}</Center>
              </HStack>
              <HStack>
                <FiDownload />
                <Center>{formatStatNumber(npm.allTime)}</Center>
              </HStack>
              {!!github.version && (
                <HStack>
                  <FiTag />
                  <Center>{github.version}</Center>
                </HStack>
              )}
              {!!github.license && (
                <HStack>
                  <FiFileText />
                  <Center>{github.license.split(' ')[0]}</Center>
                </HStack>
              )}
            </HStack>
          </Flex>
          <SimpleGrid columns={2} gap={4}>
            <DarkMode>
              <chakra.pre>
                <code>
                  <chakra.span color="red.500" opacity={0.75}>
                    $
                  </chakra.span>
                  <chakra.span color="gray.600"> npm i </chakra.span>
                  <chakra.span
                    color={useColorModeValue('accent.700', 'accent.400')}
                  >
                    {npm.packageName}
                  </chakra.span>
                </code>
              </chakra.pre>
            </DarkMode>
            <Center flex={1} textAlign="center">
              {github.description}
            </Center>
          </SimpleGrid>
        </Box>
        <SimplerGraph
          h="120px"
          downloads={npm.last30Days}
          lastDate={npm.lastDate}
          accentKey={accentKey}
        />
        <HStack
          px={6}
          py={4}
          pos="absolute"
          bottom={0}
          left={0}
          right={0}
          h="30px"
        >
          <HStack spacing={useColorModeValue(2, 3)}>
            <Logo />
            <Center fontWeight="medium">47ng</Center>
          </HStack>
          <Center color="gray.500">•</Center>
          <OutgoingLink
            href="https://francoisbest.com"
            color={useLinkColor()}
            mr="auto"
            flexShrink={0}
          >
            francoisbest.com
            <chakra.span color="gray.500">/open-source</chakra.span>
          </OutgoingLink>
          <Text
            fontSize="xs"
            color={`${accentKey}.200`}
            opacity={0.3}
            textAlign="right"
          >
            Dynamic OpenGraph image
            <br />
            generated on {formatDate(new Date(), '', { month: 'short' })}
          </Text>
        </HStack>
      </Box>
    </Center>
  )
}
