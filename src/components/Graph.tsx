import React from 'react'
import styled from '@emotion/styled'
import Box, { BoxProps } from '@chakra-ui/core/dist/Box'
import { useTheme } from '@chakra-ui/core/dist/ThemeProvider'
import { NoSSR } from '@47ng/chakra-next'
import { CustomTheme } from 'src/ui/theme'
// @ts-ignore
import { Chart } from 'react-charts'
import { useColorMode } from '@chakra-ui/core/dist/ColorModeProvider'

export type GraphData = {
  data: Array<{
    date: string
    value: number
  }>
}

export interface GraphProps extends GraphData, BoxProps {}

// --

const SvgGraph = () => {
  const theme = useTheme() as CustomTheme
  return (
    <defs>
      <linearGradient id="graph-gradient" x1="0" x2="0" y1="1" y2="0">
        <stop
          offset="0%"
          stopColor={theme.colors.accent[200]}
          stopOpacity={0}
        />
        <stop
          offset="100%"
          stopColor={theme.colors.accent[500]}
          stopOpacity={0.2}
        />
      </linearGradient>
    </defs>
  )
}

// --

const Container = styled(Box)`
  svg {
    overflow: visible !important;
  }
  g.Series > g > path:first-of-type {
    stroke-width: 0 !important;
  }
  .tooltip-wrap > div {
    z-index: 2;
  }
`

// --

export const Graph: React.FC<GraphProps> = ({ data, ...props }) => {
  const theme = useTheme() as CustomTheme
  const { colorMode } = useColorMode()
  const graphData = React.useMemo(
    () => [
      {
        label: 'NPM Downloads',
        data: data.map(({ date, value }) => [new Date(date), value])
      }
    ],
    [data]
  )
  const series = React.useCallback(
    () => ({
      type: 'area'
    }),
    []
  )
  const getSeriesStyle = React.useCallback(
    () => ({
      line: {
        fill: `url(#graph-gradient)`,
        strokeWidth: '2px',
        stroke: theme.colors.accent[colorMode === 'light' ? 500 : 300]
      }
    }),
    [colorMode]
  )
  const axes = React.useMemo(
    () => [
      { primary: true, type: 'utc', position: 'bottom', show: false },
      { type: 'linear', position: 'left', show: false }
    ],
    []
  )
  const tooltip = React.useMemo(
    () => ({
      show: true,
      zIndex: 4000
    }),
    []
  )

  if (graphData.length === 0) {
    return null
  }
  return (
    <NoSSR>
      <>
        <Container {...props}>
          <Chart
            data={graphData}
            series={series}
            axes={axes}
            tooltip={tooltip}
            getSeriesStyle={getSeriesStyle}
            renderSVG={SvgGraph}
          />
        </Container>
      </>
    </NoSSR>
  )
}
