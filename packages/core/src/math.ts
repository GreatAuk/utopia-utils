/**
 * toFixedWithoutZeros and remove trailing zeroes
 * @param num
 * @param precision
 * @returns
 */
export function toFixedWithoutZeros(num: number, precision: number): string {
  return `${Number(num.toFixed(precision))}`
}

/**
 * get the average of all the numbers passed in
 * @example
 * ```
 * average(1, 2, 3) // 2
 * average(...[1, 2, 3]) // 2
 * ```
 */
export function average(...args: number[]): number {
  return args.reduce((a, b) => a + b, 0) / args.length
}
