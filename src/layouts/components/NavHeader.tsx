import React from 'react'
import Stack, { StackProps } from '@chakra-ui/core/dist/Stack'
import IconButton from '@chakra-ui/core/dist/IconButton'
import { useColorMode } from '@chakra-ui/core/dist/ColorModeProvider'
import { Logo } from 'src/components/Logo'
import { NavLink, RouteLink, navLinkMatch } from '@47ng/chakra-next'
import { FiTwitter, FiGithub, FiSun, FiMoon } from 'react-icons/fi'
import { OutgoingIconButtonLink } from './OutgoingIconButtonLink'

export interface NavHeaderProps extends StackProps {}

const navLinkProps = {
  flexShrink: 0,
  active: {
    textDecoration: 'underline'
  }
}

export const NavHeader: React.FC<NavHeaderProps> = ({ ...props }) => {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <Stack
      as="nav"
      isInline
      spacing={[4, 6]}
      alignItems="center"
      gridRowGap={1}
      flexWrap="wrap"
      {...props}
    >
      <RouteLink to="/" rounded={16}>
        <Logo size={8} />
      </RouteLink>
      <NavLink to="/" {...navLinkProps} shouldBeActive={navLinkMatch.exact}>
        About
      </NavLink>
      <NavLink to="/open-source" {...navLinkProps}>
        Open Source
      </NavLink>
      <NavLink to="/posts" {...navLinkProps}>
        Blog
      </NavLink>
      <Stack ml="auto" isInline spacing={0}>
        <OutgoingIconButtonLink
          icon={FiTwitter}
          aria-label="Twitter"
          href="https://twitter.com/fortysevenfx"
          variant="ghost"
          isRound
        />
        <OutgoingIconButtonLink
          icon={FiGithub}
          aria-label="GitHub"
          href="https://github.com/franky47"
          variant="ghost"
          isRound
          zIndex={1} // Allow the outline to display over siblings
        />
        <IconButton
          aria-label="Dark mode"
          icon={colorMode === 'dark' ? FiMoon : FiSun}
          isRound
          onClick={toggleColorMode}
        />
      </Stack>
    </Stack>
  )
}
