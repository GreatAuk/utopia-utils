/**
 * It returns the type of the value passed to it
 * @param {unknown} value - The value to be converted to a raw type.
 * @returns The type of the value. such as [object Object], [object Array], [object String], [object Number], [object Boolean], [object Function], [object Undefined], [object Null], [object Symbol], [object BigInt], [object Date], [object RegExp], [object Error], [object Map], [object Set], [object WeakMap], [object WeakSet], [object Promise], [object Generator], [object GeneratorFunction], [object AsyncFunction], [object Arguments], [object HTMLDocument], [object HTMLDivElement], [object Window], [object global], [object Object], [object Array], [object String], [object Number], [object Boolean], [object Function], [object Undefined], [object Null], [object Symbol], [object BigInt], [object Date], [object RegExp], [object Error], [object Map], [object Set], [object WeakMap], [object WeakSet], [object Promise], [object Generator], [object GeneratorFunction], [object AsyncFunction], [object Arguments], [object HTMLDocument], [object HTMLDivElement], [object Window], [object global]
 */
export const toTypeString = (value: unknown): string => {
  return Object.prototype.toString.call(value)
}

export type Duration = number | `${number}s` | `${number}ms`
/**
 * "If the duration is a number, return it, otherwise if it's a string, parse it and return the number
 * of milliseconds."
 * @param {Duration} duration - The duration to be converted to milliseconds.
 * @returns The number of milliseconds.
 */
export function parseDuration(d: Duration) {
  if (typeof d === 'number') {
    if (isNaN(d) || d < 0)
      throw new Error(`Invalid duration: "${d}".`)
    return d
  }
  else if (/\d+s/.test(d)) {
    return +d.slice(0, -1) * 1000
  }
  else if (/\d+ms/.test(d)) {
    return +d.slice(0, -2)
  }
  throw new Error(`Unknown duration: "${d}".`)
}
