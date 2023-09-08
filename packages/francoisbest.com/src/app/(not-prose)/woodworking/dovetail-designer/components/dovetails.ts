export type DovetailParameters = {
  jointWidth: number
  numTails: number
  pinsBoardThickness: number
  angleRatio: number
  pinToTailRatio: number
  halfPinRatio: number
}

export function getDovetailData({
  numTails,
  pinToTailRatio,
  pinsBoardThickness,
  jointWidth,
  halfPinRatio,
  angleRatio,
}: DovetailParameters) {
  const n = numTails
  const b =
    jointWidth /
    (2 * (pinToTailRatio * halfPinRatio) + n + (n - 1) * pinToTailRatio)
  const c = pinToTailRatio * b
  const a = halfPinRatio * c
  const rake = pinsBoardThickness / angleRatio
  const a_ = a + rake
  const b_ = b - 2 * rake
  const c_ = c + 2 * rake

  return {
    a,
    b,
    c,
    a_,
    b_,
    c_,
    n,
    w: jointWidth,
    tp: pinsBoardThickness,
    angleDegrees: 90 - (Math.atan(1 / angleRatio) * 180) / Math.PI,
  }
}

export type DovetailData = ReturnType<typeof getDovetailData>

// --

export function getDovetailPath({
  n,
  a,
  b,
  c,
  a_,
  b_,
  c_,
  w,
  tp,
}: DovetailData) {
  const points = [[0, tp]]
  Array(n)
    .fill(undefined)
    .forEach((_, index) => {
      points.push(
        [a_ + index * (b_ + c_), tp],
        [a + index * (b + c), 0],
        [a + index * (b + c) + b, 0],
        [a_ + index * (b_ + c_) + b_, tp]
      )
    })
  points.push([w, tp], [w, 3 * tp], [0, 3 * tp])
  return [
    `M ${points[0][0]} ${points[0][1]}`,
    ...points.slice(1).map(([x, y]) => `L ${x} ${y}`),
    'Z', // close the path
  ].join(' ')
}

export function getDovetailMeasurements({ a, b, c, c_, b_ }: DovetailData) {
  return {
    dividersLength: a + b,
    pinNarrowWidth: c,
    pinWideWidth: c_,
    halfPinNarrowWidth: a,
    distanceBetweenPins: b_,
  }
}
