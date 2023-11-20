import { isArray, isPlainObject } from '@utopia-utils/share'

function escapeDoubleQuotes(val: string) {
  return val.replace(/"/g, '""')
}

/**
 * check separator is valid
 * @param {string} separator
 */
function checkSeparator(separator: string) {
  if (!separator)
    throw new Error('The separator cannot be empty')

  if (!/^[^\n"]$/.test(separator))
    throw new Error('The separator must be single-character and cannot be a newline or double quotes')
}

interface ArrayToCSVOptions<T> {
  headers?: string[]
  /**
   * @default ','
   */
  separator?: string
  /**
   * custom get row function
   *
   * if it is not set, it will use the default getRow function for array or object
   */
  getRow?: (row: T) => any[]
  /**
   * if true, add prefix (data:text/csv;charset=utf-8,) to the csv file
   */
  withPrefix?: boolean
}

/**
 * It takes an array of arrays or objects and returns a CSV string
 * @param {T[]} arr - The array to convert to CSV.
 * @param options - ArrayToCSVOptions<T> = {}
 * @returns csv string
 * @example
 * ```ts
      const csv1 = arrayToCSV([
        { a: 1, b: 2, c: 3 },
        { a: 10, b: 20, c: 30 },
      ], {
        headers: ['A', 'B', 'C'],
      })
      // csv1 === 'A,B,C\n1,2,3\n10,20,30'

      const csv2 = arrayToCSV([
        [1, 2, 3],
        [10, 20, 30],
      ], {
        headers: ['A', 'B', 'C'],
      })
      // csv2 === 'A,B,C\n1,2,3\n10,20,30'

      const csv3 = arrayToCSV([
        { a: 1, b: 2, c: 3 },
        { a: 10, b: 20, c: 30 },
      ], {
        separator: ';',
        getRow: (row) => Object.values(row).map(v => v + 10),
      }
      // csv3 === '11;12;13\n20;30;40'
 * ```
 * @linkcode https://github.com/GreatAuk/utopia-utils/blob/main/packages/core/src/csv.ts
 */
export function arrayToCSV<T extends (any[] | object)>(arr: T[], options: ArrayToCSVOptions<T> = {}) {
  const { headers, separator = ',', getRow, withPrefix } = options

  checkSeparator(separator)

  let csv = arr.map((item) => {
    if (getRow)
      return getRow(item).join(separator)

    if (isArray(item))
      return item.join(separator)

    if (isPlainObject(item))
      return Object.values(item).join(separator)

    return ''
  }).join('\n')

  if (headers)
    csv = `${headers.join(separator)}\n${csv}`

  csv = escapeDoubleQuotes(csv)

  if (withPrefix)
    csv = `data:text/csv;charset=utf-8,${csv}`

  return csv
}
