import { isPromise } from '@utopia-utils/share'
import type { AnyFn } from './type'

type OnEnd<T> = (options: { times: number, res: Awaited<T>, maxTimes: number }) => any
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
   * 每次轮询时调用, 返回 false 则停止轮询, 哪怕 maxTimes 未达到
   */
  onEachCall?: OnEachCall<T>
  /**
   * 轮询结束回调, 在下面的情况下会调用
   * onEachCall 返回 false 时
   * 调用次数达到 maxTimes 时也会调用
   * 轮询被手动停止时（调用 stopPoll）
   */
  onEnd?: OnEnd<T>
  /**
   * 当调用次数超过 maxTimes 时触发
   */
  onMaxTimes?: OnEnd<T>
}
export function createPoll<T>(options: CreatePollOptions<T>) {
  const { taskFn, interval = 0, maxTimes = 0, onEachCall, onEnd, onMaxTimes } = options

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
  let timer: NodeJS.Timeout | null = null

  const stopPoll = () => {
    canceled = true
    timer && clearTimeout(timer)
  }

  const poll = () => {
    if (canceled)
      return

    const res_ = taskFn()
    const p = isPromise(res_) ? res_ : Promise.resolve(res_)

    p.then((res) => {
      times++
      if (onEachCall?.({ times, res, maxTimes }) === false) {
        onEnd?.({ times, res, maxTimes })
        stopPoll()
      }

      else if (maxTimes && times >= maxTimes) {
        onMaxTimes?.({ times, res, maxTimes })
        onEnd?.({ times, res, maxTimes })
        stopPoll()
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
    poll()
  }

  return {
    startPoll,
    stopPoll,
  }
}
