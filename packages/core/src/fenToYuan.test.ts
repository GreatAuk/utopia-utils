import { afterEach, describe, expect, it, vi } from 'vitest'

import { fenToYuan } from './fenToYuan'

describe('fenToYuan', () => {
  afterEach(() => {
    vi.resetAllMocks()
  })
  it('should return undefined when input is not number', () => {
    expect(fenToYuan(null as any)).toBe(undefined)
    expect(fenToYuan(undefined as any)).toBe(undefined)
    expect(fenToYuan('' as any)).toBe(undefined)
    expect(fenToYuan('abc' as any)).toBe(undefined)
    expect(fenToYuan({} as any)).toBe(undefined)
    expect(fenToYuan([] as any)).toBe(undefined)
    expect(fenToYuan(true as any)).toBe(undefined)
    expect(fenToYuan(false as any)).toBe(undefined)
    expect(fenToYuan(Number.NaN as any)).toBe(undefined)
  })
  it('happy path', () => {
    expect(fenToYuan(0)).toBe(0)
    expect(fenToYuan(1)).toBe(0.01)
    expect(fenToYuan(100)).toBe(1)
    expect(fenToYuan(1000)).toBe(10)
    expect(fenToYuan(99)).toBe(0.99)
    expect(fenToYuan(10000)).toBe(100)
    expect(fenToYuan(100000)).toBe(1000)
    expect(fenToYuan(1000000000000000000)).toBe(10000000000000000)
    expect(fenToYuan(10000000000000000000)).toBe(100000000000000000)
  })
  it('should return null if throw error', () => {
    vi.spyOn(Number, 'isNaN').mockImplementation(() => {
      throw new Error('mock error')
    })
    expect(fenToYuan(100)).toBe(undefined)
  })
})
