import { isFunction, isNumber } from '@utopia-utils/share'

export function callLimit<T extends (...args: any[]) => any>(fn: T, limit = 1) {
  if (!isFunction(fn))
    throw new TypeError('fn expected a function')

  if (!isNumber(limit))
    throw new TypeError('limit expected a number')

  let res: any
  return function (this: any, ...args: any[]) {
    if (--limit >= 0)
      res = fn.apply(this, args)
    if (limit < 0)
      res = undefined

    return res
  } as AddReturnType<T, undefined>
}

type AddReturnType<T extends (...args: any[]) => any, A> = T extends (...args: infer P) => infer R ? (...args: P) => R | A : T
