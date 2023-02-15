export function intersection<T>(arr1: T[], arr2: T[]): T[] {
  return [...new Set(arr1)].filter(v => arr2.includes(v))
}
