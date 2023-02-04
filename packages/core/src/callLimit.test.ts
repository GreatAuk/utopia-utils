import { describe, expect, it, vi } from 'vitest'

import { callLimit } from './callLimit'

describe('callLimit', () => {
  it('should works', () => {
    const fn1 = vi.fn()
    const fn1_ = callLimit(fn1, 2)
    fn1_()
    fn1_()
    fn1_()
    fn1_()
    expect(fn1).toHaveBeenCalledTimes(2)

    const add = (a: number, b: number) => a + b
    const add_ = callLimit(add, 1)
    const res = add_(1, 1)
    const res2 = add_(1, 1)
    expect(res).toMatchInlineSnapshot('2')
    expect(res2).toMatchInlineSnapshot('undefined')
  })
})
