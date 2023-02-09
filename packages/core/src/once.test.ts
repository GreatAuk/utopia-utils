import { once } from './once'

describe('once call', () => {
  it('should works', () => {
    const fn1 = vi.fn()
    const fn1_ = once(fn1)
    fn1_()
    fn1_()
    fn1_()
    fn1_()
    expect(fn1).toHaveBeenCalledTimes(1)
  })
  it('if call times more than 1, return latest called value', () => {
    const add = (a: number, b: number) => a + b
    const add_ = once(add)
    const res = add_(1, 1)
    const res2 = add_(1, 2)
    const res3 = add_(1, 3)
    expect(res).toEqual(2)
    expect(res2).toEqual(2)
    expect(res3).toEqual(2)
  })
})
