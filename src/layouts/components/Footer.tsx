import React from 'react'
import Stack, { StackProps } from '@chakra-ui/core/dist/Stack'
import { FiTwitter, FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'
import { Keybase, DevDotTo } from '@icons-pack/react-simple-icons'
import { OutgoingIconButtonLink } from './OutgoingIconButtonLink'

export interface FooterProps extends StackProps {}

const iconProps = {
  variant: 'ghost',
  size: 'lg',
  isRound: true
} as const

export const Footer: React.FC<FooterProps> = ({ ...props }) => {
  return (
    <Stack
      as="footer"
      isInline
      spacing={[1, 2]}
      p={4}
      justifyContent="center"
      {...props}
    >
      <OutgoingIconButtonLink
        icon={FiTwitter}
        aria-label="Twitter"
        href="https://twitter.com/fortysevenfx"
        {...iconProps}
      />
      <OutgoingIconButtonLink
        icon={FiGithub}
        aria-label="GitHub"
        href="https://github.com/franky47"
        {...iconProps}
      />
      <OutgoingIconButtonLink
        icon={props => (
          <Keybase
            width="18px"
            height="18px"
            strokeWidth="0.4"
            stroke="currentColor"
            {...props}
          />
        )}
        aria-label="Keybase"
        href="https://keybase.io/franky47"
        {...iconProps}
      />
      <OutgoingIconButtonLink
        icon={DevDotTo}
        aria-label="DEV.to"
        href="https://dev.to/franky47"
        {...iconProps}
      />
      <OutgoingIconButtonLink
        icon={FiLinkedin}
        aria-label="LinkedIn"
        href="https://www.linkedin.com/in/francoisbest"
        {...iconProps}
      />
      <OutgoingIconButtonLink
        icon={FiMail}
        aria-label="Email"
        href="mailto:contact+web@francoisbest.com"
        {...iconProps}
      />
    </Stack>
  )
}
