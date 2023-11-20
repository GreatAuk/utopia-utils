/**
 * Given a string, return a new string with the first letter capitalized.
 * @param {string} str - string - The string to capitalize.
 * @returns {string} - The capitalized string.
 * @linkcode https://github.com/GreatAuk/utopia-utils/blob/main/packages/core/src/capitalize.ts
 */
export function capitalize<T extends string>(str: T) {
  return str.charAt(0).toUpperCase() + str.slice(1) as Capitalize<T>
}
