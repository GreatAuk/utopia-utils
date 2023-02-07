import { isEmpty } from './isEmpty'

describe('isEmpty', () => {
  it('should return true if the value is empty', () => {
    expect(isEmpty([])).toBe(true)
    expect(isEmpty('')).toBe(true)
    expect(isEmpty({})).toBe(true)
    expect(isEmpty(new Map())).toBe(true)
    expect(isEmpty(new Set())).toBe(true)
    expect(isEmpty(1)).toBe(true)
    expect(isEmpty(null)).toBe(true)
  })

  it('should return false if the value is not empty', () => {
    expect(isEmpty([1])).toBe(false)
    expect(isEmpty('a')).toBe(false)
    expect(isEmpty({ a: 1 })).toBe(false)
    expect(isEmpty(new Map([['a', 1]]))).toBe(false)
    expect(isEmpty(new Set([1]))).toBe(false)
  })
})
