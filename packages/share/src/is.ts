import { toTypeString } from './utils'

export const isBoolean = (val: unknown): val is boolean => typeof val === 'boolean'
export const isString = (val: unknown): val is string => typeof val === 'string'
export const isNumber = (val: unknown): val is number => typeof val === 'number'
export const isFunction = (val: unknown): val is Function => typeof val === 'function'
export const isSymbol = (val: unknown): val is symbol => typeof val === 'symbol'
export const isArray = Array.isArray
export const isRegExp = (val: unknown): val is RegExp => toTypeString(val) === 'RegExp'
export const isMap = (val: unknown): val is Map<any, any> => toTypeString(val) === 'Map'
export const isSet = (val: unknown): val is Set<any> => toTypeString(val) === 'Set'
export const isDate = (val: unknown): val is Date => toTypeString(val) === 'Date]'
/**
 * Check if the value is a plain object, that is, the object created by the Object constructor
 */
export const isPlainObject = (val: unknown): val is object => toTypeString(val) === 'Object'
export const isPromise = (val: unknown): val is Promise<any> => toTypeString(val) === 'Promise'
export const isPrimitive = (val: unknown): val is string | number | boolean | symbol | null | undefined =>
  ['string', 'number', 'boolean', 'symbol', 'null', 'undefined'].includes(typeof val)

/**
 * "If the value is null or undefined, return true, otherwise return false."
 */
export const isNil = (val: unknown): val is null | undefined => val === null || val === undefined

export const isObject = (val: unknown): val is Record<any, any> =>
  val !== null && toTypeString(val) === 'Object'

export const isWindow = (val: unknown): boolean => typeof window !== 'undefined' && toTypeString(val) === 'Window'

export const isIntegerKey = (key: unknown) =>
  isString(key)
  && key !== 'NaN'
  && key[0] !== '-'
  && `${parseInt(key, 10)}` === key

/**
 * If the value is a string, return true if it can be converted to a number, otherwise return false.
 * @param {string} val - The value to check
 * @returns boolean.
 * @linkcode https://github.com/GreatAuk/utopia-utils/blob/main/packages/share/src/is.ts
 */
export const isStringNumber = (val: string): boolean => {
  if (!isString(val))
    return false
  return !Number.isNaN(Number(val))
}
