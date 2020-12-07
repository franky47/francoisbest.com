import { Box, BoxProps } from '@chakra-ui/core'
import { RouteLink, Card, CardProps, OutgoingLink } from '@47ng/chakra-next'
import { IconType } from 'react-icons/lib/cjs'
import { useColor } from 'src/ui/colors'

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
      bg={useColor('white', 'gray.800')}
      borderWidth="1px"
      borderColor={useColor('gray.400', 'gray.700')}
      rounded="md"
      shadow="md"
      mb={8}
      display="block"
      position="relative"
      {...props}
    >
      <Box
        as={icon}
        size={6}
        role="img"
        position="absolute"
        color={useColor('gray.400', 'gray.500')}
        fill={useColor('white', 'gray.900')}
        right={2}
        top={-8}
        {...iconProps}
      />
      {children}
    </Card>
  )
}
