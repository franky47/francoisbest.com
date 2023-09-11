'use client'

import { parseAsFloat, parseAsInteger, useQueryState } from 'next-usequerystate'
import { ChangeEvent } from 'react'
import { NumberInput } from 'ui/components/forms/inputs'
import { Slider } from 'ui/components/forms/slider'
import {
  FormControl,
  FormHelperText,
  FormLabel,
} from 'ui/components/forms/structure'
import { Note } from 'ui/components/note'
import { Stat, StatHelpText, StatLabel, StatNumber } from 'ui/components/stat'
import { useHydration } from 'ui/hooks/useHydration'
import { WideContainer } from 'ui/layouts/wide-container'
import { DovetailSVG } from './components/dovetail-svg'
import {
  getDovetailData,
  getDovetailMeasurements,
} from './components/dovetails'

export interface DovetailDesignerProps {}

const safeParseInt =
  (callback: (value: number) => void) => (e: ChangeEvent<HTMLInputElement>) => {
    if (Number.isSafeInteger(e.target.valueAsNumber)) {
      callback(e.target.valueAsNumber)
    }
  }

const useIntParameter = (key: string, defaultValue: number) => {
  return useQueryState(
    key,
    parseAsInteger.withOptions({ scroll: false }).withDefault(defaultValue)
  )
}

const useFloatParameter = (key: string, defaultValue: number) =>
  useQueryState(
    key,
    parseAsFloat.withOptions({ scroll: false }).withDefault(defaultValue)
  )

export const DovetailDesigner: React.FC = () => {
  const hydrated = useHydration()
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

  const dovetailData = getDovetailData({
    jointWidth,
    pinsBoardThickness,
    angleRatio,
    numTails,
    pinToTailRatio,
    halfPinRatio,
  })
  const {
    dividersLength,
    halfPinNarrowWidth,
    pinNarrowWidth,
    pinWideWidth,
    distanceBetweenPins,
  } = getDovetailMeasurements(dovetailData)

  if (!hydrated) {
    return (
      <section className="py-16 text-center text-sm text-gray-500">
        Loading editor...
      </section>
    )
  }

  return (
    <>
      <WideContainer>
        <DovetailSVG className="my-12" data={dovetailData} />
      </WideContainer>
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
        <FormControl>
          <FormLabel>Joint Width</FormLabel>
          <NumberInput
            value={jointWidth}
            onChange={safeParseInt(setJointWidth)}
          >
            {/* <InputGroup>
              <NumberInputField />
              <InputRightElement fontSize="sm" color="gray.600">
                mm
              </InputRightElement>
            </InputGroup> */}
          </NumberInput>
        </FormControl>
        <FormControl>
          <FormLabel>Pins Board Thickness</FormLabel>
          <NumberInput
            value={pinsBoardThickness}
            onChange={safeParseInt(setPinsBoardThickness)}
          >
            {/* <InputGroup>
              <NumberInputField />
              <InputRightElement fontSize="sm" color="gray.600">
                mm
              </InputRightElement>
            </InputGroup> */}
          </NumberInput>
        </FormControl>

        <FormControl>
          <FormLabel>Number of Tails</FormLabel>
          <NumberInput
            value={numTails}
            onChange={safeParseInt(setNumTails)}
            min={1}
            max={10}
          >
            {/* <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper> */}
          </NumberInput>
        </FormControl>
        <FormControl>
          <div className="flex justify-between items-baseline">
            <FormLabel>Angle</FormLabel>
            <span className="text-sm">
              {dovetailData.angleDegrees.toFixed(1)}°
            </span>
          </div>
          <NumberInput
            value={angleRatio}
            onChange={safeParseInt(setAngleRatio)}
            min={3}
            max={10}
            step={1}
          >
            {/* <InputGroup>
              <InputLeftElement>1:</InputLeftElement>
              <NumberInputField pl="1.54rem" />
            </InputGroup>
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper> */}
          </NumberInput>
        </FormControl>
        <FormControl>
          <div className="flex justify-between items-baseline">
            <FormLabel>Pin to Tail Ratio</FormLabel>
            <span className="text-sm">{pinToTailRatio}</span>
          </div>
          <Slider
            aria-label="slider-pin-to-tail-ratio"
            value={pinToTailRatio}
            onChange={setPinToTailRatio}
            min={0.01}
            max={1}
            step={0.01}
          >
            {/* <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb /> */}
          </Slider>
          <FormHelperText className="flex justify-between">
            <span>Larger tails</span>
            <span>Larger pins</span>
          </FormHelperText>
        </FormControl>
        <FormControl>
          <div className="flex justify-between items-baseline">
            <FormLabel>Half Pin Ratio</FormLabel>
            <span className="text-sm">{halfPinRatio}</span>
          </div>
          <Slider
            aria-label="slider-half-pin-ratio"
            value={halfPinRatio}
            onChange={setHalfPinRatio}
            min={0.1}
            max={2}
            step={0.1}
          >
            {/* <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb /> */}
          </Slider>
        </FormControl>
      </section>
      <Note status="info" outerClass="mt-8">
        To layout this joint, set your dividers to{' '}
        <strong>{dividersLength.toFixed(1)}</strong> mm.
      </Note>
      <h3 className="font-semibold text-xl mt-8 mb-4">Measurements</h3>
      <section className="space-y-8">
        <div className="flex items-center">
          <Stat>
            <StatLabel>Pin thickness</StatLabel>
            <StatNumber>{pinNarrowWidth.toFixed(1)}mm</StatNumber>
            <StatHelpText>At the narrowest point</StatHelpText>
          </Stat>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-[120px] sm:w-[200px]"
            fill="none"
            viewBox="0 0 100 46"
          >
            <path
              d="M6 10H1V36H11L6 10Z"
              stroke="currentColor"
              strokeLinecap="round"
            />
            <path
              d="M56 10H44L39 36H61L56 10Z"
              stroke="currentColor"
              strokeLinecap="round"
            />
            <path
              d="M99 10H94L89 36H99V10Z"
              stroke="currentColor"
              strokeLinecap="round"
            />
            <path
              d="M43.8232 4.82322C43.7256 4.92085 43.7256 5.07915 43.8232 5.17678L45.4142 6.76777C45.5118 6.8654 45.6701 6.8654 45.7678 6.76777C45.8654 6.67014 45.8654 6.51184 45.7678 6.41421L44.3536 5L45.7678 3.58579C45.8654 3.48816 45.8654 3.32986 45.7678 3.23223C45.6701 3.1346 45.5118 3.1346 45.4142 3.23223L43.8232 4.82322ZM56.1768 5.17678C56.2744 5.07915 56.2744 4.92085 56.1768 4.82322L54.5858 3.23223C54.4882 3.1346 54.3299 3.1346 54.2322 3.23223C54.1346 3.32986 54.1346 3.48816 54.2322 3.58579L55.6464 5L54.2322 6.41421C54.1346 6.51184 54.1346 6.67014 54.2322 6.76777C54.3299 6.8654 54.4882 6.8654 54.5858 6.76777L56.1768 5.17678ZM44 5.25H56V4.75H44V5.25Z"
              fill="currentColor"
            />
          </svg>
        </div>
        <div className="flex items-center">
          <Stat>
            <StatLabel>Pin thickness</StatLabel>
            <StatNumber>{pinWideWidth.toFixed(1)}mm</StatNumber>
            <StatHelpText>At the widest point</StatHelpText>
          </Stat>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-[120px] sm:w-[200px]"
            fill="none"
            viewBox="0 0 100 46"
          >
            <path
              d="M6 10H1V36H11L6 10Z"
              stroke="currentColor"
              strokeLinecap="round"
            />
            <path
              d="M56 10H44L39 36H61L56 10Z"
              stroke="currentColor"
              strokeLinecap="round"
            />
            <path
              d="M99 10H94L89 36H99V10Z"
              stroke="currentColor"
              strokeLinecap="round"
            />
            <path
              d="M38.8232 40.8232C38.7256 40.9209 38.7256 41.0791 38.8232 41.1768L40.4142 42.7678C40.5118 42.8654 40.6701 42.8654 40.7678 42.7678C40.8654 42.6701 40.8654 42.5118 40.7678 42.4142L39.3536 41L40.7678 39.5858C40.8654 39.4882 40.8654 39.3299 40.7678 39.2322C40.6701 39.1346 40.5118 39.1346 40.4142 39.2322L38.8232 40.8232ZM61.1768 41.1768C61.2744 41.0791 61.2744 40.9209 61.1768 40.8232L59.5858 39.2322C59.4882 39.1346 59.3299 39.1346 59.2322 39.2322C59.1346 39.3299 59.1346 39.4882 59.2322 39.5858L60.6464 41L59.2322 42.4142C59.1346 42.5118 59.1346 42.6701 59.2322 42.7678C59.3299 42.8654 59.4882 42.8654 59.5858 42.7678L61.1768 41.1768ZM39 41.25L61 41.25V40.75L39 40.75V41.25Z"
              fill="currentColor"
            />
          </svg>
        </div>
        <div className="flex items-center">
          <Stat>
            <StatLabel>Half pin thickness</StatLabel>
            <StatNumber>{halfPinNarrowWidth.toFixed(1)}mm</StatNumber>
            <StatHelpText>At the narrowest point</StatHelpText>
          </Stat>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-[120px] sm:w-[200px]"
            fill="none"
            viewBox="0 0 100 46"
          >
            <path
              d="M6 10H1V36H11L6 10Z"
              stroke="currentColor"
              strokeLinecap="round"
            />
            <path
              d="M56 10H44L39 36H61L56 10Z"
              stroke="currentColor"
              strokeLinecap="round"
            />
            <path
              d="M99 10H94L89 36H99V10Z"
              stroke="currentColor"
              strokeLinecap="round"
            />
            <path
              d="M0.823223 3.82322C0.725592 3.92085 0.725592 4.07915 0.823223 4.17678L2.41421 5.76777C2.51184 5.8654 2.67014 5.8654 2.76777 5.76777C2.8654 5.67014 2.8654 5.51184 2.76777 5.41421L1.35355 4L2.76777 2.58579C2.8654 2.48816 2.8654 2.32986 2.76777 2.23223C2.67014 2.1346 2.51184 2.1346 2.41421 2.23223L0.823223 3.82322ZM6.17678 4.17678C6.27441 4.07915 6.27441 3.92085 6.17678 3.82322L4.58579 2.23223C4.48816 2.1346 4.32986 2.1346 4.23223 2.23223C4.1346 2.32986 4.1346 2.48816 4.23223 2.58579L5.64645 4L4.23223 5.41421C4.1346 5.51184 4.1346 5.67014 4.23223 5.76777C4.32986 5.8654 4.48816 5.8654 4.58579 5.76777L6.17678 4.17678ZM1 4.25H6V3.75H1V4.25Z"
              fill="currentColor"
            />
            <path
              d="M93.8232 3.82322C93.7256 3.92085 93.7256 4.07915 93.8232 4.17678L95.4142 5.76777C95.5118 5.8654 95.6701 5.8654 95.7678 5.76777C95.8654 5.67014 95.8654 5.51184 95.7678 5.41421L94.3536 4L95.7678 2.58579C95.8654 2.48816 95.8654 2.32986 95.7678 2.23223C95.6701 2.1346 95.5118 2.1346 95.4142 2.23223L93.8232 3.82322ZM99.1768 4.17678C99.2744 4.07915 99.2744 3.92085 99.1768 3.82322L97.5858 2.23223C97.4882 2.1346 97.3299 2.1346 97.2322 2.23223C97.1346 2.32986 97.1346 2.48816 97.2322 2.58579L98.6464 4L97.2322 5.41421C97.1346 5.51184 97.1346 5.67014 97.2322 5.76777C97.3299 5.8654 97.4882 5.8654 97.5858 5.76777L99.1768 4.17678ZM94 4.25H99V3.75H94V4.25Z"
              fill="currentColor"
            />
          </svg>
        </div>
        <div className="flex items-center">
          <Stat>
            <StatLabel>Distance between pins</StatLabel>
            <StatNumber>{distanceBetweenPins.toFixed(1)}mm</StatNumber>
          </Stat>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-[120px] sm:w-[200px]"
            fill="none"
            viewBox="0 0 100 46"
          >
            <path
              d="M6 10H1V36H11L6 10Z"
              stroke="currentColor"
              strokeLinecap="round"
            />
            <path
              d="M56 10H44L39 36H61L56 10Z"
              stroke="currentColor"
              strokeLinecap="round"
            />
            <path
              d="M99 10H94L89 36H99V10Z"
              stroke="currentColor"
              strokeLinecap="round"
            />
            <path
              d="M10.8232 40.8232C10.7256 40.9209 10.7256 41.0791 10.8232 41.1768L12.4142 42.7678C12.5118 42.8654 12.6701 42.8654 12.7678 42.7678C12.8654 42.6701 12.8654 42.5118 12.7678 42.4142L11.3536 41L12.7678 39.5858C12.8654 39.4882 12.8654 39.3299 12.7678 39.2322C12.6701 39.1346 12.5118 39.1346 12.4142 39.2322L10.8232 40.8232ZM39.1768 41.1768C39.2744 41.0791 39.2744 40.9209 39.1768 40.8232L37.5858 39.2322C37.4882 39.1346 37.3299 39.1346 37.2322 39.2322C37.1346 39.3299 37.1346 39.4882 37.2322 39.5858L38.6464 41L37.2322 42.4142C37.1346 42.5118 37.1346 42.6701 37.2322 42.7678C37.3299 42.8654 37.4882 42.8654 37.5858 42.7678L39.1768 41.1768ZM11 41.25L39 41.25V40.75L11 40.75V41.25Z"
              fill="currentColor"
            />
            <path
              d="M60.8232 40.8232C60.7256 40.9209 60.7256 41.0791 60.8232 41.1768L62.4142 42.7678C62.5118 42.8654 62.6701 42.8654 62.7678 42.7678C62.8654 42.6701 62.8654 42.5118 62.7678 42.4142L61.3536 41L62.7678 39.5858C62.8654 39.4882 62.8654 39.3299 62.7678 39.2322C62.6701 39.1346 62.5118 39.1346 62.4142 39.2322L60.8232 40.8232ZM89.1768 41.1768C89.2744 41.0791 89.2744 40.9209 89.1768 40.8232L87.5858 39.2322C87.4882 39.1346 87.3299 39.1346 87.2322 39.2322C87.1346 39.3299 87.1346 39.4882 87.2322 39.5858L88.6464 41L87.2322 42.4142C87.1346 42.5118 87.1346 42.6701 87.2322 42.7678C87.3299 42.8654 87.4882 42.8654 87.5858 42.7678L89.1768 41.1768ZM61 41.25L89 41.25V40.75L61 40.75V41.25Z"
              fill="currentColor"
            />
          </svg>
        </div>
      </section>
    </>
  )
}

export default DovetailDesigner
