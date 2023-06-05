/**
 * If the user agent string contains the word 'iPad', 'iPhone', or 'iPod', then we're on iOS.
 * @returns A boolean value.
 * @source https://github.com/GreatAuk/utopia-utils/blob/main/packages/dom/src/isIOS.ts
 */
export function isIOS() {
  if (typeof navigator === 'undefined')
    return false
  return /iPad|iPhone|iPod/.test(navigator.userAgent)
}
