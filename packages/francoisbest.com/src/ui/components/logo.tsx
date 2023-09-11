import React from 'react'
import { twMerge } from 'tailwind-merge'

const sizes = {
  6: 'w-6 h-6',
  8: 'w-8 h-8',
  16: 'w-16 h-16',
} as const

type LogoProps = React.ComponentProps<'svg'> & {
  size?: keyof typeof sizes
  background?: boolean
}

export const Logo: React.FC<LogoProps> = ({
  size = 8,
  background = true,
  className,
  ...props
}) => {
  const wh = sizes[size]
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Logo"
      viewBox="0 0 148 144"
      width={size * 4 + 'px'}
      height={size * 4 + 'px'}
      className={twMerge(wh, 'overflow-visible', className)}
      {...props}
    >
      {background && <circle fill="#fff" cx="74" cy="72" r="85" />}
      <path
        d="M99.4622 61.7822C99.6547 64.3862 97.4912 66.0106 96.2381 67.6166C92.354 72.5825 88.3737 77.5347 83.9525 82.205C74.3494 82.705 62.9984 82.7484 53.5484 83.1259C51.744 83.1972 49.2684 83.8309 48.6347 82.0513C48.3722 79.4031 50.6115 77.81 51.8587 76.2166C55.7303 71.2644 59.6778 66.3819 63.9903 61.6284C73.8815 61.0584 85.4056 61.1609 95.1631 60.7072C96.769 60.63 98.925 60.0991 99.4622 61.7822ZM109.291 19.5531C110.909 18.3309 112.694 17.3069 113.744 16.0213C114.556 15.0294 116.073 12.6878 116.047 10.9538C116.003 8.06813 111.959 2.36688 110.058 1.27938C106.219 -0.921559 103.014 3.44188 100.384 5.88594C86.9544 18.3628 75.13 31.6013 62.1475 44.5831C61.124 45.6069 60.1006 47.1678 59.0772 47.5006C57.285 48.0831 54.1687 47.8653 51.859 47.9616C43.9512 48.2944 36.4394 48.1344 28.979 47.8078C18.8184 47.36 10.584 45.1975 0.5703 45.3509C-0.30595 50.4375 2.48967 55.825 5.17717 58.5569C9.06092 62.5047 16.6044 63.0103 24.6794 63.0103C31.66 63.0103 39.1525 62.5878 45.1028 62.3959C42.4922 65.5178 39.114 69.0181 35.7359 72.8369C32.9715 75.9663 28.2497 80.0675 26.8294 84.0478C25.249 88.4753 27.8725 93.5491 29.5937 96.9469C30.9181 99.5634 32.9784 104.183 36.3506 104.778C37.4765 104.976 39.044 104.414 40.4965 104.164C44.9628 103.403 48.7694 102.302 52.1672 101.399C57.7081 99.9287 62.8906 99.5888 68.444 98.4816C60.4528 107.248 49.46 115.949 39.5753 123.512C38.0715 124.665 36.3375 125.707 35.1215 126.89C33.9125 128.068 32.089 130.641 32.0506 132.727C32.0122 134.966 33.7972 137.417 34.9684 139.176C36.184 141.006 38.0844 143.354 40.3428 143.322C42.5119 143.29 45.5125 140.04 47.2531 138.408C53.594 132.464 59.2625 126.398 65.2197 120.441C71.1831 114.478 77.2612 108.573 83.0322 102.321C84.4656 100.766 87.2362 96.89 89.0209 96.3325C90.9278 95.7378 93.8909 95.9678 96.239 95.8725C104.019 95.545 111.953 95.6928 119.273 96.025C129.395 96.4863 137.808 98.8091 147.528 98.3294C148.02 92.7109 145.724 88.1431 142.921 85.2763C135.94 78.1231 115.153 81.6284 102.996 81.4375C105.548 78.3022 108.888 74.8728 112.208 71.1491C115.235 67.7575 119.509 64.085 121.115 60.0925C122.964 55.505 120.13 50.3288 118.352 46.7331C117.001 44.0009 115.017 39.49 111.441 39.055C109.036 38.7606 105.849 39.8997 103.302 40.4369C95.439 42.0944 88.0997 44.4869 79.6544 45.3509C87.8362 36.5534 99.0975 27.2247 109.291 19.5531Z"
        fill="#2f2f2f"
        className={background ? undefined : 'dark:fill-white'}
      />
    </svg>
  )
}
