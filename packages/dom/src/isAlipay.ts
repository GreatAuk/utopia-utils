/**
 * Check if the current environment is Alipay. (支付宝)
 * @returns A boolean value.
 * @linkcode https://github.com/GreatAuk/utopia-utils/blob/main/packages/dom/src/isAlipay.ts
 */
export function isAlipay(): boolean {
  const ua = navigator.userAgent.toLowerCase()
  return /Alipay/i.test(ua)
}
