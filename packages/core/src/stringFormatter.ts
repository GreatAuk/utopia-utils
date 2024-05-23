/**
 * Formats a bank card number by removing non-digit characters and adding spaces every four digits.
 * @param str - The bank card number to be formatted.
 * @returns The formatted bank card number.
 */
export function formatterBankCard(str: string) {
  return `${str}`.replace(/\D/g, '').replace(/(\d{4})(?=\d)/g, '$1 ')
}
