/**
 * The function checks if a value is a number or a string that can be converted to a number.
 * @param {unknown} val
 * @returns {boolean}
 * @example
 * ```ts
 * 1, '1', 1.1, '1.1', -1, '-1', Infinity, 'Infinity', 1.1e2  => true
 * NaN, 'NaN', '', ' ', null, undefined, '1.1.1', [], {}, '1.1.e2', false, true  => false
 * ```
 * @source https://github.com/GreatAuk/utopia-utils/blob/main/packages/share/src/isNumberLike.ts
 */
export function isNumberLike(val: unknown) {
  return (typeof val === 'number' && !Number.isNaN(val))
    || (typeof val === 'string' && val.trim() !== '' && !Number.isNaN(Number(val)))
}
