import { NoSSR } from '@47ng/chakra-next'
import {
  Center,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  SimpleGrid,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Spinner,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
  Text
} from '@chakra-ui/react'
import { NextPage } from 'next'
import { queryTypes, useQueryState } from 'next-usequerystate'
import React from 'react'
import { Note } from 'src/components/blog/Note'
import { H1, H3 } from 'src/components/primitives/Typography'
import { WideContainer } from 'src/components/WideContainer'
import {
  DovetailSVG,
  useDovetailData,
  useDovetailMeasurements
} from 'src/components/woodworking/DovetailSVG'
import { useURL } from 'src/hooks/useURL'
import PageLayoutWithSEO from 'src/layouts/PageLayout'

export interface DovetailDesignerProps {}

const useIntParameter = (key: string, defaultValue: number) => {
  return useQueryState(key, {
    defaultValue,
    ...queryTypes.integer
  })
}

const useFloatParameter = (key: string, defaultValue: number) =>
  useQueryState(key, {
    defaultValue,
    ...queryTypes.float
  })

const DovetailDesigner: NextPage<DovetailDesignerProps> = ({}) => {
  const [numTails, setNumTails] = useIntParameter('numTails', 3)
  const [angleRatio, setAngleRatio] = useIntParameter('angleRatio', 5)
  const [jointWidth, setJointWidth] = useIntParameter('jointWidth', 200)
  const [pinsBoardThickness, setPinsBoardThickness] = useIntParameter(
    'pinsBoardThickness',
    18
  )
  const [pinToTailRatio, setPinToTailRatio] = useFloatParameter(
    'pinToTailRatio',
    0.14
  )
  const [halfPinRatio, setHalfPinRatio] = useFloatParameter('halfPinRatio', 1)

  const dovetailData = useDovetailData({
    jointWidth,
    pinsBoardThickness,
    angleRatio,
    numTails,
    pinToTailRatio,
    halfPinRatio
  })
  const {
    dividersLength,
    halfPinNarrowWidth,
    pinNarrowWidth,
    pinWideWidth,
    distanceBetweenPins
  } = useDovetailMeasurements(dovetailData)

  return (
    <PageLayoutWithSEO
      frontMatter={{
        title: 'Dovetail Designer',
        description: 'Design perfect-looking dovetail joints',
        url: useURL('/woodworking/dovetail-designer'),
        ogImage: {
          url: useURL(`/images/woodworking/dovetail-designer/og.jpg`),
          width: 1280,
          height: 720
        },
        containerProps: {
          maxW: '2xl'
        }
      }}
    >
      <H1 mb={0}>Dovetail Designer</H1>
      <Text fontSize="sm" color="gray.600">
        Design perfect-looking dovetail joints
      </Text>
      <NoSSR
        fallback={
          <Center h="md">
            <Spinner />
            <noscript style={{ textAlign: 'center' }}>
              This tool requires JavaScript to run.
            </noscript>
          </Center>
        }
      >
        <WideContainer>
          <DovetailSVG my={12} data={dovetailData} />
        </WideContainer>
        <SimpleGrid columns={{ base: 1, sm: 2 }} columnGap={6} rowGap={4}>
          <FormControl>
            <FormLabel>Joint Width</FormLabel>
            <NumberInput
              value={jointWidth}
              onChange={value => setJointWidth(parseInt(value))}
            >
              <InputGroup>
                <NumberInputField />
                <InputRightElement fontSize="sm" color="gray.600">
                  mm
                </InputRightElement>
              </InputGroup>
            </NumberInput>
          </FormControl>
          <FormControl>
            <FormLabel>Pins Board Thickness</FormLabel>
            <NumberInput
              value={pinsBoardThickness}
              onChange={value => setPinsBoardThickness(parseInt(value))}
            >
              <InputGroup>
                <NumberInputField />
                <InputRightElement fontSize="sm" color="gray.600">
                  mm
                </InputRightElement>
              </InputGroup>
            </NumberInput>
          </FormControl>

          <FormControl>
            <FormLabel>Number of Tails</FormLabel>
            <NumberInput
              value={numTails}
              onChange={value => setNumTails(parseInt(value))}
              min={1}
              max={10}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
          <FormControl>
            <Flex justifyContent="space-between" alignItems="baseline">
              <FormLabel>Angle</FormLabel>
              <Text fontSize="sm">{dovetailData.angleDegrees.toFixed(1)}°</Text>
            </Flex>
            <NumberInput
              value={angleRatio}
              onChange={value => setAngleRatio(parseInt(value))}
              min={3}
              max={10}
              step={1}
            >
              <InputGroup>
                <InputLeftElement>1:</InputLeftElement>
                <NumberInputField pl="1.54rem" />
              </InputGroup>
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
          <FormControl>
            <Flex justifyContent="space-between" alignItems="baseline">
              <FormLabel>Pin to Tail Ratio</FormLabel>
              <Text fontSize="sm">{pinToTailRatio}</Text>
            </Flex>
            <Slider
              aria-label="slider-pin-to-tail-ratio"
              value={pinToTailRatio}
              onChange={setPinToTailRatio}
              min={0.01}
              max={1}
              step={0.01}
              colorScheme="accent"
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
            <FormHelperText d="flex" justifyContent="space-between">
              <span>Larger tails</span>
              <span>Larger pins</span>
            </FormHelperText>
          </FormControl>
          <FormControl>
            <Flex justifyContent="space-between" alignItems="baseline">
              <FormLabel>Half Pin Ratio</FormLabel>
              <Text fontSize="sm">{halfPinRatio}</Text>
            </Flex>
            <Slider
              aria-label="slider-half-pin-ratio"
              value={halfPinRatio}
              onChange={setHalfPinRatio}
              min={0.1}
              max={2}
              step={0.1}
              colorScheme="accent"
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
          </FormControl>
        </SimpleGrid>
        <Note status="info" mt={8}>
          To layout this joint, set your dividers to{' '}
          <b>{dividersLength.toFixed(1)}</b> mm.
        </Note>
        <H3>Measurements</H3>
        <SimpleGrid columns={2} rowGap={8}>
          <Stat>
            <StatLabel>Pin thickness</StatLabel>
            <StatNumber>{pinNarrowWidth.toFixed(1)}mm</StatNumber>
            <StatHelpText>At the narrowest point</StatHelpText>
          </Stat>
          <Stat>
            <StatLabel>Pin thickness</StatLabel>
            <StatNumber>{pinWideWidth.toFixed(1)}mm</StatNumber>
            <StatHelpText>At the widest point</StatHelpText>
          </Stat>
          <Stat>
            <StatLabel>Half pin thickness</StatLabel>
            <StatNumber>{halfPinNarrowWidth.toFixed(1)}mm</StatNumber>
            <StatHelpText>At the narrowest point</StatHelpText>
          </Stat>
          <Stat>
            <StatLabel>Distance between pins</StatLabel>
            <StatNumber>{distanceBetweenPins.toFixed(1)}mm</StatNumber>
          </Stat>
        </SimpleGrid>
      </NoSSR>
    </PageLayoutWithSEO>
  )
}

export default DovetailDesigner
