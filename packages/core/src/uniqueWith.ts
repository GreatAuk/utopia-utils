import { isArray } from '@utopia-utils/share'

/**
 * It takes an array and a comparator function, and returns a new array with only the unique values
 * from the original array
 * @param {T[]} arr - The array to filter
 * @param comparator - (a: T, b: T) => boolean
 * @returns {T[]} a new array with only unique values.
 * @example
 * ```ts
    const input = [
      { id: 1, name: 'User1' },
      { id: 2, name: 'User2' },
      { id: 3, name: 'User1' },
    ]
    const output = uniqueWith(input, (a, b) => a.name === b.name)
    expect(output).toEqual([
      { id: 1, name: 'User1' },
      { id: 2, name: 'User2' },
    ])
 * ```
 * @source https://github.com/GreatAuk/utopia-utils/blob/main/packages/core/src/uniqueWith.ts
 */
export function uniqueWith<T>(arr: T[], comparator: (a: T, b: T) => boolean): T[] {
  if (!isArray(arr))
    throw new Error('arr must be an array')

  return arr.reduce<T[]>((acc, cur) => {
    if (acc.some(v => comparator(v, cur)))
      return acc

    return [...acc, cur]
  }, [])
}
