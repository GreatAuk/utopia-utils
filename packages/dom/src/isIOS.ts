/**
 * If the user agent string contains the word 'iPad', 'iPhone', or 'iPod', then we're on iOS.
 * @returns A boolean value.
 */
export function isIOS() {
  if (typeof navigator === 'undefined')
    return false
  return /iPad|iPhone|iPod/.test(navigator.userAgent)
}
