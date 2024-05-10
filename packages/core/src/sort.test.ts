import { describe, expect, it } from 'vitest'

import { alphabetical, sort } from './sort'

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

describe('alphabetical', () => {
  it('sorts strings alphabetically', () => {
    const arr = ['b', 'a', 'c']
    expect(alphabetical(arr)).toEqual(['a', 'b', 'c'])

    const arrChineseName = ['张三', '王五', '李四', '赵六', '钱七']
    expect(alphabetical(arrChineseName, { locales: 'zh-Hans-CN' })).toMatchInlineSnapshot(`
      [
        "李四",
        "钱七",
        "王五",
        "张三",
        "赵六",
      ]
    `)
  })

  it('sorts strings alphabetically in descending order', () => {
    const arr = ['b', 'a', 'c']
    expect(alphabetical(arr, { desc: true })).toEqual(['c', 'b', 'a'])
  })

  it('sorts objects alphabetically', () => {
    const arr = [{ name: 'b' }, { name: 'a' }, { name: 'c' }]
    expect(alphabetical(arr, { getter: item => item.name })).toEqual([
      { name: 'a' },
      { name: 'b' },
      { name: 'c' },
    ])
  })

  it('sorts objects alphabetically in descending order', () => {
    const arr = [{ name: 'b' }, { name: 'a' }, { name: 'c' }]
    expect(alphabetical(arr, { getter: item => item.name, desc: true })).toEqual([
      { name: 'c' },
      { name: 'b' },
      { name: 'a' },
    ])
  })

  it('return a new array', () => {
    const arr = ['b', 'a', 'c']
    const res = alphabetical(arr)
    expect(res).toEqual(['a', 'b', 'c'])
    expect(res).not.toBe(arr)
  })
})
