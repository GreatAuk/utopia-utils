import { isNumber, isPromise, isNegativeNumber } from '@utopia-utils/share'
import type { AnyFn } from './type'

type TimeoutReturn = ReturnType<typeof setTimeout>

type OnEnd<T> = (options: { times: number, res: Awaited<T> | undefined, maxTimes: number, error?: Error }) => any
type OnMaxTimes<T> = (options: { times: number, res: Awaited<T>, maxTimes: number }) => any
type OnTimeout<T> = (options: { times: number, timeout: number, maxTimes: number, lastResult?: Awaited<T> }) => any
type OnEachCall<T> = (options: { times: number, res: Awaited<T>, maxTimes: number }) => boolean | void
type OnError = (options: { times: number, error: Error, maxTimes: number }) => boolean | void

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
   * taskFn 执行出错
   */
  onEnd?: OnEnd<T>
  /**
   * 当调用次数超过 maxTimes 时触发
   */
  onMaxTimes?: OnMaxTimes<T>
  /**
   * 轮询超时时触发
   */
  onTimeout?: OnTimeout<T>
  /**
   * taskFn 执行出错时触发，返回 false 则停止轮询，返回 true 或不返回则继续轮询
   */
  onError?: OnError
  /**
   * 是否立即执行
   * @default true
   */
  immediate?: boolean
}

interface PollStatus {
  isPolling: boolean
  times: number
  maxTimes: number
}

interface CreatePollReturn {
  startPoll: () => void
  stopPoll: () => void
  getPollStatus: () => PollStatus
}

/**
 * 创建一个轮询器
 * @linkcode https://github.com/GreatAuk/utopia-utils/blob/main/packages/core/src/createPoll.ts
 * @example
 * ```ts
 * const task = () => new Promise<string>(resolve => setTimeout(() => resolve('hello'), 10))
 *
 * const { startPoll, stopPoll, getPollStatus } = createPoll({
 *   taskFn: task,
 *   maxTimes: 10, // 最大轮询次数
 *   interval: 10, // 轮询间隔, 单位: 毫秒
 *   timeout: 1000, // 轮询超时时间, 单位: 毫秒
 *   onEachCall: (options) => {console.log(options)} // 每次轮询时调用
 *   onMaxTimes: (options) => {console.log(options)}, // 当调用次数超过 maxTimes 时触发
 *   onTimeout: (options) => {console.log(options)}, // 轮询超时回调
 *   onEnd: (options) => {console.log(options)}, // 轮询结束回调
 *   onError: (options) => {console.log(options)}, // 错误回调
 * })
 *
 * startPoll()
 * ```
 */
export function createPoll<T>(options: CreatePollOptions<T>): CreatePollReturn {
  if (isNegativeNumber(options.interval))
    throw new Error('interval must be a non-negative number')
  if (isNegativeNumber(options.maxTimes))
    throw new Error('maxTimes must be a non-negative number')
  if (isNegativeNumber(options.timeout))
    throw new Error('timeout must be a non-negative number')

  const {
    taskFn,
    interval = 0,
    maxTimes = 0,
    onEachCall,
    onEnd,
    onMaxTimes,
    onTimeout,
    onError,
    timeout = 0,
    immediate = true,
  } = options

  /**
   * 是否正在轮询
   */
  let isPolling = false
  /**
   * 轮询次数
   */
  let times = 0
  /**
   * 轮询定时器
   */
  let timerId: TimeoutReturn | undefined
  /**
   * 超时定时器
   */
  let timeoutId: TimeoutReturn | undefined
  /**
   * 上一次成功的结果
   */
  let lastResult: Awaited<T> | undefined

  /**
   * 停止轮询
   */
  const stopPoll = (res?: Awaited<T>, error?: Error) => {
    if (!isPolling)
      return

    isPolling = false

    if (timeoutId) {
      clearTimeout(timeoutId)
      timeoutId = undefined
    }

    if (timerId) {
      clearTimeout(timerId)
      timerId = undefined
    }

    onEnd?.({ times, res, maxTimes, error })
  }

  /**
   * 执行轮询任务
   */
  const poll = () => {
    const res_ = taskFn()
    const p = isPromise(res_) ? res_ : Promise.resolve(res_)

    p.then((res) => {
      if (!isPolling)
        return

      lastResult = res
      times++

      if (onEachCall?.({ times, res, maxTimes }) === false) {
        stopPoll(res)
      }
      else if (maxTimes && times >= maxTimes) {
        onMaxTimes?.({ times, res, maxTimes })
        stopPoll(res)
      }
      else {
        scheduleNextPoll()
      }
    }).catch((err) => {
      handleError(err instanceof Error ? err : new Error(String(err)))
    })
  }

  /**
   * 处理错误
   */
  const handleError = (error: Error) => {
    if (!isPolling)
      return

    const shouldContinue = onError?.({ times, error, maxTimes })

    if (shouldContinue === false) {
      stopPoll(undefined, error)
    } else {
      scheduleNextPoll()
    }
  }

  /**
   * 安排下一次轮询
   */
  const scheduleNextPoll = () => {
    if (!isPolling)
      return

    timerId = setTimeout(poll, interval)
  }

  /**
   * 开始轮询
   */
  const startPoll = () => {
    if (isPolling)
      return

    isPolling = true
    times = 0
    lastResult = undefined

    if (isNumber(timeout) && timeout > 0) {
      timeoutId = setTimeout(() => {
        if (isPolling) {
          onTimeout?.({ times, timeout, maxTimes, lastResult })
          stopPoll(lastResult)
        }
      }, timeout)
    }

    if (immediate)
      poll()
    else
      timerId = setTimeout(poll, interval)
  }

  /**
   * 获取轮询状态
   */
  const getPollStatus = (): PollStatus => ({
    isPolling,
    times,
    maxTimes,
  })

  return {
    startPoll,
    stopPoll: () => stopPoll(undefined),
    getPollStatus,
  }
}
