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
 */
export function isValidUrl(urlString: string) {
  try {
    return Boolean(new URL(urlString))
  }
  catch (_) {
    return false
  }
}
