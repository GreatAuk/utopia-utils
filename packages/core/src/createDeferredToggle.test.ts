import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

import { createDeferredToggle } from './createDeferredToggle'

const DELAY = 300
const MIN_DISPLAY = 500

describe('createDeferredToggle', () => {
  let openSpy: ReturnType<typeof vi.fn>
  let hideSpy: ReturnType<typeof vi.fn>

  // 使用假的定时器，便于精准控制时间推进
  vi.useFakeTimers()

  beforeEach(() => {
    openSpy = vi.fn()
    hideSpy = vi.fn()
  })

  afterEach(() => {
    vi.clearAllTimers()
    vi.restoreAllMocks()
  })

  it('should NOT call open/hide if hide is invoked within delay', () => {
    const toggle = createDeferredToggle(openSpy, hideSpy, {
      delay: DELAY,
      minDisplayTime: MIN_DISPLAY,
    })

    toggle.open()
    // 200ms < delay -> openFn 还未触发
    vi.advanceTimersByTime(200)

    toggle.hide() // 在 delay 内触发 hide，应直接取消

    // 再推进足够时间，确认 open/hide 都未被触发
    vi.advanceTimersByTime(1000)

    expect(openSpy).not.toHaveBeenCalled()
    expect(hideSpy).not.toHaveBeenCalled()
  })

  it('should call hide after minDisplayTime when hide is invoked early', () => {
    const toggle = createDeferredToggle(openSpy, hideSpy, {
      delay: DELAY,
      minDisplayTime: MIN_DISPLAY,
    })

    toggle.open()
    // 让时间到达 open 执行点
    vi.advanceTimersByTime(DELAY)
    expect(openSpy).toHaveBeenCalledTimes(1)

    // 再过 50ms，然后 hide -> 距离 open 仅过去 50ms (< MIN_DISPLAY)
    vi.advanceTimersByTime(50)
    toggle.hide()

    // hideFn 应在剩余 450ms 后才触发
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
    // 执行 open
    vi.advanceTimersByTime(DELAY)
    expect(openSpy).toHaveBeenCalledTimes(1)

    // 继续推进，满足 minDisplayTime
    vi.advanceTimersByTime(MIN_DISPLAY)

    toggle.hide()
    expect(hideSpy).toHaveBeenCalledTimes(1)
  })

  it('should debounce multiple hide calls and keep latest arguments', () => {
    /** hideSpyWithArgs: 断言 hideFn 的参数与调用次数 */
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

  it('cancel should clear all timers and reset state', () => {
    const toggle = createDeferredToggle(openSpy, hideSpy, {
      delay: DELAY,
      minDisplayTime: MIN_DISPLAY,
    })

    toggle.open()
    vi.advanceTimersByTime(100)
    toggle.cancel()

    // 等再久，open/hide 也都不应该触发
    vi.advanceTimersByTime(DELAY + MIN_DISPLAY + 100)
    expect(openSpy).not.toHaveBeenCalled()
    expect(hideSpy).not.toHaveBeenCalled()
  })
})
