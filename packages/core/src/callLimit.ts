import { isFunction, isNumber } from '@utopia-utils/share'

/**
 * returns a function that calls the original function the specified number of times
 * @param {T} fn - The function to call
 * @param [limit=1] - The number of times the function can be called.
 * @returns
 */
export function callLimit<T extends (...args: any[]) => any>(fn: T, limit = 1) {
  if (!isFunction(fn))
    throw new TypeError('fn expected a function')

  if (!isNumber(limit))
    throw new TypeError('limit expected a number')

  let res: ReturnType<T> | undefined
  return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    if (--limit >= 0)
      res = fn.apply(this, args)
    if (limit < 0)
      res = undefined

    return res
  }
}
