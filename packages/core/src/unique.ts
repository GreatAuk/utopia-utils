import { isArray } from '@utopia-utils/share'

/**
 * It takes an array of any type, and returns an array, with all duplicates removed
 * @param {T[]} arr - The array to filter.
 * @returns array
 * @example
 * ```ts
    const arr = [1, 2, 1, null, null, 'a', 'a']
    const uniqueArr = unique(arr)
    // uniqueArr: [1, 2, null, 'a']
 * ```
 */
export function unique<T>(arr: T[]): T[] {
  if (!isArray(arr))
    throw new Error('arr must be an array')

  return [...new Set(arr)]
}
