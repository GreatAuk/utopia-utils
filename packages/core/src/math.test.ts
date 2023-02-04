import { describe, expect, it } from 'vitest'

import { average, toFixed } from './math'

describe('math functions', () => {
  it('toFixed', () => {
    expect(toFixed(0.615, 2)).toBe(0.61)
    expect(toFixed(10, 2)).toBe(10)
    expect(toFixed(1.005, 2)).toBe(1)
  })
  it('average', () => {
    expect(average(1, 2, 3)).toBe(2)
    expect(average(...[1, 2, 3])).toBe(2)
    expect(average(...[])).toBe(NaN)
  })
})
