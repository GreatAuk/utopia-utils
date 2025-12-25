/** @vitest-environment happy-dom */
import { computed, effectScope, ref } from 'vue'
import { useSmsCountdown } from './index'

describe('useSmsCountdown', () => {
  vi.useFakeTimers()

  afterEach(() => {
    vi.clearAllTimers()
    vi.restoreAllMocks()
  })

  describe('初始化', () => {
    it('应该使用默认值初始化', () => {
      const { counts, canSend, text } = useSmsCountdown()

      expect(counts.value).toBe(60)
      expect(canSend.value).toBe(true)
      expect(text.value).toBe('获取验证码')
    })

    it('应该使用自定义值初始化', () => {
      const { counts, text } = useSmsCountdown({
        totalSecond: 30,
        startText: '发送验证码',
        durationText: '%s秒后重试',
      })

      expect(counts.value).toBe(30)
      expect(text.value).toBe('发送验证码')
    })
  })

  describe('参数验证', () => {
    it('应该在 totalSecond <= 0 时抛出错误', () => {
      expect(() => {
        useSmsCountdown({ totalSecond: 0 })
      }).toThrow('totalSecond 应为正整数')

      expect(() => {
        useSmsCountdown({ totalSecond: -1 })
      }).toThrow('totalSecond 应为正整数')
    })

    it('应该在 totalSecond 不是整数时抛出错误', () => {
      expect(() => {
        useSmsCountdown({ totalSecond: 3.5 })
      }).toThrow('totalSecond 应为正整数')
    })

    it('应该在 durationText 不包含 %s 时抛出错误', () => {
      expect(() => {
        useSmsCountdown({ durationText: '秒后重发' })
      }).toThrow('durationText 必须包含 "%s" 占位符')
    })

    it('应该支持 durationText 中大小写的 %s', () => {
      /* 小写 %s */
      const { text: text1 } = useSmsCountdown({ durationText: '%s秒' })
      expect(text1.value).toBe('获取验证码')

      /* 大写 %S */
      const { text: text2 } = useSmsCountdown({ durationText: '%S秒' })
      expect(text2.value).toBe('获取验证码')
    })
  })

  describe('倒计时逻辑', () => {
    it('应该每秒递减 counts', () => {
      const { counts, startCountdown } = useSmsCountdown({ totalSecond: 5 })

      startCountdown()

      /* 第一秒 */
      expect(counts.value).toBe(4)
      vi.advanceTimersByTime(1000)
      expect(counts.value).toBe(3)

      /* 第二秒 */
      vi.advanceTimersByTime(1000)
      expect(counts.value).toBe(2)

      /* 第三秒 */
      vi.advanceTimersByTime(1000)
      expect(counts.value).toBe(1)

      /* 第四秒 */
      vi.advanceTimersByTime(1000)
      expect(counts.value).toBe(0)
    })

    it('应该在倒计时结束后自动复位', () => {
      const { counts, startCountdown } = useSmsCountdown({ totalSecond: 3 })

      startCountdown()
      expect(counts.value).toBe(2)

      /* 推进到倒计时结束 */
      vi.advanceTimersByTime(3000)

      /* 应该自动复位到初始值 */
      expect(counts.value).toBe(3)
    })

    it('应该在 totalSecond=1 时正确倒计时', () => {
      const { counts, startCountdown } = useSmsCountdown({ totalSecond: 1 })

      startCountdown()
      expect(counts.value).toBe(0)

      vi.advanceTimersByTime(1000)
      /* 自动复位 */
      expect(counts.value).toBe(1)
    })
  })

  describe('computed 属性', () => {
    it('canSend 应该在倒计时期间为 false', () => {
      const { canSend, startCountdown } = useSmsCountdown({ totalSecond: 3 })

      expect(canSend.value).toBe(true)

      startCountdown()
      expect(canSend.value).toBe(false)

      vi.advanceTimersByTime(1000)
      expect(canSend.value).toBe(false)

      /* 倒计时结束后恢复 true */
      vi.advanceTimersByTime(3000)
      expect(canSend.value).toBe(true)
    })

    it('text 应该在倒计时期间正确显示剩余秒数', () => {
      const { text, startCountdown } = useSmsCountdown({
        totalSecond: 3,
        startText: '发送验证码',
        durationText: '%s秒后重发',
      })

      expect(text.value).toBe('发送验证码')

      startCountdown()
      expect(text.value).toBe('2秒后重发')

      vi.advanceTimersByTime(1000)
      expect(text.value).toBe('1秒后重发')

      vi.advanceTimersByTime(1000)
      expect(text.value).toBe('0秒后重发')

      /* 倒计时结束后显示开始文本 */
      vi.advanceTimersByTime(1000)
      expect(text.value).toBe('发送验证码')
    })
  })

  describe('sendAble 参数', () => {
    it('应该支持普通布尔值', () => {
      const { canSend: canSend1 } = useSmsCountdown({ sendAble: true })
      expect(canSend1.value).toBe(true)

      const { canSend: canSend2 } = useSmsCountdown({ sendAble: false })
      expect(canSend2.value).toBe(false)
    })

    it('应该支持 ref 响应式引用', () => {
      const sendAbleRef = ref(false)
      const { canSend } = useSmsCountdown({ sendAble: sendAbleRef })

      expect(canSend.value).toBe(false)

      sendAbleRef.value = true
      expect(canSend.value).toBe(true)
    })

    it('应该支持 computed 计算属性', () => {
      const phoneValid = ref(false)
      const sendAbleComputed = computed(() => phoneValid.value)
      const { canSend } = useSmsCountdown({ sendAble: sendAbleComputed })

      expect(canSend.value).toBe(false)

      phoneValid.value = true
      expect(canSend.value).toBe(true)
    })

    it('应该支持 getter 函数', () => {
      const sendAbleRef = ref(false)
      const { canSend } = useSmsCountdown({
        sendAble: () => sendAbleRef.value,
      })

      expect(canSend.value).toBe(false)

      sendAbleRef.value = true
      /* getter 会在 computed 重新计算时读取新值 */
      expect(canSend.value).toBe(true)
    })

    it('应该在 sendAble 为 false 时阻止启动倒计时', () => {
      const sendAbleRef = ref(false)
      const { counts, startCountdown } = useSmsCountdown({
        totalSecond: 60,
        sendAble: sendAbleRef,
      })

      startCountdown()

      /* counts 不应改变 */
      expect(counts.value).toBe(60)
      vi.advanceTimersByTime(1000)
      expect(counts.value).toBe(60)
    })
  })

  describe('startCountdown', () => {
    it('应该启动倒计时', () => {
      const { counts, canSend, startCountdown } = useSmsCountdown({ totalSecond: 3 })

      expect(counts.value).toBe(3)
      expect(canSend.value).toBe(true)

      startCountdown()

      expect(counts.value).toBe(2)
      expect(canSend.value).toBe(false)
    })

    it('应该在已运行中时阻止重复调用', () => {
      const { counts, startCountdown } = useSmsCountdown({ totalSecond: 10 })

      startCountdown()
      expect(counts.value).toBe(9)

      /* 重复调用不应重置倒计时 */
      startCountdown()
      expect(counts.value).toBe(9)

      vi.advanceTimersByTime(1000)
      expect(counts.value).toBe(8)
    })
  })

  describe('stopCountdown', () => {
    it('应该停止倒计时并复位', () => {
      const { counts, startCountdown, stopCountdown } = useSmsCountdown({ totalSecond: 5 })

      startCountdown()
      expect(counts.value).toBe(4)

      vi.advanceTimersByTime(2000)
      expect(counts.value).toBe(2)

      stopCountdown()
      /* 应该复位到初始值 */
      expect(counts.value).toBe(5)

      /* 继续推进时间，counts 不应再变化 */
      vi.advanceTimersByTime(5000)
      expect(counts.value).toBe(5)
    })

    it('应该在未启动时调用不产生副作用', () => {
      const { counts, stopCountdown } = useSmsCountdown({ totalSecond: 3 })

      stopCountdown()
      expect(counts.value).toBe(3)
    })
  })

  describe('清理逻辑', () => {
    it('应该在 effectScope dispose 时停止倒计时', () => {
      const scope = effectScope()

      let counts: any
      let startCountdown: any

      scope.run(() => {
        const result = useSmsCountdown({ totalSecond: 10 })
        counts = result.counts
        startCountdown = result.startCountdown
      })

      startCountdown()
      expect(counts.value).toBe(9)

      vi.advanceTimersByTime(2000)
      expect(counts.value).toBe(7)

      /* effectScope dispose 应该自动调用 stopCountdown */
      scope.stop()

      /* counts 应该复位 */
      expect(counts.value).toBe(10)

      /* 继续推进时间，倒计时不应继续 */
      vi.advanceTimersByTime(5000)
      expect(counts.value).toBe(10)
    })
  })

  describe('边界情况', () => {
    it('应该处理快速连续的 start 和 stop 调用', () => {
      const { counts, startCountdown, stopCountdown } = useSmsCountdown({ totalSecond: 10 })

      startCountdown()
      expect(counts.value).toBe(9)

      stopCountdown()
      expect(counts.value).toBe(10)

      startCountdown()
      expect(counts.value).toBe(9)

      stopCountdown()
      expect(counts.value).toBe(10)
    })
  })
})
