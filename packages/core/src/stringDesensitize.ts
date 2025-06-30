import { isString } from '@utopia-utils/share'

type Level = 'low' | 'medium' | 'high'

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
export function desensitizeName(name?: string): string | undefined {
  if (!isString(name))
    return name

  const length = name.length

  if (length < 2)
    return name

  if (length === 2)
    return `${name[0]}*`

  return name[0] + '*'.repeat(length - 2) + name[length - 1]
}

/**
 * Desensitizes a phone number by replacing the middle digits with asterisks.
 * @param phone - The phone number to desensitize.
 * @returns The desensitized phone number.
 * @example
 * ```ts
 * desensitizePhone('12345678910') // '123****8910'
 * desensitizePhone('') // ''
 * desensitizePhone(undefined) // undefined
 * ```
 * @linkcode https://github.com/GreatAuk/utopia-utils/blob/main/packages/core/src/stringDesensitize.ts
 */
export function desensitizePhone(phone?: string): string | undefined {
  if (!isString(phone))
    return phone

  return phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
}

/**
 * 根据指定的级别对身份证号进行脱敏处理。
 * 如果身份证号不是字符串，则原样返回。
 *
 * 高级：保留前一位与后一位，其余 * 表示，仅能识别该人属于哪个地区。 6*************2
 *
 * 中级：保留前三位与后三位，其余 * 表示，仅能识别该人的省市与是男是女。213***********203
 *
 * 低级：保留前六位与后四位，其余 * 表示，仅能识别该人的省市区与是男是女。212912******2233
 * @param idCard - 要脱敏的身份证号。
 * @param level - 脱敏级别。可以是 'low'、'medium' 或 'high'。默认为 'low'。
 * @returns 脱敏后的身份证号。
 * @example
 * ```ts
 * desensitizeIDCard('110101199001011234', 'low') // '110101********1234'
 * desensitizeIDCard('110101199001011234', 'medium') // '110************234'
 * desensitizeIDCard('110101199001011234', 'high') // '1*****************4'
 * desensitizeIDCard(undefined) // undefined
 * ```
 * @linkcode https://github.com/GreatAuk/utopia-utils/blob/main/packages/core/src/stringDesensitize.ts
 */
export function desensitizeIDCard(idCard?: string, level: Level = 'low'): string | undefined {
  if (!isString(idCard))
    return idCard

  if (level === 'low')
    return idCard.replace(/(\d{6})\d{8}([\dxX]{4})/, '$1********$2')
  else if (level === 'medium')
    return idCard.replace(/(\d{3})\d{12}([\dxX]{3})/, '$1************$2')

  return idCard.replace(/(\d{1})\d{16}([\dxX]{1})/, '$1****************$2')
}

/**
 * Desensitizes an email address by replacing part of the name with asterisks.
 * if the email address is not a string, it will be returned as is.
 * @param email - The email address to desensitize.
 * @returns The desensitized email address.
 * @example
 * ```ts
 * desensitizeEmail('230450504@qq.com') // '230****04@qq.com
 * desensitizeEmail('2@gmail.com') // '2@gmail.com'
 * desensitizeEmail('') // ''
 * ```
 * @linkcode https://github.com/GreatAuk/utopia-utils/blob/main/packages/core/src/stringDesensitize.ts
 */
export function desensitizeEmail(email?: string): string | undefined {
  if (!isString(email))
    return email

  try {
    const [name, domain] = email.split('@')

    if (!name || !domain)
      return email

    return `${name.replace(/(\w{3})\w*(\w{2})/, '$1****$2')}@${domain}`
  }
  catch (err) {
    console.error(err)
    return email
  }
}
