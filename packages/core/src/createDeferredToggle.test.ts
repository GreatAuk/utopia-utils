import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

import { createDeferredToggle } from './createDeferredToggle'

const DELAY = 300
const MIN_DISPLAY = 500

describe('createDeferredToggle', () => {
  let openSpy: ReturnType<typeof vi.fn>
  let hideSpy: ReturnType<typeof vi.fn>

  /* 使用假的定时器，便于精准控制时间推进 */
  vi.useFakeTimers()

  beforeEach(() => {
    openSpy = vi.fn()
    hideSpy = vi.fn()
  })

  afterEach(() => {
    vi.clearAllTimers()
    vi.restoreAllMocks()
  })

  describe('正常流程', () => {
    it('should call openFn after delay and hideFn after minDisplayTime', () => {
      /* 完整的正常流程测试 */
      const toggle = createDeferredToggle(openSpy, hideSpy, {
        delay: DELAY,
        minDisplayTime: MIN_DISPLAY,
      })

      toggle.open()
      expect(openSpy).not.toHaveBeenCalled()

      /* delay 后 openFn 应被触发 */
      vi.advanceTimersByTime(DELAY)
      expect(openSpy).toHaveBeenCalledTimes(1)
      expect(hideSpy).not.toHaveBeenCalled()

      /* 立即调用 hide，需等待 minDisplayTime */
      toggle.hide()
      expect(hideSpy).not.toHaveBeenCalled()

      /* minDisplayTime 后 hideFn 应被触发 */
      vi.advanceTimersByTime(MIN_DISPLAY)
      expect(hideSpy).toHaveBeenCalledTimes(1)
    })

    it('should use default values when options not provided', () => {
      /* 测试默认参数 */
      const toggle = createDeferredToggle(openSpy, hideSpy)

      toggle.open()

      /* 默认 delay = 300 */
      vi.advanceTimersByTime(299)
      expect(openSpy).not.toHaveBeenCalled()
      vi.advanceTimersByTime(1)
      expect(openSpy).toHaveBeenCalledTimes(1)

      toggle.hide()

      /* 默认 minDisplayTime = 500 */
      vi.advanceTimersByTime(499)
      expect(hideSpy).not.toHaveBeenCalled()
      vi.advanceTimersByTime(1)
      expect(hideSpy).toHaveBeenCalledTimes(1)
    })
  })

  describe('参数透传', () => {
    it('should pass arguments to openFn correctly', () => {
      /* 测试 open 参数透传 */
      const openSpyWithArgs = vi.fn()
      const toggle = createDeferredToggle(openSpyWithArgs, hideSpy, {
        delay: DELAY,
      })

      toggle.open('arg1', 123, { key: 'value' })
      vi.advanceTimersByTime(DELAY)

      expect(openSpyWithArgs).toHaveBeenCalledTimes(1)
      expect(openSpyWithArgs).toHaveBeenCalledWith('arg1', 123, { key: 'value' })
    })

    it('should pass arguments to hideFn correctly', () => {
      /* 测试 hide 参数透传 */
      const hideSpyWithArgs = vi.fn()
      const toggle = createDeferredToggle(openSpy, hideSpyWithArgs, {
        delay: DELAY,
        minDisplayTime: MIN_DISPLAY,
      })

      toggle.open()
      vi.advanceTimersByTime(DELAY)

      toggle.hide('hideArg1', { foo: 'bar' })
      vi.advanceTimersByTime(MIN_DISPLAY)

      expect(hideSpyWithArgs).toHaveBeenCalledTimes(1)
      expect(hideSpyWithArgs).toHaveBeenCalledWith('hideArg1', { foo: 'bar' })
    })
  })

  describe('delay 期间的行为', () => {
    it('should NOT call open/hide if hide is invoked within delay', () => {
      const toggle = createDeferredToggle(openSpy, hideSpy, {
        delay: DELAY,
        minDisplayTime: MIN_DISPLAY,
      })

      toggle.open()
      /* 200ms < delay -> openFn 还未触发 */
      vi.advanceTimersByTime(200)

      toggle.hide() // 在 delay 内触发 hide，应直接取消

      /* 再推进足够时间，确认 open/hide 都未被触发 */
      vi.advanceTimersByTime(1000)

      expect(openSpy).not.toHaveBeenCalled()
      expect(hideSpy).not.toHaveBeenCalled()
    })

    it('should cancel previous open timer when open is called again', () => {
      /* 测试多次调用 open 会清理之前的计时器 */
      const toggle = createDeferredToggle(openSpy, hideSpy, {
        delay: DELAY,
      })

      toggle.open('first')
      vi.advanceTimersByTime(100)

      toggle.open('second')
      /* 第一次 open 的计时器应被取消，只执行第二次 */
      vi.advanceTimersByTime(DELAY)

      expect(openSpy).toHaveBeenCalledTimes(1)
      expect(openSpy).toHaveBeenCalledWith('second')
    })
  })

  describe('minDisplayTime 相关', () => {
    it('should call hide after minDisplayTime when hide is invoked early', () => {
      const toggle = createDeferredToggle(openSpy, hideSpy, {
        delay: DELAY,
        minDisplayTime: MIN_DISPLAY,
      })

      toggle.open()
      /* 让时间到达 open 执行点 */
      vi.advanceTimersByTime(DELAY)
      expect(openSpy).toHaveBeenCalledTimes(1)

      /* 再过 50ms，然后 hide -> 距离 open 仅过去 50ms (< MIN_DISPLAY) */
      vi.advanceTimersByTime(50)
      toggle.hide()

      /* hideFn 应在剩余 450ms 后才触发 */
      vi.advanceTimersByTime(MIN_DISPLAY - 50 - 1)
      expect(hideSpy).not.toHaveBeenCalled()

      vi.advanceTimersByTime(1)
      expect(hideSpy).toHaveBeenCalledTimes(1)
    })

    it('should call hide immediately when minDisplayTime already satisfied', () => {
      const toggle = createDeferredToggle(openSpy, hideSpy, {
        delay: DELAY,
        minDisplayTime: MIN_DISPLAY,
      })

      toggle.open()
      /* 执行 open */
      vi.advanceTimersByTime(DELAY)
      expect(openSpy).toHaveBeenCalledTimes(1)

      /* 继续推进，满足 minDisplayTime */
      vi.advanceTimersByTime(MIN_DISPLAY)

      toggle.hide()
      expect(hideSpy).toHaveBeenCalledTimes(1)
    })

    it('should debounce multiple hide calls and keep latest arguments', () => {
      /* 测试多次调用 hide 会清理之前的 hideTimer */
      const hideSpyWithArgs = vi.fn()
      const toggle = createDeferredToggle(openSpy, hideSpyWithArgs, {
        delay: DELAY,
        minDisplayTime: MIN_DISPLAY,
      })

      toggle.open()
      vi.advanceTimersByTime(DELAY)

      toggle.hide('first')
      vi.advanceTimersByTime(100)
      toggle.hide('second')

      vi.advanceTimersByTime(MIN_DISPLAY - 100 - 1)
      expect(hideSpyWithArgs).not.toHaveBeenCalled()

      vi.advanceTimersByTime(1)
      expect(hideSpyWithArgs).toHaveBeenCalledTimes(1)
      expect(hideSpyWithArgs).toHaveBeenLastCalledWith('second')
    })
  })

  describe('cancel 行为', () => {
    it('should clear open timer when cancel is called during delay', () => {
      const toggle = createDeferredToggle(openSpy, hideSpy, {
        delay: DELAY,
        minDisplayTime: MIN_DISPLAY,
      })

      toggle.open()
      vi.advanceTimersByTime(100)
      toggle.cancel()

      /* 等再久，open/hide 也都不应该触发 */
      vi.advanceTimersByTime(DELAY + MIN_DISPLAY + 100)
      expect(openSpy).not.toHaveBeenCalled()
      expect(hideSpy).not.toHaveBeenCalled()
    })

    it('should clear hide timer when cancel is called during minDisplayTime', () => {
      /* 测试在 hide 延迟期间调用 cancel */
      const toggle = createDeferredToggle(openSpy, hideSpy, {
        delay: DELAY,
        minDisplayTime: MIN_DISPLAY,
      })

      toggle.open()
      vi.advanceTimersByTime(DELAY)
      expect(openSpy).toHaveBeenCalledTimes(1)

      toggle.hide()
      vi.advanceTimersByTime(100)

      toggle.cancel()

      /* hideFn 不应被调用 */
      vi.advanceTimersByTime(MIN_DISPLAY)
      expect(hideSpy).not.toHaveBeenCalled()
    })
  })

  describe('边界情况', () => {
    it('should do nothing when hide is called without any prior open', () => {
      /* 测试 hide 在没有 open 的情况下被调用 */
      const toggle = createDeferredToggle(openSpy, hideSpy, {
        delay: DELAY,
        minDisplayTime: MIN_DISPLAY,
      })

      toggle.hide()
      vi.advanceTimersByTime(1000)

      expect(openSpy).not.toHaveBeenCalled()
      expect(hideSpy).not.toHaveBeenCalled()
    })

    it('should do nothing when hide is called after already hidden', () => {
      /* 测试 hide 在已经隐藏后再次被调用 */
      const toggle = createDeferredToggle(openSpy, hideSpy, {
        delay: DELAY,
        minDisplayTime: MIN_DISPLAY,
      })

      toggle.open()
      vi.advanceTimersByTime(DELAY)
      vi.advanceTimersByTime(MIN_DISPLAY)

      toggle.hide()
      expect(hideSpy).toHaveBeenCalledTimes(1)

      /* 再次调用 hide 不应有任何效果 */
      toggle.hide()
      vi.advanceTimersByTime(1000)
      expect(hideSpy).toHaveBeenCalledTimes(1)
    })

    it('should handle delay = 0 correctly', () => {
      /* 测试 delay = 0 的情况 */
      const toggle = createDeferredToggle(openSpy, hideSpy, {
        delay: 0,
        minDisplayTime: MIN_DISPLAY,
      })

      toggle.open()
      vi.advanceTimersByTime(0)
      expect(openSpy).toHaveBeenCalledTimes(1)
    })

    it('should handle minDisplayTime = 0 correctly', () => {
      /* 测试 minDisplayTime = 0 的情况 */
      const toggle = createDeferredToggle(openSpy, hideSpy, {
        delay: DELAY,
        minDisplayTime: 0,
      })

      toggle.open()
      vi.advanceTimersByTime(DELAY)
      expect(openSpy).toHaveBeenCalledTimes(1)

      toggle.hide()
      expect(hideSpy).toHaveBeenCalledTimes(1)
    })
  })

  describe('参数校验', () => {
    it('should throw error when delay is negative', () => {
      /* 测试负数 delay 应抛出错误 */
      expect(() => {
        createDeferredToggle(openSpy, hideSpy, { delay: -100 })
      }).toThrow('delay 和 minDisplayTime 不能为负数')
    })

    it('should throw error when minDisplayTime is negative', () => {
      /* 测试负数 minDisplayTime 应抛出错误 */
      expect(() => {
        createDeferredToggle(openSpy, hideSpy, { minDisplayTime: -100 })
      }).toThrow('delay 和 minDisplayTime 不能为负数')
    })

    it('should throw error when both delay and minDisplayTime are negative', () => {
      /* 测试两者都为负数应抛出错误 */
      expect(() => {
        createDeferredToggle(openSpy, hideSpy, { delay: -100, minDisplayTime: -200 })
      }).toThrow('delay 和 minDisplayTime 不能为负数')
    })
  })
})
