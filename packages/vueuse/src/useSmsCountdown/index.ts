import { computed, ref } from 'vue'
import type { Ref, ComputedRef } from 'vue'

import type { MaybeRef } from '../types'
import { toValue, tryOnScopeDispose } from '../utils'

export type UseSmsCountdownOptions = {
  /**
   * 倒计时总共的时间(s)
   * @default 60s
   */
  totalSecond?: number
  /**
   * 是否可发送
   * @default true
   */
  sendAble?: MaybeRef<boolean>
  /**
   * 开始倒计时的文本
   * @default '获取验证码'
   */
  startText?: string
  /**
   * 倒计时期间的提示语，必须带有字符 "%s"，这里的 "%s"，将会被倒计的秒数替代
   * @default '%s秒后重发'
   */
  durationText?: string
}
type UseSmsCountdownReturn = {
  counts: Ref<number>
  canSend: ComputedRef<boolean>
  text: ComputedRef<string>
  startCountdown: () => void
  stopCountdown: () => void
}

export function useSmsCountdown(options?: UseSmsCountdownOptions): UseSmsCountdownReturn {
  const { totalSecond = 60, sendAble = true, startText = '获取验证码', durationText = 'x秒后重发' } = options || {}

  if (totalSecond <= 0 && totalSecond % 1 !== 0)
    throw new Error('倒计时的时间应该为一个正整数！')

  const counts = ref(totalSecond)

  /** 是否可以发送验证码，由外部转入的 sendAble 和当前的秒数共同确定 */
  const canSend = computed(() => {
    return toValue(sendAble) && counts.value === totalSecond
  })

  const text = computed(() => {
    if (counts.value === totalSecond)
      return startText

    return durationText.replace(/%s/i, counts.value.toString())
  })

  let intervalId: ReturnType<typeof setInterval> | null = null

  function startCountdown() {
    if (!canSend.value)
      return

    counts.value--
    intervalId = setInterval(() => {
      counts.value--
      if (counts.value <= 0) {
        counts.value = totalSecond
        clearInterval(intervalId!)
      }
    }, 1000)
  }

  /**
   * 停止计时
   */
  function stopCountdown() {
    intervalId && clearInterval(intervalId)
    intervalId = null
    counts.value = totalSecond
  }
  tryOnScopeDispose(stopCountdown)

  return {
    counts,
    canSend,
    text,
    startCountdown,
    stopCountdown,
  }
}
