/**
 * tofFixed and remove trailing zeroes
 * @param num
 * @param precision
 * @returns
 */
export function toFixed(num: number, precision: number): number {
  return Number(num.toFixed(precision))
}
