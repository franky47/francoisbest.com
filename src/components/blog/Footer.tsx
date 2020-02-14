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
  Stack
} from '@chakra-ui/core'
import { FaDev, FaTwitter, FaKeybase, FaGithub } from 'react-icons/fa'
import Logo from '../Logo'
import { H4 } from '../primitives/Typography'
import { RouteLink, OutgoingLink } from '../primitives/Links'

export interface ArticleFooterProps extends BoxProps {
  meta: ArticleMeta
}

const ArticleFooter: React.SFC<ArticleFooterProps> = ({ meta, ...props }) => {
  return (
    <>
      <Divider mb={8} borderColor="gray.200" />
      <Box as="footer" {...props} color="gray.600">
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
          <Logo size={16} />
          <Box>
            <H4 my={0} fontSize="lg" fontWeight="semibold" color="#2f2f2f">
              <RouteLink to="/">François Best</RouteLink>
            </H4>
            <Text>Freelance developer &amp; founder</Text>
            <Text fontWeight="medium">
              <OutgoingLink href="https://47ng.com" color="blue.600">
                47ng
              </OutgoingLink>
              <Divider orientation="vertical" display="inline" />
              <OutgoingLink href="https://chiffre.io" color="blue.600">
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
              color="blue.600"
            >
              Twitter
            </OutgoingLink>
          </ListItem>
          <ListItem>
            <ListIcon icon={FaDev} mt={-1} />
            <OutgoingLink href="https://dev.to/franky47" color="blue.600">
              DEV.to
            </OutgoingLink>
          </ListItem>
          <ListItem>
            <ListIcon icon={FaKeybase} mt={-1} />
            <OutgoingLink href="https://keybase.io/franky47" color="blue.600">
              Keybase
            </OutgoingLink>
          </ListItem>
          <ListItem>
            <ListIcon icon={FaGithub} mt={-1} />
            <OutgoingLink href="https://github.com/franky47" color="blue.600">
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
      <OutgoingLink href={url} color="blue.600">
        {name}
      </OutgoingLink>
    </ListItem>
  )
}
