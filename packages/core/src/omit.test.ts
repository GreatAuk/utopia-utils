import { omit } from './omit'

describe('omit', () => {
  it('should omit a key', () => {
    expect(omit({ a: 1, b: 2 }, 'a')).toEqual({ b: 2 })
  })

  it('should omit multiple keys', () => {
    expect(omit({ a: 1, b: 2, c: 3 }, ['a', 'c'])).toEqual({ b: 2 })
  })

  it('invalidate key', () => {
    // @ts-expect-error just for test
    expect(omit({ a: 1, b: 2, c: 3 }, 'd')).toEqual({ a: 1, b: 2, c: 3 })
  })
  it('readonly object', () => {
    const obj = { a: 1, b: 2, c: 3 } as const
    expect(omit(obj, ['a'])).toEqual({ b: 2, c: 3 })
  })
})
