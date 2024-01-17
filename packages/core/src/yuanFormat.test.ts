import { afterEach, describe, expect, it, vi } from 'vitest'
import { yuanFormat } from './yuanFormat'

describe('yuanFormat', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })
  it('should return "-" when input is not number', () => {
    expect(yuanFormat(null as any)).toBe('-')
    expect(yuanFormat(undefined as any)).toBe('-')
    expect(yuanFormat('' as any)).toBe('-')
    expect(yuanFormat('abc' as any)).toBe('-')
    expect(yuanFormat({} as any)).toBe('-')
    expect(yuanFormat([] as any)).toBe('-')
    expect(yuanFormat(true as any)).toBe('-')
    expect(yuanFormat(false as any)).toBe('-')
    expect(yuanFormat(NaN as any)).toBe('-')
  })
  it('happy path', () => {
    expect(yuanFormat(0)).toBe('0.00')
    expect(yuanFormat(0, { unit: 'yuan' })).toBe('0.00')
    expect(yuanFormat(1)).toBe('0.01')
    expect(yuanFormat(100)).toBe('1.00')
    expect(yuanFormat(99, { unit: 'yuan' })).toBe('99.00')
    expect(yuanFormat(1000)).toBe('10.00')
    expect(yuanFormat(324)).toBe('3.24')
    expect(yuanFormat(10000)).toBe('100.00')
    expect(yuanFormat(100000)).toBe('1,000.00')
    expect(yuanFormat(100000, { unit: 'yuan' })).toBe('100,000.00')
    expect(yuanFormat(1000000000000000000, { unit: 'yuan' })).toBe('1,000,000,000,000,000,000.00')
    // expect(yuanFormat(10000000000000000000)).toBe('100,000,000,000,000.00')
  })
  it('should return - if throw error', () => {
    vi.spyOn(Number.prototype, 'toFixed').mockImplementation(() => {
      throw new Error('mock error')
    })
    expect(yuanFormat(100)).toBe('-')
  })
  it('decimal', () => {
    expect(yuanFormat(10.23, { unit: 'yuan' })).toMatchInlineSnapshot('"10.23"')
    expect(yuanFormat(1032432.23, { unit: 'yuan' })).toMatchInlineSnapshot('"1,032,432.23"')
    expect(yuanFormat(1032432.2323, { unit: 'yuan' })).toMatchInlineSnapshot('"1,032,432.23"')
  })
})