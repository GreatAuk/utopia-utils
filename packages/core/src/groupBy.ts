/**
 * group an array by a string
 * @param {T[]} array - The array to iterate over.
 * @param iteratee - (item: T) => string
 * @returns {Record<string, T[]>} Returns the composed aggregate object.
 * @example
 * ```
    groupBy([4.2, 6.3, 6.5], v => `${Math.floor(v)}`)
    // { '4': [ 4.2 ], '6': [ 6.3, 6.5 ] }

    groupBy([{ name: 'John', age: 20 }, { name: 'Jane', age: 25 }], item => `${item.age}`)
    // { '20': [ { name: 'John', age: 20 } ], '25': [ { name: 'Jane', age: 25 } ] }
 * ```
 */
export function groupBy<T>(array: T[], iteratee: (item: T) => string): Record<string, T[]> {
  return array.reduce<Record<string, T[]>>((acc, item) => {
    const key = iteratee(item)
    if (acc[key])
      acc[key].push(item)
    else
      acc[key] = [item]

    return acc
  }, {})
}
