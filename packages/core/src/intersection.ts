/**
 * The function returns an array of unique elements that are present in both input arrays.
 * @param {T[]} arr1 - An array of elements of type T.
 * @param {T[]} arr2 - The second array of type T that is being compared with the first array to find
 * the common elements.
 * @returns an array of elements that are present in both `arr1` and `arr2`.
 * @source https://github.com/GreatAuk/utopia-utils/blob/main/packages/core/src/intersection.ts
 */
export function intersection<T>(arr1: T[], arr2: T[]): T[] {
  return [...new Set(arr1)].filter(v => arr2.includes(v))
}
