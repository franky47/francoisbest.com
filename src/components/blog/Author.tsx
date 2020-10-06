import React from 'react'
import Stack, { StackProps } from '@chakra-ui/core/dist/Stack'
import Box from '@chakra-ui/core/dist/Box'
import Text from '@chakra-ui/core/dist/Text'
import { RouteLink, OutgoingLink } from '@47ng/chakra-next'
import { H4 } from 'src/components/primitives/Typography'
import { Logo } from 'src/components/Logo'
import { useLinkColor } from 'src/ui/colors'
import { HeadingProps } from '@chakra-ui/core'

export interface AuthorProps extends StackProps {
  TitleHeading?: React.FC<HeadingProps>
}

export const Author: React.FC<AuthorProps> = ({
  TitleHeading = H4,
  ...props
}) => {
  const linkColor = useLinkColor()

  return (
    <Stack isInline alignItems="center" spacing={4} {...props}>
      <Logo size={16} />
      <Box>
        <TitleHeading my={0}>
          <RouteLink to="/">François Best</RouteLink>
        </TitleHeading>
        <Text>Freelance developer &amp; founder</Text>
        <Text as="nav" fontWeight="medium" fontSize="sm" color="gray.500">
          <OutgoingLink href="https://47ng.com" color={linkColor}>
            47ng
          </OutgoingLink>
          &nbsp;•&nbsp;
          <OutgoingLink href="https://chiffre.io" color={linkColor}>
            Chiffre.io
          </OutgoingLink>
        </Text>
      </Box>
    </Stack>
  )
}
