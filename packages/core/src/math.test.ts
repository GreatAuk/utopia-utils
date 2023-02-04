import { describe, expect, it } from 'vitest'

import { toFixed } from './math'

describe('toFixed', () => {
  it('should work', () => {
    expect(toFixed(0.615, 2)).toBe(0.61)
    expect(toFixed(10, 2)).toBe(10)
    expect(toFixed(1.005, 2)).toBe(1)
  })
})
