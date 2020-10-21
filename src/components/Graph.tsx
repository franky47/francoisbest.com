import React from 'react'
import styled from '@emotion/styled'
import PseudoBox, { PseudoBoxProps } from '@chakra-ui/core/dist/PseudoBox'
import { useTheme } from '@chakra-ui/core/dist/ThemeProvider'
import { NoSSR } from '@47ng/chakra-next'
import { CustomTheme } from 'src/ui/theme'
// @ts-ignore
import { Chart } from 'react-charts'

export type GraphData = {
  data: Array<{
    date: string
    value: number
  }>
}

export interface GraphProps extends GraphData, PseudoBoxProps {}

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

const Container = styled(PseudoBox)`
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
  const graphData = React.useMemo(
    () => [
      {
        label: 'Downloads',
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
        stroke: theme.colors.accent[500]
      }
    }),
    []
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
