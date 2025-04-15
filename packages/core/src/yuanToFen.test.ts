import { afterEach, describe, expect, it, vi } from 'vitest'

import { yuanToFen } from './yuanToFen'

describe('yuanToFen', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })
  it('should return undefined when input is not number', () => {
    expect(yuanToFen(null as any)).toBe(undefined)
    expect(yuanToFen(undefined as any)).toBe(undefined)
    expect(yuanToFen('' as any)).toBe(undefined)
    expect(yuanToFen('abc' as any)).toBe(undefined)
    expect(yuanToFen({} as any)).toBe(undefined)
    expect(yuanToFen([] as any)).toBe(undefined)
    expect(yuanToFen(true as any)).toBe(undefined)
    expect(yuanToFen(false as any)).toBe(undefined)
    expect(yuanToFen(Number.NaN as any)).toBe(undefined)
  })
  it('happy path', () => {
    expect(yuanToFen(0)).toBe(0)
    expect(yuanToFen(1)).toBe(100)
    expect(yuanToFen(100)).toBe(10000)
    expect(yuanToFen(1000)).toBe(100000)
    expect(yuanToFen(99)).toBe(9900)
    expect(yuanToFen(10000)).toBe(1000000)
    expect(yuanToFen(100000)).toBe(10000000)
    expect(yuanToFen(1000000000000000000)).toBe(100000000000000000000)
  })

  it('should handle string input correctly', () => {
    expect(yuanToFen('0')).toBe(0)
    expect(yuanToFen('1')).toBe(100)
    expect(yuanToFen('1.5')).toBe(150)
    expect(yuanToFen('99.99')).toBe(9999)
    expect(yuanToFen('  12.34  ')).toBe(1234)
  })

  it('should handle negative values', () => {
    expect(yuanToFen(-1)).toBe(-100)
    expect(yuanToFen(-0.01)).toBe(-1)
    expect(yuanToFen('-1.23')).toBe(-123)
  })

  it('should return undefined if throw error', () => {
    vi.spyOn(Number, 'isNaN').mockImplementation(() => {
      throw new Error('mock error')
    })
    expect(yuanToFen(100)).toBe(undefined)
  })
})
