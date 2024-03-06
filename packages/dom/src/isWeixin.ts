/**
 * Check if the current environment is Weixin. (微信)
 * @returns A boolean value.
 * @linkcode https://github.com/GreatAuk/utopia-utils/blob/main/packages/dom/src/isWeixin.ts
 */
export function isWeixin(): boolean {
  const ua = navigator.userAgent.toLowerCase()
  return /MicroMessenger/i.test(ua)
}
