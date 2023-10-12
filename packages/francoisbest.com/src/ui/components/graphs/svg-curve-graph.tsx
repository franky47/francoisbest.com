import dayjs from 'dayjs'
import React from 'react'
import { twJoin, twMerge } from 'tailwind-merge'
import { formatNumber } from 'ui/format'

// Source:
// https://medium.com/@francoisromain/smooth-a-svg-path-with-cubic-bezier-curves-e37b49d46c74

export type SvgCurveGraphProps = React.ComponentProps<'svg'> & {
  data: number[]
  width?: number
  height?: number
  mt?: number
  mb?: number
  lastDate: Date
}

type Point = [number, number]

type CommandFn = (point: Point, index: number, array: Point[]) => string

const FLOAT_DECIMALS = 4

// --

function formatGraphData(
  data: number[],
  scale: { w: number; h: number; mt: number; mb: number }
) {
  const actualH = scale.h - scale.mt - scale.mb
  const { min: minY, max: maxY } = data.reduce(
    ({ min, max }, value) => ({
      min: Math.min(min, value),
      max: Math.max(max, value),
    }),
    { min: Infinity, max: -Infinity }
  )
  const scaleX = scale.w / (data.length - 1)
  const scaleY = actualH / (maxY - minY)
  const points: Point[] = data.map((value, i) => [
    i * scaleX,
    scale.mt + scaleY * (maxY - value),
  ])
  return points
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
    angle: Math.atan2(lengthY, lengthX),
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
    coordinates(point[0], point[1]),
  ].join(' ')
}

// --

export const SvgCurveGraph: React.FC<SvgCurveGraphProps> = ({
  data,
  width: w = 600,
  height: h = 120,
  mt = 4,
  mb = 56,
  lastDate,
  className,
  ...props
}) => {
  const gradientId = React.useId()
  const graphPoints = formatGraphData(data, { w, h, mt, mb })
  if (graphPoints.length === 0) {
    return null
  }
  const sum = data.reduce((sum, x) => sum + x)
  // Floating point errors can cause subpixel gaps between "bars"
  // and cause hover state to be dropped. Adding this margin closes this gap.
  const mx = 0.0001 * w
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${w} ${h}`}
      overflow="visible"
      className={twMerge(className)}
      {...props}
    >
      <defs>
        <linearGradient id={gradientId} x1="0" x2="0" y1="1" y2="0">
          <stop offset="0%" stopColor="currentColor" stopOpacity={0} />
          <stop offset="100%" stopColor="currentColor" stopOpacity={0.2} />
        </linearGradient>
      </defs>
      <g className="group/all">
        <g>
          <path
            // Background gradient
            d={`${svgPath(graphPoints, bezierCommand)} ${lineCommand([
              w,
              h,
            ])} ${lineCommand([0, h])}`}
            fill={`url(#${gradientId})`}
            strokeWidth={0}
          />
          <path
            // Curve
            d={svgPath(graphPoints, bezierCommand)}
            strokeWidth="2px"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
        <g className="opacity-0 group-hover/all:opacity-100">
          {graphPoints.map(([x, y], i) => (
            <g className="group/bar" key={i}>
              <rect
                // This sets the size of the <g> group above
                // so we can catch hover states on it.
                x={x - (0.5 * w) / (graphPoints.length - 1) - mx}
                y={mt}
                width={w / (graphPoints.length - 1) + 2 * mx}
                height={h}
                fill="transparent"
              />
              <circle
                cx={x}
                cy={y}
                r={3}
                strokeWidth={2}
                className={twJoin(
                  'opacity-0 transition-opacity ease-out group-hover/bar:opacity-100 group-hover/all:transition-none',
                  'stroke-current',
                  'fill-white dark:fill-gray-900'
                )}
              />
              <text
                className={twJoin(
                  'select-none fill-current text-sm font-semibold tabular-nums',
                  // Fade in and out when the whole graph is hovered, but
                  // don't fade between bars
                  'opacity-0 transition-opacity ease-out group-hover/bar:opacity-100 group-hover/all:transition-none'
                )}
                strokeWidth={2.5}
                strokeLinejoin="round"
                x={w}
                y={h}
                dx={-8}
                dy={-20}
                textAnchor="end"
              >
                {formatNumber(data[i])}
              </text>
              <text
                className={twJoin(
                  'select-none fill-gray-500 text-xs tabular-nums',
                  // Fade in and out when the whole graph is hovered, but
                  // don't fade between bars
                  'opacity-0 transition-opacity ease-out group-hover/bar:opacity-100 group-hover/all:transition-none'
                )}
                strokeWidth={2.5}
                strokeLinejoin="round"
                x={w}
                y={h}
                dy={-4}
                dx={-8}
                textAnchor="end"
              >
                {dayjs(lastDate)
                  .subtract(data.length - 1 - i, 'day')
                  .format('DD MMM')}
              </text>
            </g>
          ))}
        </g>
        <g className="pointer-events-none select-none opacity-100 group-hover/all:opacity-0">
          <text
            className="fill-current text-sm font-semibold tabular-nums"
            strokeWidth={2.5}
            strokeLinejoin="round"
            x={w}
            y={h}
            dx={-8}
            dy={-20}
            textAnchor="end"
          >
            {formatNumber(sum)}
          </text>
          <text
            className="fill-gray-500 text-xs tabular-nums"
            strokeWidth={2.5}
            strokeLinejoin="round"
            x={w}
            y={h}
            dy={-4}
            dx={-8}
            textAnchor="end"
          >
            Last {data.length} days
          </text>
        </g>
      </g>
    </svg>
  )
}
