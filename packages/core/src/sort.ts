interface SortOptions<T> {
  getter?: (item: T) => number
  desc?: boolean
}

/**
 * Sorts an array of objects or numbers based on a specified getter function.
 *
 * @template T - The type of the array elements.
 * @param {readonly T[]} arr - The array to be sorted.
 * @param {SortOptions<T>} [options={}] - The sorting options.
 * @param {Function} [options.getter] - The getter function to extract the value to be used for sorting.
 * @param {boolean} [options.desc=false] - Specifies whether to sort in descending order.
 * @returns {T[]} - The sorted array.
 * @example
 * ```ts
 * sort([3, 1, 2]) // [1, 2, 3]
 * sort([3, 1, 2], { desc: true }) // [3, 2, 1]
 * sort([{ value: 3 }, { value: 1 }, { value: 2 }], { getter: item => item.value }) // [{ value: 1 }, { value: 2 }, { value: 3 }]
 * ```
 */
export function sort<T extends number>(arr: readonly T[], options?: SortOptions<T>): T[]
export function sort<T extends object>(
  arr: readonly T[],
  options: SortOptions<T>
): T[]
export function sort<T extends object | number>(
  arr: readonly T[],
  options: SortOptions<T> = {},
): T[] {
  const { getter, desc = false } = options

  const getter_ = (item: T) => getter ? getter(item) : item as number
  const asc = (a: T, b: T) => getter_(a) - getter_(b)
  const dsc = (a: T, b: T) => getter_(b) - getter_(a)

  return arr.slice().sort(desc ? dsc : asc)
}
