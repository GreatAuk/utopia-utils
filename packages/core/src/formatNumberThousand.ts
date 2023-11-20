interface Options {
  /**
   * @default 0
   */
  precision?: number
  /**
   * @default ','
   */
  groupSeparator?: string
}

/**
 * The `formatNumberThousand` function formats a number by adding a group separator (default is comma)
 * and a specified precision (default is 0) to the thousands place.
 * @example
 * ```ts
 * formatNumberThousand(1234567.3232, { precision: 2 }) // '1,234,567.32'
 * formatNumberThousand(1234567, { precision: 2, groupSeparator: '-' }) // '1-234-567.00'
 * ```
 * @linkcode https://github.com/GreatAuk/utopia-utils/blob/main/packages/core/src/formatNumberThousand.ts
 */
export function formatNumberThousand(num: number, options: Options = {}) {
  if (Number.isNaN(num))
    return ''

  const { precision = 0, groupSeparator = ',' } = options

  const [integer, decimal] = num.toString().split('.')
  const decimalStr = decimal ? `.${decimal.padEnd(precision, '0').slice(0, precision > 0 ? precision : 0)}` : ''
  return integer.replace(/\B(?=(\d{3})+(?!\d))/g, groupSeparator) + decimalStr
}
