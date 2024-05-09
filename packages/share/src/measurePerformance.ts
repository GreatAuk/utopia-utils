/* eslint-disable no-console */
export function measurePerformance<T extends (...args: any[]) => any>(this: ThisParameterType<T>, fn: T, ...args: Parameters<T>): number {
  const start = performance.now()
  fn.call(this, ...args)
  const end = performance.now()

  const diff = end - start
  console.log(`${fn.name} taken: ${diff}ms`)

  return diff
}
