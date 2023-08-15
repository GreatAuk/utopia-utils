interface ReturnType {
  removeTimeout: () => void
}

/**
 * wrap for setTimeout, return a function to remove the timeout
 * @param callback equal to setTimeout's first param
 * @param ms equal to setTimeout's second param
 * @linkcode https://github.com/GreatAuk/utopia-utils/blob/main/packages/core/src/onTimeout.ts
 * @example
 * ```ts
 * const { removeTimeout } = onTimeout(() => {
 *  console.log('timeout')
 * }, 1000) // print 'timeout' after 1s
 *
 * removeTimeout() // on Destroy, cancel the timeout
 */
export function onTimeout(callback: (args: void) => void, ms?: number): ReturnType
export function onTimeout<TArgs extends any[]>(callback: (...args: TArgs) => void, ms?: number, ...args: TArgs): ReturnType
export function onTimeout<TArgs extends any[]>(callback: (...args: TArgs) => void, ms?: number, ...args: TArgs) {
  const timeoutId = setTimeout(
    () => callback(...args),
    ms,
  )

  const removeTimeout = () => {
    clearTimeout(timeoutId)
  }

  return {
    removeTimeout,
  }
}
