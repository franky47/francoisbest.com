import React from 'react'
import {
  chakra,
  Text,
  FormControl,
  FormHelperText,
  FormLabel,
  SimpleGrid,
  Box,
  BoxProps,
  ChakraProps,
  Button,
  Heading,
  NumberInput,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInputField,
  NumberInputStepper,
  RadioGroup,
  Radio,
  HStack,
  Divider,
  Textarea,
  useClipboard,
  Icon
} from '@chakra-ui/react'
import { OutgoingLink } from '@47ng/chakra-next'
import { splitSecret } from './tss'
import { FiCheck, FiCopy } from 'react-icons/fi'
import { H2, Paragraph } from '../primitives/Typography'
import { Encoding } from '@47ng/codec'
import { WideContainer } from '../WideContainer'

export interface HorcruxSplitProps extends BoxProps {}

export const HorcruxSplit: React.FC<HorcruxSplitProps> = ({ ...props }) => {
  const [secret, setSecret] = React.useState('')
  const [numShards, setNumShards] = React.useState(2)
  const [threshold, setThreshold] = React.useState(2)
  const [encoding, setEncoding] = React.useState<Encoding>('base64')

  const shards = React.useMemo(
    () => splitSecret(secret, numShards, threshold, encoding),
    [secret, numShards, threshold, encoding]
  )

  return (
    <Box as="section" {...props}>
      <H2 linkable id="split">
        Split
      </H2>
      <FormControl>
        <FormLabel>Enter your secret:</FormLabel>
        <Textarea
          value={secret}
          minHeight={24}
          onChange={e => setSecret(e.target.value)}
          size="lg"
        />
        <FormHelperText fontSize="xs">
          It will not be stored or sent anywhere:{' '}
          <OutgoingLink
            textDecoration="underline"
            href="https://github.com/franky47/francoisbest.com/tree/next/src/components/horcrux/split.tsx"
          >
            check the source code
          </OutgoingLink>
          .
        </FormHelperText>
      </FormControl>
      <SimpleGrid
        columns={{ base: 1, md: 2 }}
        gap={4}
        rowGap={{ base: 4, md: 8 }}
        mt={8}
      >
        <FormControl>
          <FormLabel>Number of shards</FormLabel>
          <NumberInput
            min={2}
            max={8}
            value={numShards}
            onChange={(_, num) => {
              if (!Number.isNaN(num)) {
                setNumShards(num)
                setThreshold(Math.min(threshold, num))
              }
            }}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <FormHelperText fontSize="xs">
            to split the secret into
          </FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel>Number needed</FormLabel>
          <NumberInput
            min={2}
            max={numShards}
            value={threshold}
            onChange={(_, num) => {
              if (!Number.isNaN(num)) {
                setThreshold(Math.max(2, Math.min(numShards, num)))
              }
            }}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <FormHelperText fontSize="xs">to recompose the secret</FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel>Output encoding</FormLabel>
          <RadioGroup
            value={encoding}
            onChange={e => setEncoding(e as Encoding)}
            colorScheme="accent"
          >
            <HStack spacing={6}>
              <Radio value="base64">Base 64</Radio>
              <Radio value="hex">Hexadecimal</Radio>
            </HStack>
          </RadioGroup>
        </FormControl>
      </SimpleGrid>
      <Divider mt={8} />
      <Heading as="h2" textStyle="h3" mt={8} mb={2}>
        Horcrux Shards
      </Heading>
      <Paragraph>
        <chakra.b fontWeight="semibold">Individually</chakra.b>, these can be
        shared safely. Only <chakra.b fontWeight="semibold">united</chakra.b>{' '}
        can they reveal their secret.
      </Paragraph>
      <WideContainer>
        <SimpleGrid columns={[1, 1, 2]} gap={1}>
          {shards.map((shard, i) => (
            <ReadOnlyCodeBlock key={shard} text={shard} index={i + 1} />
          ))}
        </SimpleGrid>
      </WideContainer>
    </Box>
  )
}

// --

interface ReadOnlyCodeBlock extends ChakraProps {
  index: number
  text: string
}

const ReadOnlyCodeBlock: React.FC<ReadOnlyCodeBlock> = ({
  text,
  index,
  ...props
}) => {
  const { onCopy, hasCopied } = useClipboard(text, 2000)
  return (
    <chakra.pre
      fontSize="sm"
      overflowWrap="anywhere"
      wordBreak="break-all"
      whiteSpace="pre-wrap"
      pt={10}
      position="relative"
      my={0}
      {...props}
    >
      <Text
        pos="absolute"
        top={2}
        left={4}
        fontFamily="body"
        fontWeight="medium"
        fontSize="xs"
        color="gray.600"
        userSelect="none"
      >
        Shard {index}
      </Text>
      <Button
        pos="absolute"
        top="9px"
        size="xs"
        right={4}
        variant="link"
        colorScheme="accent"
        leftIcon={
          hasCopied ? <Icon as={FiCheck} color="green.500" /> : <FiCopy />
        }
        onClick={onCopy}
      >
        Copy
      </Button>
      {text}
    </chakra.pre>
  )
}
