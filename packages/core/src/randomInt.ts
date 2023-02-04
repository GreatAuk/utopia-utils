/**
 * Generate random number in range [min, max]
 * @param {number} max - The maximum number that can be returned.
 * @param [min=0] - The minimum number to return.
 * @returns A random integer between min and max.
 */
export function randomInt(max: number, min = 0) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
