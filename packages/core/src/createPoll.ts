import { isNumber, isPromise } from '@utopia-utils/share'
import type { AnyFn } from './type'

type TimeoutReturn = ReturnType<typeof setTimeout>

type OnEnd<T> = (options: { times: number, res: Awaited<T> | undefined, maxTimes: number }) => any
type onMaxTimes<T> = (options: { times: number, res: Awaited<T>, maxTimes: number }) => any
type onTimeout = (options: { times: number, timeout: number, maxTimes: number }) => any
type OnEachCall<T> = (options: { times: number, res: Awaited<T>, maxTimes: number }) => false | void

interface CreatePollOptions<T> {
  taskFn: AnyFn<T>
  /**
   * 轮询间隔, 单位: 毫秒。如果为 0, 则上一次调用结束立即调用 taskFn
   * @default 0
   */
  interval?: number
  /**
   * 最大轮询次数, 0 表示无限轮询
   * @default 0
   */
  maxTimes?: number
  /**
   * 轮询超时时间, 单位: 毫秒。如果为 0, 则不超时
   * @default 0
   */
  timeout?: number
  /**
   * 每次轮询时调用, 返回 false 则停止轮询, 哪怕 maxTimes 未达到
   */
  onEachCall?: OnEachCall<T>
  /**
   * 轮询结束回调, 在下面的情况下会调用
   * onEachCall 返回 false 时
   * 调用次数达到 maxTimes 时也会调用
   * 轮询被手动停止时（调用 stopPoll）
   * 轮询超时时（如果传入了 timeout）
   */
  onEnd?: OnEnd<T>
  /**
   * 当调用次数超过 maxTimes 时触发
   */
  onMaxTimes?: onMaxTimes<T>
  /**
   *
   */
  onTimeout?: onTimeout
}

/**
 * 创建一个轮询器
 * @linkcode https://github.com/GreatAuk/utopia-utils/blob/main/packages/core/src/createPoll.ts
 * @example
 * ```ts
 * const task = () => new Promise<string>(resolve => setTimeout(() => resolve('hello'), 10))
 *
 * const { startPoll, stopPoll } = createPoll({
 *   taskFn: task,
 *   maxTimes: 10, // 最大轮询次数
 *   interval: 10, // 轮询间隔, 单位: 毫秒
 *   timeout: 1000, // 轮询超时时间, 单位: 毫秒
 *   onEachCall: (options) => {console.log(options)} // 每次轮询时调用
 *   onMaxTimes: (options) => {console.log(options)}, // 当调用次数超过 maxTimes 时触发
 *   onTimeout: (options) => {console.log(options)}, // 轮询超时回调
 *   onEnd: (options) => {console.log(options)}, // 轮询结束回调
 * })
 *
 * startPoll()
 * ```
 */
export function createPoll<T>(options: CreatePollOptions<T>) {
  const { taskFn, interval = 0, maxTimes = 0, onEachCall, onEnd, onMaxTimes, onTimeout, timeout = 0 } = options

  /**
   * 是否停止轮询
   */
  let canceled = false
  /**
   * 轮询次数
   */
  let times = 0
  /**
   * 轮询定时器
   */
  let timer!: TimeoutReturn

  /**
   * 超时定时器
   */
  let timeoutId!: TimeoutReturn

  const stopPoll = (res?: Awaited<T>) => {
    canceled = true
    timeoutId && clearTimeout(timeoutId)
    timer && clearTimeout(timer)
    onEnd?.({ times, res, maxTimes })
  }

  const poll = () => {
    if (canceled)
      return

    const res_ = taskFn()
    const p = isPromise(res_) ? res_ : Promise.resolve(res_)

    p.then((res) => {
      times++
      if (onEachCall?.({ times, res, maxTimes }) === false) {
        stopPoll(res)
      }

      else if (maxTimes && times >= maxTimes) {
        onMaxTimes?.({ times, res, maxTimes })
        stopPoll(res)
      }
      else {
        timer = setTimeout(poll, interval)
      }
    }).catch((err) => {
      console.error(err)
    })
  }

  const startPoll = () => {
    canceled = false
    times = 0

    if (isNumber(timeout) && timeout > 0) {
      timeoutId = setTimeout(() => {
        onTimeout?.({ times, timeout, maxTimes })
        stopPoll()
      }, timeout)
    }

    poll()
  }

  return {
    startPoll,
    stopPoll: () => stopPoll(undefined),
  }
}
