import { isArray, isMap, isObject, isSet, isString } from './is'

/**
 * If the value is an array, string, map, set, or object, return true if it's empty
 * @param {any} value - any
 * @returns boolean
 */
export function isEmpty(value: any): boolean {
  if (isArray(value) || isString(value))
    return !value.length

  if (isMap(value) || isSet(value))
    return !value.size

  if (isObject(value))
    return !Object.keys(value).length

  return true
}
