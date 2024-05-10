import { describe, expect, it } from 'vitest'

import { sort } from './sort'

describe('sort', () => {
  it('sorts numbers in ascending order', () => {
    expect(sort([3, 1, 2])).toEqual([1, 2, 3])
  })
  it('sorts numbers in descending order', () => {
    expect(sort([3, 1, 2], { desc: true })).toEqual([3, 2, 1])
  })
  it('sorts objects in ascending order', () => {
    const arr = [{ value: 3 }, { value: 1 }, { value: 2 }]
    expect(sort(arr, { getter: item => item.value })).toEqual([{ value: 1 }, { value: 2 }, { value: 3 }])
  })
  it('sorts objects in descending order', () => {
    const arr = [{ value: 3 }, { value: 1 }, { value: 2 }]
    expect(sort(arr, { getter: item => item.value, desc: true })).toEqual([{ value: 3 }, { value: 2 }, { value: 1 }])
  })
  it('return a new array', () => {
    const arr = [3, 1, 2]
    const sorted = sort(arr)
    expect(sorted).toEqual([1, 2, 3])
    expect(sorted).not.toBe(arr)
  })
})
