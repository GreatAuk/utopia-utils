import { isArray } from '@utopia-utils/share'

/**
 * It takes an object and an array of keys, and returns a new object with the keys omitted
 * @param obj - T - The object to omit properties from.
 * @param {K[] | K} key - K[] | K
 * @returns
 * @example
 * ```
    const obj = { a: 1, b: 2, c: 3 }
    const res1 = omit(obj, 'a') // { b: 2, c: 3 }
    const res2 = omit(obj, ['a', 'c']) // { b: 2 }
 * ```
 * @source https://github.com/GreatAuk/utopia-utils/blob/main/packages/core/src/omit.ts
 */
export function omit<T extends object, K extends keyof T>(obj: T, key: K[] | K): Omit<T, K> {
  const shallowCopy = { ...obj }
  const keys = isArray(key) ? key : [key]
  keys.forEach(key => Reflect.deleteProperty(shallowCopy, key))
  return shallowCopy
}
