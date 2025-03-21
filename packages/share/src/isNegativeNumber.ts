import { isNumber } from './is'

/**
 * Check if a value is a negative number
 * @param {unknown} val
 * @returns {boolean}
 * @example
 * ```ts
 * isNegativeNumber(-1) // true
 * isNegativeNumber(1) // false
 * isNegativeNumber('1') // false
 * isNegativeNumber('-1') // true
 * ```
 */
export function isNegativeNumber(val: unknown): boolean {
  return isNumber(val) && val < 0
}
