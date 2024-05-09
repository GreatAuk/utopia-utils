/**
 * The function checks if a given string is a valid URL.
 * @param {string} urlString - A string representing a URL that needs to be validated.
 * @returns boolean
 * @example
 * ```ts
    expect(isValidUrl('invalidURL')).toBe(false)
    expect(isValidUrl('htt//domain')).toBe(false)
    expect(isValidUrl('www.domain.com')).toBe(false)
    expect(isValidUrl('http://www.domain.com')).toBe(true)
    expect(isValidUrl('tcp://www.domain.com')).toBe(true)
 * ```
 * @linkcode https://github.com/GreatAuk/utopia-utils/blob/main/packages/share/src/isValidUrl.ts
 */
export function isValidUrl(urlString: string): boolean {
  try {
    return Boolean(new URL(urlString))
  }
  catch (_) {
    return false
  }
}
