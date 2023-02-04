/**
 * "Replace the middle 4 digits of a phone number with asterisks."
 * @param {string} phone - The phone number to be encrypted.
 * @returns The phone number with the middle 4 digits replaced with asterisks.
 */
export function encryptPhone(phone: `${number}`) {
  return phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
}
