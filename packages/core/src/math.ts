/**
 * toFixedWithoutZeros and remove trailing zeroes
 * @param num
 * @param precision
 * @returns
 * @linkcode https://github.com/GreatAuk/utopia-utils/blob/main/packages/core/src/math.ts
 * @example
 * ```ts
 * toFixedWithoutZeros(1.2345, 2) // '1.23'
 * toFixedWithoutZeros(1.2000, 2) // '1.2'
 * ```
 */
export function toFixedWithoutZeros(num: number, precision: number): string {
  return `${Number(num.toFixed(precision))}`
}

/**
 * get the average of all the numbers passed in
 * @example
 * ```ts
 * average([1, 2, 3]) // 2
 * average([]) // NaN
 * average([{ value: 1 }, { value: 2 }], item => item.value) // 1.5
 * ```
 * @linkcode https://github.com/GreatAuk/utopia-utils/blob/main/packages/core/src/math.ts
 */
export function average<T extends number>(arr: readonly T[]): number
export function average<T extends object>(
  arr: readonly T[],
  getter: (item: T) => number
): number
export function average<T extends object | number>(
  arr: readonly any[],
  getter?: (item: T) => number,
): number {
  return arr.reduce((acc, item) => acc + (getter ? getter(item) : item), 0) / arr.length
}

/**
 * Calculates the sum of the given numbers.
 * @param arr - The numbers to be summed.
 * @returns The sum of the numbers.
 * @example
 * ```ts
 * sum([1, 2, 3]) // 6
 * sum([]) // 0
 * sum([{ value: 1 }, { value: 2 }], item => item.value) // 3
 * ```
 */
export function sum<T extends number>(arr: readonly T[]): number
export function sum<T extends object>(
  arr: readonly T[],
  getter: (item: T) => number
): number
export function sum<T extends object | number>(arr: readonly any[], getter?: (item: T) => number): number {
  return (arr || []).reduce((acc, item) => acc + (getter ? getter(item) : item), 0)
}
