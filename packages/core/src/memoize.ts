interface MemoizeOptions<T extends (this: any, ...args: any[]) => any> {
  /**
   * serialize arguments to get cache key
   * @default JSON.stringify
   */
  serializer?: (args: Parameters<T>) => string
}

export interface MemoizedFn<T extends (this: any, ...args: any[]) => any> {
  /**
   * clear cache of current memoized function.
  */
  clear: () => void
  cache: Map<string, ReturnType<T>>
  (this: ThisParameterType<T>, ...args: Parameters<T>): ReturnType<T>
}

/**
 * It takes a function and returns a memoized version of that function
 * @param {T} fn - The function to memoize.
 * @param {MemoizeOptions} [options] - An optional object that can be used to configure the memoization.
 * @returns {Function} function
 * @example
 * ```ts
    const add = (a: number, b: number) => a + b
    const addMemoized = memoize(add)

    addMemoized(1, 2) // => 3
    addMemoized(1, 2) // => 3 from cache

    // clear cache
    addMemoized.clear()

    // Modify the result cache.
    addMemoized.cache.set(JSON.stringify([1, 2]), 4)
    addMemoized(1, 2) // => 4 from cache
 * ```
 */
export function memoize<T extends (...args: any[]) => any>(fn: T, options?: MemoizeOptions<T>): MemoizedFn<T> {
  const { serializer = serializerDefault } = options || {}

  function memoizeFn(this: ThisParameterType<T>, ...args: Parameters<T>): ReturnType<T> {
    const key = serializer(args)
    const cache = memoizeFn.cache
    if (cache.has(key))
      return cache.get(key) as ReturnType<T>

    const res = fn.apply(this, args)
    cache.set(key, res)
    return res
  }

  memoizeFn.cache = new Map<string, ReturnType<T>>()

  memoizeFn.clear = () => {
    memoizeFn.cache.clear()
  }

  return memoizeFn
}

function serializerDefault(args: any[]) {
  return JSON.stringify(args)
}
