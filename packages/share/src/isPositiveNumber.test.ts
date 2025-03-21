import { isPositiveNumber } from './isPositiveNumber'

describe('isPositiveNumber', () => {
  it('should return true if the value is a positive number', () => {
    expect(isPositiveNumber(1)).toBe(true)
    expect(isPositiveNumber(1.1)).toBe(true)
    expect(isPositiveNumber(1.1e2)).toBe(true)
    expect(isPositiveNumber(Infinity)).toBe(true)
  })

  it('should return false if the value is not a positive number', () => {
    expect(isPositiveNumber(-1)).toBe(false)
    expect(isPositiveNumber(0)).toBe(false)
    expect(isPositiveNumber(NaN)).toBe(false)
  })

  it('should return false if the value is not a number', () => {
    expect(isPositiveNumber(null)).toBe(false)
    expect(isPositiveNumber(undefined)).toBe(false)
    expect(isPositiveNumber({})).toBe(false)
    expect(isPositiveNumber([])).toBe(false)
    expect(isPositiveNumber('')).toBe(false)
  })
})