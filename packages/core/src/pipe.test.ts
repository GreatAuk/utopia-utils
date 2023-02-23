import { pipe } from './pipe'

describe('pipe', () => {
  it('pipes from left to right', () => {
    const double = (x: number) => x * 2
    const square = (x: number) => x * x
    expect(pipe(square)(5)).toBe(25)
    expect(pipe(square, double)(5)).toBe(50)
    expect(pipe(double, square, double)(5)).toBe(200)
  })

  it('pipes functions from left to right', () => {
    const a = (next: (x: string) => string) => (x: string) => next(`${x}a`)
    const b = (next: (x: string) => string) => (x: string) => next(`${x}b`)
    const c = (next: (x: string) => string) => (x: string) => next(`${x}c`)
    const final = (x: string) => x

    expect(pipe(a, b, c)(final)('')).toBe('cba')
    expect(pipe(b, c, a)(final)('')).toBe('acb')
    expect(pipe(c, a, b)(final)('')).toBe('bac')
  })

  it('throws at runtime if argument is not a function', () => {
    type sFunc = (x: number, y: number) => number
    const square = (x: number) => x * x

    expect(
      () => pipe(false as unknown as sFunc, square)(1, 2))
      .toThrow()
    expect(
      () => pipe(undefined as unknown as sFunc, square)(1, 2))
      .toThrow()
    expect(
      () => pipe(true as unknown as sFunc, square)(1, 2))
      .toThrow()
    expect(
      () => pipe(NaN as unknown as sFunc, square)(1, 2))
      .toThrow()
    expect(
      () => pipe('42' as unknown as sFunc, square)(1, 2)).toThrow()
  })

  it('can be seeded with multiple arguments', () => {
    const square = (x: number) => x * x
    const add = (x: number, y: number) => x + y
    expect(pipe(add, square)(1, 2)).toBe(9)
  })

  it('returns the given arguments if given no functions', () => {
    expect(pipe()(1, 2)).toEqual([1, 2])
    expect(pipe()(3)).toEqual([3])
  })
})
