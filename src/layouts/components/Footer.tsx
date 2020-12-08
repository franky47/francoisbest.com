import React from 'react'
import { Stack, StackProps } from '@chakra-ui/react'
import { FiTwitter, FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'
import { FaKeybase, FaDev } from 'react-icons/fa'
import { OutgoingIconButtonLink } from 'src/components/primitives/OutgoingIconButtonLink'

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
        icon={<FaDev />}
        aria-label="DEV.to"
        href="https://dev.to/franky47"
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
  )
}
