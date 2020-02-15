import React from 'react'
import { ArticleMeta, AlsoPublishedOn } from './types'
import {
  Box,
  BoxProps,
  Text,
  List,
  ListIcon,
  ListItem,
  Divider,
  Stack,
  useColorMode
} from '@chakra-ui/core'
import { FaDev, FaTwitter, FaKeybase, FaGithub } from 'react-icons/fa'
import Logo from '../Logo'
import { H4 } from '../primitives/Typography'
import { RouteLink, OutgoingLink } from '../primitives/Links'
import { useLinkColor, useColor } from '../../ui/colors'
import { mdxComponents } from './Mdx'

export interface ArticleFooterProps extends BoxProps {
  meta: ArticleMeta
}

const ArticleFooter: React.SFC<ArticleFooterProps> = ({ meta, ...props }) => {
  const { colorMode } = useColorMode()
  const linkColor = useLinkColor()
  return (
    <>
      <mdxComponents.hr />
      <Box as="footer" {...props} color={useColor('gray.600', 'gray.500')}>
        {meta.alsoPublishedOn?.length > 0 && (
          <>
            <Text fontStyle="italic" mb={2}>
              I'm interested in your feedback ! Leave a comment on:
            </Text>
            <List styleType="disc" mb={4} ml={2}>
              {meta.alsoPublishedOn.map(apo => (
                <AlsoPublishedOnComponent key={apo.url} {...apo} />
              ))}
            </List>
          </>
        )}

        <Stack isInline alignItems="center" spacing={4} mt={8} mb={4}>
          <Logo size={16} circledWhenDark />
          <Box>
            <H4
              my={0}
              fontSize="lg"
              fontWeight="semibold"
              color={`47ng-${colorMode}`}
            >
              <RouteLink to="/">François Best</RouteLink>
            </H4>
            <Text>Freelance developer &amp; founder</Text>
            <Text fontWeight="medium">
              <OutgoingLink href="https://47ng.com" color={linkColor}>
                47ng
              </OutgoingLink>
              <Divider orientation="vertical" display="inline" />
              <OutgoingLink href="https://chiffre.io" color={linkColor}>
                Chiffre.io
              </OutgoingLink>
            </Text>
          </Box>
        </Stack>

        <Text fontWeight="medium" mb={2}>
          Follow me on:
        </Text>
        <List ml={2} spacing={2}>
          <ListItem>
            <ListIcon icon={FaTwitter} mt={-1} />
            <OutgoingLink
              href="https://twitter.com/fortysevenfx"
              color={linkColor}
            >
              Twitter
            </OutgoingLink>
          </ListItem>
          <ListItem>
            <ListIcon icon={FaDev} mt={-1} />
            <OutgoingLink href="https://dev.to/franky47" color={linkColor}>
              DEV.to
            </OutgoingLink>
          </ListItem>
          <ListItem>
            <ListIcon icon={FaKeybase} mt={-1} />
            <OutgoingLink href="https://keybase.io/franky47" color={linkColor}>
              Keybase
            </OutgoingLink>
          </ListItem>
          <ListItem>
            <ListIcon icon={FaGithub} mt={-1} />
            <OutgoingLink href="https://github.com/franky47" color={linkColor}>
              GitHub
            </OutgoingLink>
          </ListItem>
        </List>
        <Text fontSize="sm" mt={8}>
          Copyright © 2020
          <Divider orientation="vertical" display="inline" />
          <OutgoingLink href="https://github.com/franky47/francoisbest.com">
            Edit this page on GitHub
          </OutgoingLink>
        </Text>
      </Box>
    </>
  )
}

export default ArticleFooter

// --

const AlsoPublishedOnComponent: React.FC<AlsoPublishedOn> = ({ url, name }) => {
  return (
    <ListItem>
      <OutgoingLink href={url} color={useLinkColor()}>
        {name}
      </OutgoingLink>
    </ListItem>
  )
}
