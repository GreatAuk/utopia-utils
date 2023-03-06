/**
 * Check if the current environment is Weixin. (微信)
 * @returns A boolean value.
 */
export function isWeixin() {
  const ua = navigator.userAgent.toLowerCase()
  return /MicroMessenger/i.test(ua)
}
