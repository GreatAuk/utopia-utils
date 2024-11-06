import { deepEqual } from './deepEqual'

describe('deepEqual', () => {
  it('number equal', () => {
    expect(deepEqual(1, 1)).toBe(true)
    expect(deepEqual(1, 2)).toBe(false)
    expect(deepEqual(1, '1')).toBe(false)
    expect(deepEqual(-0, 0)).toBe(true)
    expect(deepEqual(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY)).toBe(true)
  })
  it('bigint equal', () => {
    expect(deepEqual(BigInt(1), BigInt(1))).toBe(true)
    expect(deepEqual(BigInt(1), BigInt(2))).toBe(false)
  })
  it('string equal', () => {
    expect(deepEqual('1', '1')).toBe(true)
    expect(deepEqual('1', '2')).toBe(false)
  })
  it('array equal', () => {
    expect(deepEqual([1, 2, 3], [1, 2, 3])).toBe(true)
    expect(deepEqual([1, 2, 3], [1, 3, 2])).toBe(false)
    expect(deepEqual([1, 2, 3], [1, 2])).toBe(false)
    expect(deepEqual([], [])).toEqual(true)
  })
  it('object equal', () => {
    expect(deepEqual({ a: 1, b: 2 }, { a: 1, b: 2 })).toBe(true)
    expect(deepEqual({ a: 1, b: 2 }, { b: 2, a: 1 })).toBe(true)
    expect(deepEqual({ a: 1, b: 2 }, { a: 1 })).toBe(false)
    expect(deepEqual({}, {})).toBe(true)
  })
  it('date equal', () => {
    expect(deepEqual(new Date('2023-01-15'), new Date('2023-01-15'))).toBe(true)
    expect(deepEqual(new Date('2023-01-15'), new Date('2023-01-16'))).toBe(false)
  })
  it('regexp equal', () => {
    expect(deepEqual(/a/g, /a/g)).toBe(true)
    expect(deepEqual(/a/g, /a/i)).toBe(false)
  })
  it('null, undefined, 0, false, empty string equal', () => {
    expect(deepEqual(null, null)).toBe(true)
    expect(deepEqual(undefined, undefined)).toBe(true)
    expect(deepEqual(0, 0)).toBe(true)
    expect(deepEqual(false, false)).toBe(true)
    expect(deepEqual('', '')).toBe(true)
    expect(deepEqual(null, undefined)).toBe(false)
    expect(deepEqual(0, false)).toBe(false)
    expect(deepEqual('', false)).toBe(false)
  })
  it('naN equal', () => {
    expect(deepEqual(Number.NaN, Number.NaN)).toBe(true)
    expect(deepEqual(Number.NaN, 0)).toBe(false)
  })
  it('function equal', () => {
    const fn1 = () => {}
    const fn2 = () => {}
    expect(deepEqual(fn1, fn1)).toBe(true)
    expect(deepEqual(fn1, fn2)).toBe(false)
  })
  it('map equal', () => {
    expect(deepEqual(new Map(), new Map())).toBe(true)
    expect(deepEqual(new Map([[1, 2]]), new Map([[1, 2]]))).toBe(true)
    expect(deepEqual(new Map([[1, 2]]), new Map([[1, 3]]))).toBe(false)
  })
  it('set equal', () => {
    expect(deepEqual(new Set(), new Set())).toBe(true)
    expect(deepEqual(new Set([1, 2]), new Set([1, 2]))).toBe(true)
    expect(deepEqual(new Set([1, 2]), new Set([2, 1]))).toBe(true)
    expect(deepEqual(new Set([1, 2]), new Set([1, 3]))).toBe(false)
  })
})
