/**
 * Wraps an async function, and ensures that only last call will ever resolve/reject
 * @param {T} fn - T - the function to wrap
 * @returns A function that will only resolve the last call.
 * @example
 * ```
    const foo_ = (id: number) => fetch('/api/post/' + id)
    const foo = onlyResolvesLast(foo)
    foo(1).then(() => console.log('resolved')) // promise will never resolve
    foo(2).then(() => console.log('resolved')) // promise will never resolve
    foo(3).then(() => console.log('resolved')) // promise will resolve with response
 * ```
 */
export function onlyResolvesLast<T extends (...args: any) => Promise<any>>(fn: T) {
  let time = 0
  function wrappedFn(this: ThisParameterType<T>, ...args: Parameters<T>): ReturnType<T> {
    const currentTime = time + 1
    time = currentTime

    const res = fn.apply(this, args)

    return new Promise((resolve, reject) => {
      Promise.resolve(res)
        .then((res_) => {
          // just resolve last call
          if (currentTime === time)
            resolve(res_)
        })
        .catch((err) => {
          // just resolve last call
          if (currentTime === time)
            reject(err)
        })
    }) as any
  }

  return wrappedFn
}
