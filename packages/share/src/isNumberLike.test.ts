import { describe, expect, it } from 'vitest'

import { isNumberLike } from './isNumberLike'

describe('isNumberLike', () => {
  it('should return true', () => {
    const testCases = [
      [0.2, true],
      [5, true],
      ['0.2', true],
      ['5', true],
      [-1, true],
      [Number.POSITIVE_INFINITY, true],
      ['Infinity', true],
      [1.1e2, true],
      ['1.1e2', true],
      [Number.EPSILON, true],
      [Number.MAX_SAFE_INTEGER, true],
      [Number.MAX_VALUE, true],
      [Number.MIN_SAFE_INTEGER, true],
      [Number.MIN_VALUE, true],
    ]
    testCases.forEach(([input, expected]) => {
      expect(isNumberLike(input)).toBe(expected)
    })
  })

  it('should return false', () => {
    const testCases = [
      [Number.NaN, false],
      ['NaN', false],
      ['', false],
      [' ', false],
      ['-', false],
      [null, false],
      [undefined, false],
      ['1.1.1', false],
      [[], false],
      [{}, false],
      ['1.1.e2', false],
      [false, false],
      [true, false],
      [function foo() {}, false],
    ]
    testCases.forEach(([input, expected]) => {
      expect(isNumberLike(input)).toBe(expected)
    })
  })
})
