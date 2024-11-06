type ArrayLast<T extends readonly unknown[]> = T extends readonly [...infer _, infer L] ? L : never

/**
 * The function returns the last element of an array and throws an error if the input is not an array.
 * @param {T} arr
 * @throws {TypeError} if the input is not an array.
 * @returns the last element of the input array `arr`.
 * @example
 * ```ts
 * arrLast([1, 2, 3, 4, 5]) // 5
 * arrLast([[1, 2, 3], [4, 5, 6], [7, 8, 9]]) // [7, 8, 9]
 * arrLast([{ a: 1 }, { b: 2 }, { c: 3 }, { d: 4 }]) // { d: 4 }
 * arrLast(['a', 1, true, /r/g]) // /r/g
 * ```
 * @linkcode https://github.com/GreatAuk/utopia-utils/blob/main/packages/core/src/arrLast.ts
 */
export function arrLast<T extends readonly unknown[]>(arr: T, defaultValue?: T[number] | null | undefined): ArrayLast<T>
export function arrLast<T extends unknown[]>(arr: T, defaultValue?: T[number] | null | undefined): T[number] {
  if (!Array.isArray(arr))
    throw new TypeError('Expected an Array')
  return arr?.length > 0 ? arr[arr.length - 1] : defaultValue
}
