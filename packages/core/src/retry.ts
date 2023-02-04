import { isFunction, isNumber } from '@utopia-utils/share'
import { sleep } from './sleep'

type RetryDelay = number | ((attemptTime: number) => Promise<void>) | ((attemptTime: number) => number)

/**
 * It retries a function until it succeeds or the retry time is exceeded
 * @param {(() => Promise<T>) | (() => T)} fn - The function to retry.
 * @param {number} retryTime - The number of times to retry the function.
 * @param {RetryDelay} [delay] - The delay between each retry. Can be a number or a function that
 * return a milliseconds or function return a promise.
 * @returns A tuple of type [E, null] | [null, T]
 * @example
 * ```
    let callNum = 0
    const fn = () => {
      callNum++
      return Promise.reject(new Error('foo'))
    }
    const [err, res] = await retry(fn, 2, (attemptTime) => {
      return attemptTime * 5
    })
    // output
    // err is Error, res is null, callNum is 3
    // execute time is greater than or equal to 15
 * ```
 */
export async function retry<T, E = Error>(fn: (() => Promise<T>) | (() => T), retryTime: number, delay?: RetryDelay): Promise<[E, null] | [null, T]> {
  if (!isNumber(retryTime) || retryTime < 0)
    throw new Error('retryTime must be a positive number')

  let attemptTime = 0
  let res: T
  while (attemptTime <= retryTime) {
    try {
      res = await fn()
      break
    }
    catch (err) {
      attemptTime++

      if (attemptTime > retryTime)
        return [err, null] as [E, null]

      if (isNumber(delay)) {
        await sleep(delay)
      }
      else if (isFunction(delay)) {
        const tempRes = await delay(attemptTime)
        if (isNumber(tempRes))
          await sleep(tempRes)
      }
    }
  }
  // @ts-expect-error - TS doesn't know that res is defined here
  return [null, res]
}
