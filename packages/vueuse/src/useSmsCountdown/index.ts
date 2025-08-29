import { computed, ref } from 'vue'
import type { Ref, ComputedRef, MaybeRefOrGetter } from 'vue'

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
  sendAble?: ComputedRef<boolean> | MaybeRefOrGetter<boolean>
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

/**
 * `useSmsCountdown` 是一个用于处理短信验证码倒计时的 Vue 3 组合式函数。
 *
 * 提供了倒计时功能，支持自定义开始文本和倒计时文本。
 *
 * @param options - 配置选项
 * @returns 返回倒计时状态和控制方法
 *
 * @example
 * ```ts
 * const { counts, canSend, text, startCountdown, stopCountdown } = useSmsCountdown({
 *   totalSecond: 60,
 *   sendAble: phoneValid, // 手机号合法时才能发送
 *   startText: '发送验证码',
 *   durationText: '%s秒后可重新发送'
 * })
 * ```
 *
 * @see https://github.com/GreatAuk/utopia-utils/blob/main/packages/vueuse/src/useSmsCountdown/README.md
 */
export function useSmsCountdown(options?: UseSmsCountdownOptions): UseSmsCountdownReturn {
  const { totalSecond = 60, sendAble = true, startText = '获取验证码', durationText = '%s秒后重发' } = options || {}

  /* 参数校验 */
  if (totalSecond <= 0 || totalSecond % 1 !== 0)
    throw new Error(`totalSecond 应为正整数`)

  if (!/%s/i.test(durationText))
    throw new Error('durationText 必须包含 "%s" 占位符')

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

  let timerId: ReturnType<typeof setTimeout> | null = null

  /**
   * 单次递归 tick，实现 1s 递减，倒计时结束自动复位
   */
  const tick = () => {
    if (counts.value <= 0) {
      counts.value = totalSecond
      timerId = null
      return
    }
    counts.value--
    timerId = setTimeout(tick, 1000)
  }

  function startCountdown() {
    // 不可发送 或 已在运行中 -> 直接返回
    if (!canSend.value || timerId)
      return

    counts.value--
    timerId = setTimeout(tick, 1000)
  }

  /**
   * 停止计时并复位
   */
  function stopCountdown() {
    if (timerId) {
      clearTimeout(timerId)
      timerId = null
    }
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
