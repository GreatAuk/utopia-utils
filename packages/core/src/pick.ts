import { isArray } from '@utopia-utils/share'

/**
 * It takes an object and some keys, returns a new object with only those keys
 * @param {T} obj - T
 * @param {K[] | K} keys - K[] | K
 * @returns Pick<T, K>
 */
export function pick<T extends object, K extends keyof T>(obj: T, keys: K[] | K): Pick<T, K> {
  const res: any = {}
  if (obj === null)
    return res

  const keys_ = isArray(keys) ? keys : [keys]
  keys_.forEach(key => res[key] = obj[key])
  return res
}
