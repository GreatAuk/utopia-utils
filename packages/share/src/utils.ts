/**
 * It returns the type of the value passed to it
 * @param {unknown} value - The value to be converted to a raw type.
 * @returns The type of the value. such as [object Object], [object Array], [object String], [object Number], [object Boolean], [object Function], [object Undefined], [object Null], [object Symbol], [object BigInt], [object Date], [object RegExp], [object Error], [object Map], [object Set], [object WeakMap], [object WeakSet], [object Promise], [object Generator], [object GeneratorFunction], [object AsyncFunction], [object Arguments], [object HTMLDocument], [object HTMLDivElement], [object Window], [object global], [object Object], [object Array], [object String], [object Number], [object Boolean], [object Function], [object Undefined], [object Null], [object Symbol], [object BigInt], [object Date], [object RegExp], [object Error], [object Map], [object Set], [object WeakMap], [object WeakSet], [object Promise], [object Generator], [object GeneratorFunction], [object AsyncFunction], [object Arguments], [object HTMLDocument], [object HTMLDivElement], [object Window], [object global]
 */
export const toTypeString = (value: unknown): string => {
  return Object.prototype.toString.call(value)
}
