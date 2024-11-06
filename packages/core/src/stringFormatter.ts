/**
 * Formats a bank card number by removing non-digit characters and adding spaces every four digits.
 * @param str - The bank card number to be formatted.
 * @returns The formatted bank card number.
 * @example
 * ```ts
 * formatterBankCard('1234567890123456') // '1234 5678 9012 3456'
 * formatterBankCard('_  3232 32432 32432  ') // '3232 3243 2324 32'
 * formatterBankCard(undefined) // ''
 * ```
 * @linkcode https://github.com/GreatAuk/utopia-utils/blob/main/packages/core/src/stringFormatter.ts
 */
export function formatterBankCard(str?: string) {
  return `${str}`.replace(/\D/g, '').replace(/(\d{4})(?=\d)/g, '$1 ')
}

const PHONE_LENGTH = 11
/**
 * Formats a phone number string.
 *
 * @param str - The phone number string to format.
 * @returns The formatted phone number string.
 * @example
 * ```ts
 * formatterPhoneNumber('12345678901') // '123 4567 8901'
 * formatterPhoneNumber(' asd  123456789012345678901') // '123 4567 8901'
 * formatterPhoneNumber(undefined) // ''
 * ```
 * @linkcode https://github.com/GreatAuk/utopia-utils/blob/main/packages/core/src/stringFormatter.ts
 */
export function formatterPhoneNumber(str?: string) {
  return `${str}`
    .replace(/\D/g, '')
    .substring(0, PHONE_LENGTH)
    .replace(/(\d{3})(\d{0,4})?(\d{0,4})?/, (res, $1, $2, $3) => {
      if (res.length <= 3)
        return $1
      if (res.length <= 7)
        return `${$1} ${$2}`
      return `${$1} ${$2} ${$3}`
    })
}

const ID_CARD_LENGTH = 18
/**
 * Formats an ID card number by removing non-numeric characters and adding spaces for better readability.
 * @param str - The ID card number to format.
 * @returns The formatted ID card number.
 * @example
 * ```ts
 * formatterIdCard('36072119941229004X') // '360721 19941229 004X'
 * formatterIdCard(' fsd  36072119941229004X') // '360721 19941229 004X'
 * formatterIdCard(undefined) // ''
 * ```
 * @linkcode https://github.com/GreatAuk/utopia-utils/blob/main/packages/core/src/stringFormatter.ts
 */
export function formatterIdCard(str?: string) {
  return `${str}`
    .replace(/[^0-9xX]/g, '')
    .substring(0, ID_CARD_LENGTH)
    .replace(/(\d{6})(\d{0,8})?(\d{0,4})?/, (res, $1, $2, $3) => {
      if (res.length <= 6)
        return $1
      if (res.length <= 14)
        return `${$1} ${$2}`
      return `${$1} ${$2} ${$3}`
    })
}
