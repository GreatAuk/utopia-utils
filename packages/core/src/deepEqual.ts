import { toTypeString } from '@utopia-utils/share'

/**
 * The function deepEqual compares two values and returns true if they are deeply equal
 * @param {any} value1 - The first value to be compared for equality with the second value.
 * @param {any} value2 - The second value to be compared in the deepEqual function.
 * @returns {boolean} - true if the values are deeply equal, otherwise false.
 * @source https://github.com/GreatAuk/utopia-utils/blob/main/packages/core/src/deepEqual.ts
 */
export function deepEqual(value1: any, value2: any): boolean {
  if (value1 === value2)
    return true

  const type1 = toTypeString(value1)
  const type2 = toTypeString(value2)

  if (type1 !== type2)
    return false

  if (type1 === 'Array' && type2 === 'Array') {
    if (value1.length !== value2.length)
      return false
    // return value1.every((v: any, i: number) => deepEqual(v, value2[i]))
    for (let i = 0; i < value1.length; i++) {
      if (!deepEqual(value1[i], value2[i]))
        return false
    }
    return true
  }

  if (type1 === 'Object' && type2 === 'Object') {
    const keys1 = Object.keys(value1)
    const keys2 = Object.keys(value2)
    if (keys1.length !== keys2.length)
      return false

    // return keys1.every(key => deepEqual(value1[key], value2[key]))
    for (const key of keys1) {
      if (!deepEqual(value1[key], value2[key]))
        return false
    }
    return true
  }

  if (type1 === 'Map' && type2 === 'Map') {
    if (value1.size !== value2.size)
      return false
    for (const [key, value] of value1.entries()) {
      if (!value2.has(key) || !deepEqual(value, value2.get(key)))
        return false
    }
    return true
  }

  if (type1 === 'Set' && type2 === 'Set') {
    if (value1.size !== value2.size)
      return false
    for (const value of value1.values()) {
      if (!value2.has(value))
        return false
    }
    return true
  }

  if (type1 === 'Date' && type2 === 'Date')
    return value1.getTime() === value2.getTime()
  if (type1 === 'RegExp' && type2 === 'RegExp')
    return value1.source === value2.source && value1.flags === value2.flags

  return Object.is(value1, value2)
}
