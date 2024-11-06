import { describe, expect, it } from 'vitest'

import { arrLast } from './arrLast'

describe('arrLast', () => {
  it('should return the last element of an array', () => {
    expect(arrLast([1, 2, 3, 4, 5])).toBe(5)
    expect(arrLast([[1, 2, 3], [4, 5, 6], [7, 8, 9]])).toEqual([7, 8, 9])
    expect(arrLast([{ a: 1 }, { b: 2 }, { c: 3 }, { d: 4 }])).toEqual({ d: 4 })
    expect(arrLast(['a', 1, true, /r/g])).toEqual(/r/g)
    expect(arrLast([1])).toBe(1)
    expect(arrLast([])).toBe(undefined)
    expect(arrLast<string[]>([], 'he')).toBe('he')
  })
  it('should work with readonly arrays', () => {
    const arr = [1, 2, 3, 4, 5] as const
    const val = arrLast(arr)
    expect(val).toBe(5)
  })
  it('should work with dynamic arrays and not just static ones', () => {
    const dynArr = [1, 2, 3]
    dynArr.push(4)
    const test8: number = arrLast(dynArr)
    expect(test8).toBe(4)
    const dynArr2: (number | string)[] = [1, 2]
    dynArr2.push('hi')
    const test9: number | string = arrLast(dynArr2)
    expect(test9).toBe('hi')
  })
  it('should throw an error if the input is not an array', () => {
    // @ts-expect-error for test
    expect(() => arrLast({})).toThrowError('Expected an Array')
    // @ts-expect-error for test
    expect(() => arrLast(undefined)).toThrowError('Expected an Array')
    // @ts-expect-error for test
    expect(() => arrLast(null)).toThrowError('Expected an Array')
    // @ts-expect-error for test
    expect(() => arrLast()).toThrowError('Expected an Array')
  })
})
