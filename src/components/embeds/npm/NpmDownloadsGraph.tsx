import React from 'react'
import styled from '@emotion/styled'
import { Box, BoxProps, useTheme, useColorMode } from '@chakra-ui/react'
import dayjs from 'dayjs'
// @ts-ignore
import { Chart } from 'react-charts'
import { ColorKeys } from 'src/ui/theme'
import { formatDate } from 'src/ui/format'

export interface NpmDownloadsGraphProps extends BoxProps {
  downloads: number[]
  lastDate: string
  accentKey?: ColorKeys
}

type GraphData = Array<[string, number]>

// --

function formatGraphData(downloads: number[], lastDate: string): GraphData {
  const ref = dayjs(lastDate)
  return downloads.map((value, i) => [
    formatDate(ref.subtract(downloads.length - i, 'day').toDate()),
    value
  ])
}

// --

const SvgGraph = (accentKey: ColorKeys = 'accent') => () => {
  const theme = useTheme()
  return (
    <defs>
      <linearGradient
        id={`graph-gradient-${accentKey}`}
        x1="0"
        x2="0"
        y1="1"
        y2="0"
      >
        <stop
          offset="0%"
          stopColor={theme.colors[accentKey][200]}
          stopOpacity={0}
        />
        <stop
          offset="100%"
          stopColor={theme.colors[accentKey][500]}
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

export const NpmDownloadsGraph: React.FC<NpmDownloadsGraphProps> = ({
  downloads,
  lastDate,
  accentKey = 'accent',
  ...props
}) => {
  const theme = useTheme()
  const { colorMode } = useColorMode()
  const graphData = React.useMemo(
    () => [
      {
        label: 'NPM Downloads',
        data: formatGraphData(downloads, lastDate)
      }
    ],
    [downloads]
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
        fill: `url(#graph-gradient-${accentKey})`,
        strokeWidth: '2px',
        stroke: theme.colors.accent[colorMode === 'light' ? 500 : 300]
      }
    }),
    [colorMode, accentKey]
  )
  const axes = React.useMemo(
    () => [
      { primary: true, type: 'ordinal', position: 'bottom', show: false },
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
    <Container
      {...props}
      m={0}
      mr={['-15px', '-22px']}
      ml={['-28px', '-43px']}
      overflowX="hidden"
      overflowY="visible"
    >
      <Chart
        data={graphData}
        series={series}
        axes={axes}
        tooltip={tooltip}
        getSeriesStyle={getSeriesStyle}
        renderSVG={SvgGraph(accentKey)}
      />
    </Container>
  )
}
