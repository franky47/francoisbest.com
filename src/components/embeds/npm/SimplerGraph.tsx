import React from 'react'
import { Box, BoxProps, useColorModeValue, useToken } from '@chakra-ui/react'
import { ColorKeys } from 'src/ui/theme'
import { Svg } from '@47ng/chakra-next'
import { useMeasure } from 'react-use'

// Source:
// https://medium.com/@francoisromain/smooth-a-svg-path-with-cubic-bezier-curves-e37b49d46c74

export interface SimplerGraphProps extends BoxProps {
  downloads: number[]
  lastDate: string
  accentKey?: ColorKeys
}

type Point = [number, number]

type CommandFn = (point: Point, index: number, array: Point[]) => string

const FLOAT_DECIMALS = 4

// --

function formatGraphData(
  downloads: number[],
  scale: { w: number; h: number; mt?: number; mb?: number }
): Point[] {
  const actualH = scale.h - (scale.mt ?? 0) - (scale.mb ?? 0)

  const { min: minY, max: maxY } = downloads.reduce(
    ({ min, max }, value) => ({
      min: Math.min(min, value),
      max: Math.max(max, value)
    }),
    { min: Infinity, max: -Infinity }
  )
  const scaleX = scale.w / (downloads.length - 1)
  const scaleY = actualH / (maxY - minY)
  return downloads.map((value, i) => [
    i * scaleX,
    (scale.mt ?? 0) + scaleY * (maxY - value + minY)
  ])
}

const svgPath = (points: Point[], command: CommandFn) => {
  // build the d attributes by looping over the points
  const d = points.reduce(
    (acc, point, i, a) =>
      i === 0 // if first point
        ? `M ${point[0].toFixed(FLOAT_DECIMALS)},${point[1].toFixed(
            FLOAT_DECIMALS
          )}` // else
        : `${acc} ${command([point[0], point[1]], i, a)}`,
    ''
  )
  return d
}
const lineCommand = (point: Point) => `L ${point[0]} ${point[1]}`

const line = (pointA: Point, pointB: Point) => {
  const lengthX = pointB[0] - pointA[0]
  const lengthY = pointB[1] - pointA[1]
  return {
    length: Math.sqrt(Math.pow(lengthX, 2) + Math.pow(lengthY, 2)),
    angle: Math.atan2(lengthY, lengthX)
  }
}

const controlPoint = (
  current: Point,
  previous: Point,
  next: Point,
  reverse?: boolean
) => {
  // When 'current' is the first or last point of the array
  // 'previous' or 'next' don't exist.
  // Replace with 'current'
  const p = previous || current
  const n = next || current // The smoothing ratio
  const smoothing = 0.2 // Properties of the opposed-line
  const o = line(p, n) // If is end-control-point, add PI to the angle to go backward
  const angle = o.angle + (reverse ? Math.PI : 0)
  const length = o.length * smoothing // The control point position is relative to the current point
  const x = current[0] + Math.cos(angle) * length
  const y = current[1] + Math.sin(angle) * length
  return [x, y]
}

const bezierCommand: CommandFn = (point, i, a) => {
  // start control point
  const [cpsX, cpsY] = controlPoint(a[i - 1], a[i - 2], point) // end control point
  const [cpeX, cpeY] = controlPoint(point, a[i - 1], a[i + 1], true)
  const coordinates = (x: number, y: number) =>
    [x.toFixed(FLOAT_DECIMALS), y.toFixed(FLOAT_DECIMALS)].join(',')
  return [
    'C',
    coordinates(cpsX, cpsY),
    coordinates(cpeX, cpeY),
    coordinates(point[0], point[1])
  ].join(' ')
}

// --

export const SimplerGraph: React.FC<SimplerGraphProps> = ({
  downloads,
  lastDate,
  accentKey = 'accent',
  ...props
}) => {
  const [ref, { width, height }] = useMeasure()
  const w = width || 600
  const h = height || 120
  const graphPoints = React.useMemo(
    () => formatGraphData(downloads, { w, h, mt: 4, mb: 56 }),
    [downloads, w, h]
  )

  if (graphPoints.length === 0) {
    return null
  }
  const strokeColor = useColorModeValue(`${accentKey}.500`, `${accentKey}.300`)
  const [startLight, stopLight] = useToken('colors', [
    `${accentKey}.200`,
    `${accentKey}.500`
  ])
  const [startDark, stopDark] = useToken('colors', [
    `${accentKey}.500`,
    `${accentKey}.300`
  ])
  const gradientId = `graph-gradient-${accentKey}`
  return (
    <Box {...props} ref={ref as any}>
      <Svg
        viewBox={`0 0 ${w} ${h}`}
        overflow="visible"
        sx={{
          '& path': {
            stroke: strokeColor
          }
        }}
      >
        <defs>
          <linearGradient id={gradientId} x1="0" x2="0" y1="1" y2="0">
            <stop
              offset="0%"
              stopColor={useColorModeValue(startLight, startDark)}
              stopOpacity={0}
            />
            <stop
              offset="100%"
              stopColor={useColorModeValue(stopLight, stopDark)}
              stopOpacity={0.2}
            />
          </linearGradient>
        </defs>
        <path
          d={`${svgPath(graphPoints, bezierCommand)} ${lineCommand([
            w,
            h
          ])} ${lineCommand([0, h])}`}
          fill={`url(#${gradientId})`}
          strokeWidth={0}
        />
        <path
          d={svgPath(graphPoints, bezierCommand)}
          strokeWidth="2px"
          fill="none"
        />
      </Svg>
    </Box>
  )
}
