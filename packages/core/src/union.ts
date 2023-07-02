import { unique } from './unique'

/**
 * It takes an array of arrays and returns a single array with all the elements of the original arrays
 * @param {T[][]} arrays - T[][]
 * @returns return new array
 * @example
 * ```
    union([1, 2, 3], [2, 3]) // [1, 2, 3]
    union([1, 2, 3], [2, 3], [4]) // [1, 2, 3, 4]
 * ```
 * @linkcode https://github.com/GreatAuk/utopia-utils/blob/main/packages/core/src/union.ts
 */
export function union<T>(...arrays: T[][]): T[] {
  return unique(arrays.flat())
}
