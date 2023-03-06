/**
 * Returns a boolean value indicating whether the current platform is Android.
 * @returns A boolean value.
 */
export function isAndroid() {
  if (typeof navigator === 'undefined')
    return false
  return /android/i.test(navigator.userAgent)
}
