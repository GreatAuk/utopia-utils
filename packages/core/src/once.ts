import { callLimit } from './callLimit'

/**
 * It takes a function and returns a new function that can only be called once
 * @param {T} fn - The function to be called.
 * @returns A function that can only be called once.
 * @example
 * ```ts
    const add = (a: number, b: number) => a + b
    const addLimit = once(add)
    const res = addLimit(1, 1)
    const res2 = addLimit(1, 2)
    expect(res).toEqual(2)
    expect(res2).toEqual(2) // if call times more than 1, return latest called value
 * ```
 * @source https://github.com/GreatAuk/utopia-utils/blob/main/packages/core/src/once.ts
 */
export function once<T extends (...args: any[]) => any>(fn: T) {
  return callLimit(fn, 1)
}
