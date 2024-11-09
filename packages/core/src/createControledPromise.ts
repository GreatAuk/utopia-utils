// fork from https://github.com/antfu/utils/blob/325c0f13b34ab9605dc9c55f6166e3a229cb0f4c/src/promise.ts#L115

/**
 * Promise with `resolve` and `reject` methods of itself
 */
export interface ControlledPromise<T = void> extends Promise<T> {
  resolve: (value: T | PromiseLike<T>) => void
  reject: (reason?: any) => void
}

/**
 * Return a Promise with `resolve` and `reject` methods
 * @linkcode https://github.com/GreatAuk/utopia-utils/blob/main/packages/core/src/createControledPromise.ts
 * @example
 * ```
 * const promise = createControledPromise()
 * await promise
 * // in anther context:
 * promise.resolve(data)
 * ```
 *
 * @example
 * ```
 * const promise = createControledPromise<number>()
 *
 * promise.then(res => console.log(res)) // => 111
 * // in anther context:
 * promise.resolve(111)
 * ```
 */
export function createControledPromise<T = void>(): ControlledPromise<T> {
  let resolve: any, reject: any
  const promise = new Promise<T>((_resolve, _reject) => {
    resolve = _resolve
    reject = _reject
  }) as ControlledPromise<T>
  promise.resolve = resolve
  promise.reject = reject
  return promise
}
