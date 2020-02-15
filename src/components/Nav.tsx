import React from 'react'
import {
  Flex,
  IconButton,
  Stack,
  useColorMode,
  FlexProps
} from '@chakra-ui/core'
import { RouteLink } from './primitives/Links'
import Logo from './Logo'

export interface NavProps extends FlexProps {
  showLogo?: boolean
}

const Nav: React.FC<NavProps> = ({ showLogo = true, ...props }) => {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <Stack
      isInline
      display="flex"
      as="header"
      maxW="xl"
      mx="auto"
      p={2}
      spacing={4}
      alignItems="center"
    >
      {showLogo && (
        <RouteLink to="/">
          <Logo size={8} />
        </RouteLink>
      )}
      <Stack as="nav" isInline alignItems="center" spacing={8}>
        <RouteLink navLink to="/">
          Home
        </RouteLink>
        <RouteLink navLink to="/open-source">
          Open Source
        </RouteLink>
        <RouteLink navLink to="/blog">
          Articles
        </RouteLink>
      </Stack>
      <Stack isInline ml="auto" alignItems="center" spacing={8}>
        <IconButton
          icon={colorMode === 'dark' ? 'sun' : 'moon'}
          aria-label={colorMode === 'dark' ? 'Light mode' : 'Dark mode'}
          onClick={toggleColorMode}
          variant="ghost"
        />
      </Stack>
    </Stack>
  )
}

export default Nav
