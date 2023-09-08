import React from 'react'

// Source:
// https://medium.com/@francoisromain/smooth-a-svg-path-with-cubic-bezier-curves-e37b49d46c74

export type SvgCurveGraphProps = React.ComponentProps<'svg'> & {
  data: number[]
  width?: number
  height?: number
  mt?: number
  mb?: number
  showValues?: boolean
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
    scale.mt + scaleY * (maxY - value + minY),
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
  showValues = true,
  className,
  ...props
}) => {
  const gradientId = React.useId()
  const graphPoints = React.useMemo(
    () => formatGraphData(data, { w, h, mt, mb }),
    [data, w, h, mt, mb]
  )
  if (graphPoints.length === 0) {
    return null
  }
  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      overflow="visible"
      className={className}
      {...props}
    >
      <defs>
        <linearGradient id={gradientId} x1="0" x2="0" y1="1" y2="0">
          <stop offset="0%" stopColor="currentColor" stopOpacity={0} />
          <stop offset="100%" stopColor="currentColor" stopOpacity={0.2} />
        </linearGradient>
      </defs>
      <path
        d={`${svgPath(graphPoints, bezierCommand)} ${lineCommand([
          w,
          h,
        ])} ${lineCommand([0, h])}`}
        fill={`url(#${gradientId})`}
        strokeWidth={0}
      />
      <path
        d={svgPath(graphPoints, bezierCommand)}
        strokeWidth="2px"
        fill="none"
        stroke="currentColor"
      />
      {showValues && (
        <g>
          {graphPoints.map(([x, y], i) => (
            <React.Fragment key={i}>
              <g className="group/bar">
                <rect
                  // This sets the size of the <g> group above
                  x={x - (0.5 * w) / (graphPoints.length - 1)}
                  y={0}
                  width={w / (graphPoints.length - 1)}
                  height={h}
                  fill="transparent"
                />
                <text
                  className="text-xs font-medium opacity-0 group-hover/bar:opacity-100 text-current select-none stroke-white dark:stroke-gray-900"
                  style={{
                    paintOrder: 'stroke',
                  }}
                  fill="currentColor"
                  strokeWidth={2.5}
                  strokeLinejoin="round"
                  x={x}
                  y={y}
                  dy={-8}
                  textAnchor="middle"
                >
                  {data[i]}
                </text>
                <circle
                  cx={x}
                  cy={y}
                  r={3}
                  fill="currentColor"
                  className="opacity-0 group-hover/bar:opacity-100"
                />
              </g>
            </React.Fragment>
          ))}
        </g>
      )}
    </svg>
  )
}
