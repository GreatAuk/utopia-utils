/** @vitest-environment happy-dom */
import { effectScope } from 'vue'
import { useDeferredToggle } from './index'

const DELAY = 300
const MIN_DISPLAY = 500

describe('useDeferredToggle', () => {
  let openSpy: ReturnType<typeof vi.fn>
  let hideSpy: ReturnType<typeof vi.fn>

  vi.useFakeTimers()

  beforeEach(() => {
    openSpy = vi.fn()
    hideSpy = vi.fn()
  })

  afterEach(() => {
    vi.clearAllTimers()
    vi.restoreAllMocks()
  })

  describe('初始化', () => {
    it('应该返回 open、hide 和 cancel 方法', () => {
      const { open, hide, cancel } = useDeferredToggle(openSpy, hideSpy)

      expect(typeof open).toBe('function')
      expect(typeof hide).toBe('function')
      expect(typeof cancel).toBe('function')
    })
  })

  describe('防闪烁逻辑', () => {
    it('应该在 delay 内调用 hide 时不触发 openFn 和 hideFn', () => {
      const { open, hide } = useDeferredToggle(openSpy, hideSpy, {
        delay: DELAY,
        minDisplayTime: MIN_DISPLAY,
      })

      open()
      /* delay 未满足，openFn 还未触发 */
      vi.advanceTimersByTime(200)

      hide() /* 在 delay 内触发 hide，应直接取消 */

      /* 再推进足够时间，确认 open/hide 都未被触发 */
      vi.advanceTimersByTime(1000)

      expect(openSpy).not.toHaveBeenCalled()
      expect(hideSpy).not.toHaveBeenCalled()
    })

    it('应该在 delay 后触发 openFn', () => {
      const { open } = useDeferredToggle(openSpy, hideSpy, {
        delay: DELAY,
        minDisplayTime: MIN_DISPLAY,
      })

      open()
      vi.advanceTimersByTime(DELAY)

      expect(openSpy).toHaveBeenCalledTimes(1)
    })

    it('应该在 minDisplayTime 未满足时延迟触发 hideFn', () => {
      const { open, hide } = useDeferredToggle(openSpy, hideSpy, {
        delay: DELAY,
        minDisplayTime: MIN_DISPLAY,
      })

      open()
      /* 触发 openFn */
      vi.advanceTimersByTime(DELAY)
      expect(openSpy).toHaveBeenCalledTimes(1)

      /* 再过 50ms，然后 hide -> 距离 open 仅过去 50ms (< MIN_DISPLAY) */
      vi.advanceTimersByTime(50)
      hide()

      /* hideFn 应在剩余 450ms 后才触发 */
      vi.advanceTimersByTime(MIN_DISPLAY - 50 - 1)
      expect(hideSpy).not.toHaveBeenCalled()

      vi.advanceTimersByTime(1)
      expect(hideSpy).toHaveBeenCalledTimes(1)
    })

    it('应该在 minDisplayTime 已满足时立即触发 hideFn', () => {
      const { open, hide } = useDeferredToggle(openSpy, hideSpy, {
        delay: DELAY,
        minDisplayTime: MIN_DISPLAY,
      })

      open()
      vi.advanceTimersByTime(DELAY)
      expect(openSpy).toHaveBeenCalledTimes(1)

      /* 继续推进，满足 minDisplayTime */
      vi.advanceTimersByTime(MIN_DISPLAY)

      hide()
      expect(hideSpy).toHaveBeenCalledTimes(1)
    })
  })

  describe('参数传递', () => {
    it('应该正确传递 open 方法的参数', () => {
      /** openSpyWithArgs: 断言 openFn 的参数 */
      const openSpyWithArgs = vi.fn()
      const { open } = useDeferredToggle(openSpyWithArgs, hideSpy, {
        delay: DELAY,
        minDisplayTime: MIN_DISPLAY,
      })

      open('param1', 'param2')
      vi.advanceTimersByTime(DELAY)

      expect(openSpyWithArgs).toHaveBeenCalledWith('param1', 'param2')
    })

    it('应该正确传递 hide 方法的参数', () => {
      /** hideSpyWithArgs: 断言 hideFn 的参数 */
      const hideSpyWithArgs = vi.fn()
      const { open, hide } = useDeferredToggle(openSpy, hideSpyWithArgs, {
        delay: DELAY,
        minDisplayTime: MIN_DISPLAY,
      })

      open()
      vi.advanceTimersByTime(DELAY)

      hide('param1', 'param2')
      vi.advanceTimersByTime(MIN_DISPLAY)

      expect(hideSpyWithArgs).toHaveBeenCalledWith('param1', 'param2')
    })

    it('应该保留最后一次 hide 调用的参数', () => {
      /** hideSpyWithArgs: 断言 hideFn 的参数 */
      const hideSpyWithArgs = vi.fn()
      const { open, hide } = useDeferredToggle(openSpy, hideSpyWithArgs, {
        delay: DELAY,
        minDisplayTime: MIN_DISPLAY,
      })

      open()
      vi.advanceTimersByTime(DELAY)

      hide('first')
      vi.advanceTimersByTime(100)
      hide('second')

      vi.advanceTimersByTime(MIN_DISPLAY - 100 + 1)

      /* 可能会触发两次，但最后一次的参数应该是 'second' */
      expect(hideSpyWithArgs).toHaveBeenLastCalledWith('second')
    })
  })

  describe('cancel 方法', () => {
    it('应该取消所有待执行的回调', () => {
      const { open, cancel } = useDeferredToggle(openSpy, hideSpy, {
        delay: DELAY,
        minDisplayTime: MIN_DISPLAY,
      })

      open()
      vi.advanceTimersByTime(100)
      cancel()

      /* 等再久，open/hide 也都不应该触发 */
      vi.advanceTimersByTime(DELAY + MIN_DISPLAY + 100)
      expect(openSpy).not.toHaveBeenCalled()
      expect(hideSpy).not.toHaveBeenCalled()
    })
  })

  describe('清理逻辑', () => {
    it('应该在 effectScope dispose 时自动清理定时器', () => {
      const scope = effectScope()


      scope.run(() => {
        const result = useDeferredToggle(openSpy, hideSpy, {
          delay: DELAY,
          minDisplayTime: MIN_DISPLAY,
        })
        result.open()
      })

      /* 推进一些时间但未到 delay */
      vi.advanceTimersByTime(100)

      /* effectScope dispose 应该自动调用 cancel */
      scope.stop()

      /* 继续推进时间，openFn 不应被调用 */
      vi.advanceTimersByTime(DELAY + MIN_DISPLAY)
      expect(openSpy).not.toHaveBeenCalled()
      expect(hideSpy).not.toHaveBeenCalled()
    })
  })
})
