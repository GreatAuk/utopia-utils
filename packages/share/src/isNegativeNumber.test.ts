import { isNegativeNumber } from './isNegativeNumber'

describe('isNegativeNumber', () => {
  it('should return true if the value is a negative number', () => {
    expect(isNegativeNumber(-1)).toBe(true)
    expect(isNegativeNumber(-1.1)).toBe(true)
    expect(isNegativeNumber(-1.1e2)).toBe(true)
  })

  it('should return false if the value is not a negative number', () => {
    expect(isNegativeNumber(1)).toBe(false)
    expect(isNegativeNumber('1')).toBe(false)
    expect(isNegativeNumber('-1')).toBe(false)
  })

  it('should return false if the value is not a number', () => {
    expect(isNegativeNumber(null)).toBe(false)
    expect(isNegativeNumber(undefined)).toBe(false)
    expect(isNegativeNumber({})).toBe(false)
    expect(isNegativeNumber([])).toBe(false)
    expect(isNegativeNumber('')).toBe(false)
  })
})
