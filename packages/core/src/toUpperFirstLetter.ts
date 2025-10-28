/**
 * 首字母转大写
 * @param text 字符串
 * @returns 首字母大写的字符串
 */
export function toUpperFirstLetter(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}
