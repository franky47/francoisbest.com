import NextLink, { LinkProps as NextLinkProps } from 'next/link'
import {
  Button,
  ButtonProps,
  Icon,
  Link as ChakraLink,
  LinkProps as ChakraLinkProps
} from '@chakra-ui/core'
import { useRouter } from 'next/dist/client/router'

export interface RouteLinkProps
  extends Omit<NextLinkProps, 'as' | 'href'>,
    Omit<ChakraLinkProps, 'as' | 'href'> {
  as?: string
  to: string
  navLink?: boolean
}

export const RouteLink: React.FC<RouteLinkProps> = ({
  to,
  as = to,
  children,
  navLink = false,
  ...props
}) => {
  const router = useRouter()
  const underline = navLink && router?.asPath === as

  return (
    <NextLink href={to} passHref as={as}>
      <ChakraLink textDecoration={underline ? 'underline' : 'none'} {...props}>
        {children}
      </ChakraLink>
    </NextLink>
  )
}

// --

export interface OutgoingLinkProps extends ChakraLinkProps {
  showIcon?: boolean
}

export const OutgoingLink: React.FC<OutgoingLinkProps> = ({
  children,
  showIcon = false,
  ...props
}) => {
  return (
    <ChakraLink isExternal {...props}>
      {children}
      {showIcon && (
        <Icon name="external-link" mx="2px" aria-label="(external link)" />
      )}
    </ChakraLink>
  )
}

// --

export interface ButtonRouteLinkProps
  extends Omit<NextLinkProps, 'as' | 'href'>,
    ButtonProps {
  to: string
}

export const ButtonRouteLink: React.FC<ButtonRouteLinkProps> = ({
  to,
  children,
  ...props
}) => (
  <NextLink href={to} passHref>
    <Button as="a" {...props}>
      {children}
    </Button>
  </NextLink>
)
