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
 * average(1, 2, 3) // 2
 * average(...[1, 2, 3]) // 2
 * ```
 * @linkcode https://github.com/GreatAuk/utopia-utils/blob/main/packages/core/src/math.ts
 */
export function average(...args: number[]): number {
  return args.reduce((a, b) => a + b, 0) / args.length
}

/**
 * Calculates the sum of the given numbers.
 * @param args - The numbers to be summed.
 * @returns The sum of the numbers.
 * @example
 * ```ts
 * sum(1, 2, 3) // 6
 * sum(1, 2, 3, 4) // 10
 * ```
 */
export function sum(...args: number[]): number {
  return args.reduce((a, b) => a + b, 0)
}
