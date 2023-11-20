interface GroupByOptions {
  /**
   * group by one to one, if true, the result will be a Record<K, T> instead of Record<K, T[]>
   */
  oneToOne?: boolean
}
/**
 * Groups items in array, using iteratee to get the key to group by.
 * @param {T[]} array - The array to iterate over.
 * @param iteratee - (item: T) => string
 * @example
 * ```
    groupBy([4.2, 6.3, 6.5], v => `${Math.floor(v)}`)
    // { '4': [ 4.2 ], '6': [ 6.3, 6.5 ] }

    groupBy([{ name: 'John', age: 20 }, { name: 'Jane', age: 25 }], item => `${item.age}`)
    // { '20': [ { name: 'John', age: 20 } ], '25': [ { name: 'Jane', age: 25 } ] }

    groupBy([{ name: 'John', age: 20 }, { name: 'Jane', age: 25 }], item => `${item.age}`, { oneToOne: true })}})
    // { '20': { name: 'John', age: 20 }, '25': { name: 'Jane', age: 25 } }
 * ```
 * @linkcode https://github.com/GreatAuk/utopia-utils/blob/main/packages/core/src/groupBy.ts
 */
export function groupBy<T, K extends string>(array: T[], iteratee: (item: T) => K): Record<K, T[]>
export function groupBy<T, K extends string>(array: T[], iteratee: (item: T) => K, options: { oneToOne: false }): Record<K, T[]>
export function groupBy<T, K extends string>(array: T[], iteratee: (item: T) => K, options: { oneToOne: true }): Record<K, T>
export function groupBy<T, K extends string>(array: T[], iteratee: (item: T) => K, options?: GroupByOptions): Record<K, T[]> | Record<K, T> {
  const { oneToOne } = options || {}
  return array.reduce<Record<string, T[]> | Record<string, T>>((acc, item) => {
    const key = iteratee(item)

    if (oneToOne) {
      acc[key] = item
      return acc
    }

    if (acc[key])
      (acc as Record<K, T[]>)[key].push(item)
    else
      (acc as Record<K, T[]>)[key] = [item]
    return acc
  }, {})
}
