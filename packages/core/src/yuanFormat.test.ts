import { afterEach, describe, expect, it, vi } from 'vitest'
import { yuanFormat } from './yuanFormat'

describe('yuanFormat', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })
  it('should return "-" when input is not finite number', () => {
    expect(yuanFormat(null as any)).toBe('-')
    expect(yuanFormat(undefined as any)).toBe('-')
    expect(yuanFormat('' as any)).toBe('-')
    expect(yuanFormat('abc' as any)).toBe('-')
    expect(yuanFormat({} as any)).toBe('-')
    expect(yuanFormat([] as any)).toBe('-')
    expect(yuanFormat(true as any)).toBe('-')
    expect(yuanFormat(false as any)).toBe('-')
    expect(yuanFormat(Number.NaN as any)).toBe('-')
    expect(yuanFormat(Number.POSITIVE_INFINITY)).toBe('-')
    expect(yuanFormat(Number.NEGATIVE_INFINITY)).toBe('-')
    expect(yuanFormat(Number.POSITIVE_INFINITY, { unit: 'yuan' })).toBe('-')
    expect(yuanFormat(Number.NEGATIVE_INFINITY, { unit: 'yuan' })).toBe('-')
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
  it('negative', () => {
    expect(yuanFormat(-100)).toMatchInlineSnapshot('"-1.00"')
    expect(yuanFormat(-1000000, { unit: 'yuan' })).toMatchInlineSnapshot(`"-1,000,000.00"`)
    expect(yuanFormat(-9432432.34, { unit: 'yuan'})).toMatchInlineSnapshot(`"-9,432,432.34"`)
  })

  describe('prefix option', () => {
    it('should work with prefix: true (¥)', () => {
      expect(yuanFormat(100, { prefix: true })).toBe('¥1.00')
      expect(yuanFormat(100000, { prefix: true })).toBe('¥1,000.00')
      expect(yuanFormat(100, { prefix: true, unit: 'yuan' })).toBe('¥100.00')
      expect(yuanFormat(-100, { prefix: true })).toBe('¥-1.00')
    })

    it('should work with custom prefix string', () => {
      expect(yuanFormat(100, { prefix: '$' })).toBe('$1.00')
      expect(yuanFormat(100000, { prefix: 'USD' })).toBe('USD1,000.00')
      expect(yuanFormat(100, { prefix: '€', unit: 'yuan' })).toBe('€100.00')
      expect(yuanFormat(-100, { prefix: 'RMB' })).toBe('RMB-1.00')
    })

    it('should work without prefix (undefined)', () => {
      expect(yuanFormat(100)).toBe('1.00')
      expect(yuanFormat(100, { prefix: undefined })).toBe('1.00')
      expect(yuanFormat(100000)).toBe('1,000.00')
    })
  })

  describe('space option', () => {
    it('should add space between prefix and amount when space: true', () => {
      expect(yuanFormat(100, { prefix: true, space: true })).toBe('¥ 1.00')
      expect(yuanFormat(100000, { prefix: true, space: true })).toBe('¥ 1,000.00')
      expect(yuanFormat(100, { prefix: '$', space: true })).toBe('$ 1.00')
      expect(yuanFormat(100, { prefix: 'USD', space: true })).toBe('USD 1.00')
      expect(yuanFormat(-100, { prefix: true, space: true })).toBe('¥ -1.00')
    })

    it('should not add space when space: false or undefined', () => {
      expect(yuanFormat(100, { prefix: true, space: false })).toBe('¥1.00')
      expect(yuanFormat(100, { prefix: true })).toBe('¥1.00')
      expect(yuanFormat(100, { prefix: '$', space: false })).toBe('$1.00')
      expect(yuanFormat(100, { prefix: '$' })).toBe('$1.00')
    })

    it('should ignore space option when prefix is undefined', () => {
      expect(yuanFormat(100, { space: true })).toBe('1.00')
      expect(yuanFormat(100, { prefix: undefined, space: true })).toBe('1.00')
    })
  })

  describe('combined prefix and space options', () => {
    it('should work with all combinations', () => {
      // prefix: true, space: true
      expect(yuanFormat(12345, { prefix: true, space: true })).toBe('¥ 123.45')
      // prefix: string, space: true
      expect(yuanFormat(12345, { prefix: 'CNY', space: true })).toBe('CNY 123.45')
      // prefix: true, space: false
      expect(yuanFormat(12345, { prefix: true, space: false })).toBe('¥123.45')
      // prefix: string, space: false
      expect(yuanFormat(12345, { prefix: 'CNY', space: false })).toBe('CNY123.45')
      // with unit: yuan
      expect(yuanFormat(123.45, { prefix: true, space: true, unit: 'yuan' })).toBe('¥ 123.45')
      expect(yuanFormat(123456.78, { prefix: 'USD', space: true, unit: 'yuan' })).toBe('USD 123,456.78')
    })
  })

  describe('error cases with prefix and space', () => {
    it('should return "-" when input is invalid even with prefix/space options', () => {
      expect(yuanFormat(null as any, { prefix: true, space: true })).toBe('-')
      expect(yuanFormat('abc' as any, { prefix: '$', space: true })).toBe('-')
      expect(yuanFormat(Number.NaN, { prefix: true })).toBe('-')
    })
  })
})
