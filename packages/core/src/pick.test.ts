import { describe, expect, it } from 'vitest'
import { pick } from './pick'

describe('pick', () => {
  it('should works', () => {
    const obj = { a: 1, b: 2, c: 3 }
    const res = pick(obj, ['a', 'b'])
    const res2 = pick(obj, 'a')
    expect(res).toEqual({ a: 1, b: 2 })
    expect(res2).toEqual({ a: 1 })
  })
  it('pick null', () => {
    // @ts-expect-error for test
    const res = pick(null, 'a')
    expect(res).toEqual({})
  })
})
