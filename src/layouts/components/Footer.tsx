import React from 'react'
import {
  Box,
  Text,
  Stack,
  StackProps,
  useColorModeValue
} from '@chakra-ui/react'
import { FiTwitter, FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'
import { FaKeybase } from 'react-icons/fa'
import { OutgoingIconButtonLink } from 'src/components/primitives/OutgoingIconButtonLink'
import { OutgoingLink, RouteLink } from '@47ng/chakra-next'
import { StaticContent } from 'src/components/primitives/StaticContent'

export interface FooterProps extends StackProps {
  showNav?: boolean
  showText?: boolean
}

const iconProps = {
  variant: 'ghost',
  size: 'lg',
  isRound: true
} as const

const GIT_SHA1 = process.env.GITHUB_SHA ?? 'local'

export const Footer: React.FC<FooterProps> = ({
  showText = true,
  showNav = true,
  ...props
}) => {
  return (
    <Box as="footer" pb={8}>
      {showNav && (
        <Stack
          as="nav"
          isInline
          spacing={[1, 2]}
          p={4}
          justifyContent="center"
          {...props}
        >
          <OutgoingIconButtonLink
            icon={<FiTwitter />}
            aria-label="Twitter"
            href="https://twitter.com/fortysevenfx"
            {...iconProps}
          />
          <OutgoingIconButtonLink
            icon={<FiGithub />}
            aria-label="GitHub"
            href="https://github.com/franky47"
            {...iconProps}
          />
          <OutgoingIconButtonLink
            icon={<FaKeybase />}
            aria-label="Keybase"
            href="https://keybase.io/franky47"
            {...iconProps}
          />
          <OutgoingIconButtonLink
            icon={<FiLinkedin />}
            aria-label="LinkedIn"
            href="https://www.linkedin.com/in/francoisbest"
            {...iconProps}
          />
          <OutgoingIconButtonLink
            icon={<FiMail />}
            aria-label="Email"
            href="mailto:contact+web@francoisbest.com"
            {...iconProps}
          />
        </Stack>
      )}
      {showText && (
        <Text
          fontSize="xs"
          textAlign="center"
          color={useColorModeValue('gray.500', 'gray.600')}
        >
          © 2019, François Best •{' '}
          <StaticContent as="span">
            <OutgoingLink
              href={`https://github.com/franky47/francoisbest.com/tree/${GIT_SHA1}`}
              fontFamily="mono"
            >
              {GIT_SHA1.slice(0, 8)}
            </OutgoingLink>
          </StaticContent>{' '}
          • <RouteLink to="/sitemap">Site map</RouteLink>
          <br />
          Privacy-first analytics by{' '}
          <Text as="b" fontWeight="semibold">
            <OutgoingLink href="https://chiffre.io">Chiffre.io</OutgoingLink>
          </Text>
        </Text>
      )}
    </Box>
  )
}
