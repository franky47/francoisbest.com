import React from 'react'

import {
  useColorModeValue,
  InputGroup,
  InputLeftElement,
  Input,
  InputRightElement,
  CloseButton,
  BoxProps
} from '@chakra-ui/react'
import { FiSearch } from 'react-icons/fi'
import { GroupedReadingList } from 'src/components/readingList/defs'
import { filterArticles } from './utils'

// --

export function useSearch(articles: GroupedReadingList, search: string) {
  return React.useMemo(
    () =>
      search
        ? filterArticles(
            articles,
            article =>
              (article.description ?? '')
                .toLowerCase()
                .includes(search.toLowerCase()) ||
              (article.title ?? '').toLowerCase().includes(search.toLowerCase())
          )
        : articles,
    [search, articles]
  )
}

// --

export interface SearchProps extends BoxProps {
  search: string
  setSearch: any
}

export const Search: React.FC<SearchProps> = ({
  search,
  setSearch,
  ...props
}) => {
  return (
    <InputGroup size="lg" {...props}>
      <InputLeftElement
        pointerEvents="none"
        fontSize="1.2em"
        px={0}
        children={<FiSearch />}
        color={
          search.length > 0
            ? useColorModeValue('gray.600', 'gray.400')
            : useColorModeValue('gray.400', 'gray.600')
        }
      />
      <Input
        value={search}
        onChange={(e: any) => setSearch(e.target.value)}
        placeholder="Search articles"
      />
      {search.length > 1 && (
        <InputRightElement
          children={
            <CloseButton
              rounded="full"
              size="sm"
              onClick={() => setSearch('')}
            />
          }
        />
      )}
    </InputGroup>
  )
}
