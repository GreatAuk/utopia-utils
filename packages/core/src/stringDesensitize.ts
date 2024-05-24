import { isString } from '@utopia-utils/share'

/**
 * Desensitizes a name，
 * If the name is not a string, it will be returned as is.
 * @param name - The name to be desensitized.
 * @returns The desensitized name.
 * @example
 * ```ts
 * desensitizeName('张三') // '张*'
 * desensitizeName('张三丰') // '张*丰'
 * desensitizeName('张二三丰') // '张**丰'
 * desensitizeName('张') // '张'
 * desensitizeName(undefined) // undefined
 * ```
 * @linkcode https://github.com/GreatAuk/utopia-utils/blob/main/packages/core/src/stringDesensitize.ts
 */
export function desensitizeName(name?: string) {
  if (!isString(name))
    return name

  const length = name.length

  if (length < 2)
    return name

  if (length === 2)
    return `${name[0]}*`

  return name[0] + '*'.repeat(length - 2) + name[length - 1]
}
