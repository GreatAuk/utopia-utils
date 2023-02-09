import { isFunction, isNumber } from '@utopia-utils/share'

/**
 * returns a function that can call the original function the specified number of times.
 *
 * if call times more than limit, return latest called value
 * @param {T} fn - The function to call
 * @param [limit=1] - The number of times the function can be called.
 * @returns {Function} new function that calls the original function the specified number of times
 * @example
 * ```ts
    const add = (a: number, b: number) => a + b
    const addLimit = callLimit(add, 1)
    const res = addLimit(1, 1)
    const res2 = addLimit(1, 2)
    expect(res).toEqual(2)
    expect(res2).toEqual(2) // if call times more than limit, return latest called value
 * ```
 */
export function callLimit<T extends (...args: any[]) => any>(fn: T, limit = 1) {
  if (!isFunction(fn))
    throw new TypeError('fn expected a function')

  if (!isNumber(limit))
    throw new TypeError('limit expected a number')

  let cachedValue: ReturnType<T>
  return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    if (--limit >= 0)
      cachedValue = fn.apply(this, args)
    // if limit < 0, can not call fn again

    return cachedValue
  }
}
