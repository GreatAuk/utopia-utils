/**
 * "Replace the middle 4 digits of a phone number with asterisks."
 * @param {string} phone - The phone number to be encrypted.
 * @returns The phone number with the middle 4 digits replaced with asterisks.
 * @linkcode https://github.com/GreatAuk/utopia-utils/blob/main/packages/core/src/encryptPhone.ts
 * @example
 * ```ts
 * encryptPhone('18312345678') // '183****5678'
 * ```
 */
export function encryptPhone(phone: `${number}`): string {
  return phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
}
