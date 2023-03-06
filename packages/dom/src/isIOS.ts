export function isIOS() {
  if (typeof navigator === 'undefined')
    return false
  return /iPad|iPhone|iPod/.test(navigator.userAgent)
}
