/**
 * Given a string, return a new string with the first letter capitalized.
 * @param {string} str - string - The string to capitalize.
 * @returns {string} - The capitalized string.
 */
export function capitalize<T extends string>(str: T) {
  return str.charAt(0).toUpperCase() + str.slice(1) as Capitalize<T>
}
