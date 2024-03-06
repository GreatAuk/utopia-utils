/**
 * "Generate a random string of a given length, using a given character set."
 * @param {number} length - The length of the string you want to generate.
 * @param [chars=ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789] - The characters to
 * use in the random string.
 * @returns A random string of the length specified.
 * @linkcode https://github.com/GreatAuk/utopia-utils/blob/main/packages/core/src/randomString.ts
 */
export const randomString = (length: number, chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'): string => {
  const maxPos = chars.length
  let str = ''
  for (let i = 0; i < length; i++)
    str += chars.charAt(Math.floor(Math.random() * maxPos))

  return str
}
