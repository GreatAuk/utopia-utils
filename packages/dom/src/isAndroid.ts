/**
 * Returns a boolean value indicating whether the current platform is Android.
 * @returns A boolean value.
 * @source https://github.com/GreatAuk/utopia-utils/blob/main/packages/dom/src/isAndroid.ts
 */
export function isAndroid() {
  if (typeof navigator === 'undefined')
    return false
  return /android/i.test(navigator.userAgent)
}
