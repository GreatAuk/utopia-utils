/* eslint-disable no-console */

/**
 * Measure the performance of a function
 * @example
 * ```ts
 * const time = measurePerformance(this, () => {
 *   // function body
 * }, arg1, arg2)
 * ```
 * @linkcode https://github.com/GreatAuk/utopia-utils/blob/main/packages/share/src/measurePerformance.ts
 */
export function measurePerformance<T extends (...args: any[]) => any>(this: ThisParameterType<T>, fn: T, ...args: Parameters<T>): number {
  const start = performance.now()
  fn.call(this, ...args)
  const end = performance.now()

  const diff = end - start
  console.log(`${fn.name} taken: ${diff}ms`)

  return diff
}
