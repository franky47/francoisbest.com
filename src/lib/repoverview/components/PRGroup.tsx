import React from 'react'
import { Box, BoxProps, Button, Flex, SimpleGrid, Text } from '@chakra-ui/react'
import { PullRequest, PullRequestCategories } from '../defs'
import { useCategorisedPRs } from '../hooks/useCategorisedPRs'
import { groupPRs } from '../engine/pulls'
import { OutgoingLink } from '@47ng/chakra-next'
import { useLinkColor } from 'src/ui/theme'

export interface PRCategoryProps extends BoxProps {
  category: PullRequestCategories
}

export const PRCategory: React.FC<PRCategoryProps> = ({
  category,
  ...props
}) => {
  const pulls = useCategorisedPRs(category)
  const groups = groupPRs(pulls, category)
  return (
    <Box {...props}>
      {pulls.length === 0 ? (
        <Text fontSize="sm" color="gray.500">
          All done here.
        </Text>
      ) : (
        Object.entries(groups)
          .sort((a, b) => b[1].length - a[1].length)
          .filter(([_, pulls]) => pulls.length > 0)
          .map(([key, pulls]) => <PRGroup key={key} qux={key} pulls={pulls} />)
      )}
    </Box>
  )
}

// --

export interface PRGroupProps extends BoxProps {
  qux: string
  pulls: PullRequest[]
}

export const PRGroup: React.FC<PRGroupProps> = ({ pulls, ...props }) => {
  const [expanded, setExpanded] = React.useState(false)
  return (
    <Box {...props}>
      <Flex alignItems="center">
        <Text mr={2} textAlign="right" w={8}>
          {pulls.length}
        </Text>
        <Text flex="1" fontWeight="semibold">
          {pulls[0].title}
        </Text>
        <Text ml="auto" fontSize="sm" color="gray.500">
          {pulls[0].user?.login}
        </Text>
        <Button size="xs" onClick={() => setExpanded(state => !state)}>
          {expanded ? 'Hide' : 'Show'}
        </Button>
      </Flex>
      {expanded && (
        <SimpleGrid columns={3}>
          {pulls
            .sort((a, b) =>
              a.base.repo.full_name > b.base.repo.full_name ? 1 : -1
            )
            .map(pr => (
              <React.Fragment key={pr.id}>
                <Text fontSize="xs">
                  {pr.base.repo.full_name}{' '}
                  <OutgoingLink href={pr.html_url} color={useLinkColor()}>
                    #{pr.number}
                  </OutgoingLink>
                </Text>
                <Text fontSize="xs" textAlign="right">
                  {pr.title}
                </Text>
                <Text fontSize="xs" textAlign="right">
                  {pr.user?.login}
                </Text>
              </React.Fragment>
            ))}
        </SimpleGrid>
      )}
    </Box>
  )
}
