import { isNumber } from './is'

/**
 * Check if a value is a positive number
 * @param {unknown} val
 * @returns {boolean}
 * @example
 * ```ts
 * isPositiveNumber(1) // true
 * isPositiveNumber(-1) // false
 * isPositiveNumber('1') // true
 * isPositiveNumber('0') // false
 * ```
 * @linkcode https://github.com/GreatAuk/utopia-utils/blob/main/packages/share/src/isPositiveNumber.ts
 */
export function isPositiveNumber(val: unknown): boolean {
  return isNumber(val) && val > 0
}
