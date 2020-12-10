import { Box, BoxProps, useColorModeValue } from '@chakra-ui/react'
import { RouteLink, Card, CardProps, OutgoingLink } from '@47ng/chakra-next'
import { IconType } from 'react-icons/lib/cjs'

export interface ReferenceCardProps extends CardProps {
  href?: string
  icon?: IconType
  iconProps?: BoxProps
}

function useLink(href?: string) {
  if (href?.startsWith('https://')) {
    return OutgoingLink
  }
  return RouteLink
}

export const ReferenceCard: React.FC<ReferenceCardProps> = ({
  href,
  icon,
  iconProps = {},
  children,
  ...props
}) => {
  const Link = useLink(href)

  return (
    <Card
      as={
        href
          ? p => (
              <Link
                href={href}
                _hover={{
                  textDecoration: 'none',
                  shadow: 'lg'
                }}
                {...p}
              />
            )
          : 'div'
      }
      p={4}
      css={{
        '& h3': {
          marginTop: 0
        }
      }}
      bg={useColorModeValue('white', 'gray.800')}
      borderWidth="1px"
      borderColor={useColorModeValue('gray.400', 'gray.700')}
      rounded="md"
      shadow="md"
      mb={8}
      display="block"
      position="relative"
      {...props}
    >
      <Box
        as={icon}
        w={6}
        h={6}
        role="img"
        position="absolute"
        color={useColorModeValue('gray.400', 'gray.500')}
        fill={useColorModeValue('white', 'gray.900')}
        right={2}
        top={-6}
        {...iconProps}
      />
      {children}
    </Card>
  )
}
